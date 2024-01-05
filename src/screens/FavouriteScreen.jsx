import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/CustomText";
import Header from "../components/Header";
import ProductItem from "../components/ProductItem";
import useFavouriteStore from "../store/useFavourite";
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
