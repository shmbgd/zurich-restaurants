import { useEffect } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import restaurants from "../restaurants.json";
import RestaurantItem from "../components/RestaurantItem";
import { useDispatch } from "react-redux";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function RestaurantsScreen() {
  const { getItem, setItem } = useAsyncStorage("@favorite_restaurants");
  const dispatch = useDispatch();

  useEffect(() => {
    // persist data from storage
    const persistData = async () => {
      const favorites = await getItem();
      const parsed = favorites ? JSON.parse(favorites) : [];
      // add to redux
      dispatch({ type: "SET_FAVORITES", payload: parsed })
    };
    persistData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "95%" }}
        data={restaurants}
        renderItem={({ item }: { item: any }) => <RestaurantItem
          key={item.identifier}
          id={item.identifier}
          name={item.name.en}
          image={item.image.url}
          streetAddress={item.address.streetAddress}
          postalCode={item.address.postalCode}
          addressLocality={item.address.addressLocality}
        />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
