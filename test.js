import { StyleSheet, Text, View } from "react-native";
export default function MyComponent() {
  return (
    <View style={styles.container}>
      <Text>This is the MyComponent component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
