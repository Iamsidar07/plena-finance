import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import useFavouriteStore from "../store/useFavourite";
import ProductItem from "../components/ProductItem";
import { StatusBar } from "expo-status-bar";
import MyText from "../components/CustomText";
const FavouriteScreen = () => {
  const { favourites } = useFavouriteStore();
  return (
    <SafeAreaView style={styles.container}>
      <Header back secondaryText={"Your Favourites"} bag />
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 100,
            marginTop: 10,
          }}
        />
      ) : (
        <MyText style={{ textAlign: "center", marginTop: 45 }}>
          Seems like empty! your favourites will appear here...
        </MyText>
      )}
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.length + 10,
  },
});
