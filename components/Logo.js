import { Image, StyleSheet, View } from "react-native";
export default function MyComponent() {
  return (
    // <View style={styles.container}>
    /* <View style={styles.logoContainer}> */
    <Image style={styles.logo} source={require("../assets/logo.png")} />
    /* </View> */
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  //   logoContainer: {
  //     alignItems: "center",
  //   },
  logo: {
    height: 50,
    width: 50,
  },
});
