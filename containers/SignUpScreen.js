import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [username, setUserame] = useState("");
  const [description, setDescription] = useState("");
  const [conirmPass, setConirmPass] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      setError("");
      if (username === "" || email === "" || password === "" || description === "") {
        setError("Veuillez remplir tous les champs.");
      } else if (password !== conirmPass) {
        setError("Les mots de passe ne sont pas les identique");
      } else {
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/sign_up", {
          email: email,
          username: username,
          description: description,
          password: password,
        });

        console.log("response =>", response.data);
        const userToken = response.data.token;
        if (userToken) {
          alert("Vous êtes connecté");
          setToken(userToken);
        }
      }
    } catch (error) {
      if (error.response.data.error === "Unauthorized") {
        setError("Email ou mot de pass incorecte");
      } else if (error.response.data.error === "This email already has an account.") {
        setError("Cet e-mail a déjà un compte.");
      }
      console.log("error ==>", error.response.data);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.signIn}>Sign Up</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <TextInput
            style={styles.userInfo}
            placeholder="User name"
            onChangeText={(text) => {
              setUserame(text);
            }}
          />

          <TextInput
            style={styles.userInfo}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.userDescription}
            multiline={true}
            // numberOfLines={4}
            placeholder="Description"
            onChangeText={(text) => {
              setDescription(text);
            }}
          />

          <View style={{ width: "90%", flexDirection: "row" }}>
            <TextInput
              style={styles.userInfo}
              placeholder="Password"
              secureTextEntry={visible}
              onChangeText={(text) => {
                setPassord(text);
              }}
            ></TextInput>
            {!visible ? (
              <Feather
                style={{ alignItems: "center" }}
                name="eye"
                size={24}
                color="black"
                onPress={() => {
                  setVisible(true);
                }}
              />
            ) : (
              <Feather
                name="eye-off"
                size={24}
                color="black"
                onPress={() => {
                  setVisible(false);
                }}
              />
            )}
          </View>

          <TextInput
            style={styles.userInfo}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConirmPass(text);
            }}
          />
        </View>

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={async () => {
              signUp();
            }}
          >
            <Text style={{ fontSize: 20, color: "#8f8f8f" }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={{ fontSize: 20, color: "#8f8f8f" }}>Already have an acount? Sign in</Text>
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
    // justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  logo: {
    width: 110,
    height: 110,
  },
  signIn: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#b4b4b4",
  },
  userInfoContainer: {
    width: "100%",
    paddingHorizontal: 5,
    alignItems: "center",
    marginTop: 20,
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
