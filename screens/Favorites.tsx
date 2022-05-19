import { FlatList, StyleSheet, View } from 'react-native';
import restaurants from "../restaurants.json";
import RestaurantItem from "../components/RestaurantItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

export default function RestaurantsScreen() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const favoritesPart = restaurants.filter(e => favorites.includes(e.identifier));

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "95%" }}
        data={favoritesPart}
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
