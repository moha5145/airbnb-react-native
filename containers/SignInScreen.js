import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      if (email === "") {
        setError("Remplissez le champ email");
      } else if (password === "") {
        setError("Remplissez le champ password");
      } else {
        setError("");
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in", {
          email: email,
          password: password,
        });

        console.log("response =>", response.data.token);
        const userToken = response.data.token;
        if (userToken) {
          alert("Vous êtes connecté");
          setToken(userToken);
        }
      }
    } catch (error) {
      if (error.response.data.error === "Unauthorized") {
        setError("Email ou mot de pass incorecte");
      }
      console.log("error ==>", error.response.data);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.signIn}>Sign in</Text>
      </View>
      <View style={styles.userInfo}>
        <TextInput
          placeholder="Email"
          style={styles.email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.password}
          onChangeText={(text) => {
            setPassord(text);
          }}
        />
      </View>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={async () => {
            signIn();
          }}
        >
          <Text style={{ fontSize: 20, color: "#8f8f8f" }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ fontSize: 20, color: "#8f8f8f" }}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "space-around",
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
  userInfo: {
    width: "100%",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  email: {
    width: "90%",
    padding: 1,
    borderBottomColor: "#ffd1d6",
    borderBottomWidth: 1,
    marginBottom: 30,
    color: "#565656",
  },
  password: {
    width: "90%",
    padding: 1,
    borderBottomColor: "#ffd1d6",
    borderBottomWidth: 1,
    color: "#565656",
  },

  btnContainer: {
    alignItems: "center",
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
