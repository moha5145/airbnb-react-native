import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView from "react-native-maps";

// import { AntDesign } from "@expo/vector-icons";
import Maincard from "../components/MainCard";
const Room = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState();
  const [showAllDescription, setShowAlldescription] = useState(false);
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
      <Maincard item={room} />

      <TouchableOpacity
        onPress={() => {
          setShowAlldescription(!showAllDescription);
        }}
      >
        <Text numberOfLines={!showAllDescription ? 3 : null}>{room.description}</Text>
      </TouchableOpacity>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: room.location[1],
          longitude: room.location[0],
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: room.location[1],
            longitude: room.location[0],
          }}
          title={room.title}
          description={room.description}
        />
      </MapView>
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
