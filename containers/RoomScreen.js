import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";

// import { AntDesign } from "@expo/vector-icons";
import Maincard from "../components/MainCard";
const Room = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState();
  // console.log(route);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`);
      // console.log(response.data);

      setRoom(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo}></Image>

      <Maincard item={room} />

      <Text numberOfLines={3}>{room.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  logo: {
    height: 35,
    width: 35,
    marginVertical: 5,
    justifyContent: "center",
  },
});

export default Room;
