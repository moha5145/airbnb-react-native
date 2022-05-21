// import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

// icons
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// components
import CustomInput from "../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ProfileScreen({
  userId,
  setUser,
  userToken,
  setUsername,
  username,
  email,
  setEmail,
  description,
  setDescription,
  error,
  setError,
  setToken,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [avatar, setAvatar] = useState();
  const [selectedPicture, setSelectedPicture] = useState(null);

  // const [username, setUsername] = useState();

  // const { params } = useRoute();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`https://express-airbnb-api.herokuapp.com/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data) {
          setUserData(response.data);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setDescription(response.data.description);
          response.data.photo && setSelectedPicture(response.data.photo.url);
          // console.log(response.data.photo);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, []);

  const getPicture = async () => {
    setIsLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.uri);
        setIsLoading(false);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const tekePicture = async () => {
    setIsLoading(true);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      setSelectedPicture(result.uri);
      setIsLoading(false);
    } else {
      alert("Permission pas accordée");
    }
  };

  const updatePicture = async () => {
    setIsLoading(true);
    try {
      const tab = selectedPicture.split(".");
      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `my-pic.${tab[1]}`,
        type: `image/${tab[1]}`,
      });

      const response = await axios.put(`https://express-airbnb-api.herokuapp.com/user/upload_picture`, formData, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const updateProfile = async () => {
    setIsLoading(true);
    const response = await axios.put(
      `https://express-airbnb-api.herokuapp.com/user/update`,
      { email, username, description },
      {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    setSelectedPicture("");
    setIsLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserData();
    setUsername();
    setEmail();
    setDescription();
    setSelectedPicture();
  };

  // console.log(userId);
  return isLoading ? (
    <Text> Loding ... </Text>
  ) : (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.uploadAvatarContainer}>
          <View style={styles.avatarContainer}>
            {selectedPicture ? (
              <Image source={{ uri: selectedPicture }} style={{ height: 148, width: 148, borderRadius: 148 }} />
            ) : (
              <Ionicons name="person" size={110} color="#e7e7e7" />
            )}
          </View>
          <View style={styles.camera}>
            <TouchableOpacity onPress={getPicture}>
              <MaterialIcons name="photo-library" size={24} color="#717171" />
            </TouchableOpacity>

            <TouchableOpacity onPress={tekePicture}>
              <Ionicons name="camera-sharp" size={24} color="#717171" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput setState={setUsername} placeholder={"User name"} value={username} />
          <CustomInput setState={setEmail} placeholder={"Email"} value={email} />
          <TextInput
            style={styles.userDescription}
            multiline={true}
            // numberOfLines={4}
            placeholder="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>

        <View style={styles.btnContainer}>
          {isLoading ? (
            <Text>Loding</Text>
          ) : (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={async () => {
                selectedPicture && updatePicture();
                updateProfile();
              }}
            >
              <Text style={{ fontSize: 20, color: "#8f8f8f" }}>Update</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.signInBtn}
            onPress={async () => {
              logout();
            }}
          >
            <Text style={{ fontSize: 20, color: "#8f8f8f" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  uploadAvatarContainer: {
    flexDirection: "row",
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 150,
    borderColor: "#fcc6cc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  camera: {
    justifyContent: "space-around",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  userInfo: {
    width: "90%",
    padding: 1,
    borderBottomColor: "#ffd1d6",
    borderBottomWidth: 1,
    marginBottom: 30,
    color: "#565656",
  },
  userDescription: {
    width: "90%",
    height: 100,
    padding: 10,
    borderColor: "#ffd1d6",
    borderWidth: 1,
    color: "#565656",
    marginBottom: 30,
  },

  btnContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  signInBtn: {
    color: "#8e8e8e",
    borderRadius: 25,
    borderColor: "#ed5e64",
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 15,

    // backgroundColor: "red",
  },
});
