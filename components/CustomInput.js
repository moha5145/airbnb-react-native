import { StyleSheet, TextInput } from "react-native";
const CustomInput = ({ setState, placeholder, value, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.userInfo}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={(text) => {
        setState(text);
      }}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    width: "90%",
    padding: 1,
    borderBottomColor: "#ffd1d6",
    borderBottomWidth: 1,
    marginBottom: 30,
    color: "#565656",
  },
});

export default CustomInput;
