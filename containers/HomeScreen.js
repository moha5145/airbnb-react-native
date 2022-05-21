import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import Maincard from "../components/MainCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(userToken);

  const animation = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <LottieView
      autoPlay
      ref={animation}
      style={{
        backgroundColor: "#eee",
      }}
      source={require("../assets/home-icon.json")}
    ></LottieView>
  ) : (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
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
});
