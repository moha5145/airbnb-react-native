import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Maincard from "../components/MainCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(userToken);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            {
              console.log("mon id ", item._id);
            }
            return (
              <TouchableOpacity onPress={() => navigation.navigate("Room", { id: item._id })}>
                <Maincard item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
  },
});
