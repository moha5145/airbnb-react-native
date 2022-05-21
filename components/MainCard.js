import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const Maincard = ({ item }) => {
  // console.log(item);
  // return <Text>hi</Text>;
  const ratingStars = (ratingValue) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        // console.log(ratingValue[i]);
        stars.push(<AntDesign key={i} name="star" size={24} color="#feb202" style={styles.wel} />);
      } else {
        stars.push(<AntDesign key={i} name="star" size={24} color="#bbbbbb" style={styles.wel} />);
      }
    }
    return stars;
  };
  return (
    <View style={styles.imgContainer}>
      <Image style={styles.images} source={{ uri: item.photos[0].url }} />
      <Text style={styles.price}>{item.price} €</Text>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{ratingStars(item.ratingValue)}</Text>
            <Text> {item.reviews} reviews</Text>
          </View>
        </View>
        <Image style={styles.avatar} source={{ uri: item.user.account.photo.url }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 35,
    width: 35,
    marginVertical: 5,
    justifyContent: "center",
  },
  mainImg: {
    height: 300,
    width: "100%",
  },
  imgContainer: {
    borderColor: "#bbbbbb",
    // borderTopWidth: 2,
    position: "relative",
  },
  images: {
    height: 200,
  },
  price: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 25,
    top: 140,
    left: 0,
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default Maincard;
