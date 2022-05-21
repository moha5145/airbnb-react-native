import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const AroundMeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState([]);
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          const obj = { latitude: location.coords.latitude, longitude: location.coords.longitude };
          setCoords(obj);
          response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around?longitude=${obj.longitude}&latitude${obj.latitude}`);
        } else {
          response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around`);
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude ? coords.latitude : 48.8480923,
          longitude: coords.longitude ? coords.longitude : 2.3215788,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {data.map((item) => {
          return (
            <MapView.Marker
              key={item._id}
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            ></MapView.Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    // height: 500,
    width: "100%",
  },
});

export default AroundMeScreen;
