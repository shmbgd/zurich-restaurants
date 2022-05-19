import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { RootState } from "../store/rootReducer";

interface IRestaurantItem {
  name: string;
  image: string;
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  id: string;
};

const RestaurantItem: React.FC<IRestaurantItem> = (props) => {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const { getItem, setItem } = useAsyncStorage("@favorite_restaurants");

  const addToFavorites = async () => {
    const favorites = await getItem();
    const parsed = favorites ? JSON.parse(favorites) : [];
    const result = [...parsed, props.id];
    // add to local storage
    await setItem(JSON.stringify(result));
    // add to redux
    dispatch({ type: "ADD_TO_FAVORITES", payload: props.id })
  };

  const removeFromFavorites = async () => {
    const favorites = await getItem();
    const parsed = favorites ? JSON.parse(favorites) : [];
    const result = parsed && parsed.filter((e: string) => e !== props.id);
    // remove from local storage
    await setItem(JSON.stringify(result));
    // remove from redux
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: props.id })
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.info}>
        <Text style={styles.restaurantName}>{props.name}</Text>
        <Text>{props.streetAddress}</Text>
        <Text>{props.postalCode}, {props.addressLocality}</Text>
      </View>
      <View style={styles.favorite}>
        <Pressable onPress={() => favorites.includes(props.id) ? removeFromFavorites() : addToFavorites()}>
          <FontAwesome name="star" size={30} color={favorites.includes(props.id) ? "orange" : "grey"} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 120,
    width: "100%",
    marginVertical: 10,
    borderWidth: 0.2,
    borderColor: "black",
    backgroundColor: "white"
  },
  image: {
    width: 120,
    height: 120
  },
  info: {
    justifyContent: "center",
    margin: 10,
    width: "50%"
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  favorite: {
    justifyContent: "center",
  },
})

export default RestaurantItem;