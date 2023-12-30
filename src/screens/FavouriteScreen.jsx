import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import useFavouriteStore from "../store/useFavourite";
import ProductItem from "../components/ProductItem";
import { StatusBar } from "expo-status-bar";
import MyText from "../components/CustomText";
const FavouriteScreen = ({ navigation }) => {
  const { favourites } = useFavouriteStore();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          back
          secondaryText={"Your Favourites"}
          navigation={navigation}
          bag
        />
        {favourites.length > 0 ? (
          <FlatList
            data={favourites}
            renderItem={({ item }) => (
              <ProductItem navigation={navigation} product={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{
              padding: 10,
              marginTop: 10,
            }}
          />
        ) : (
          <MyText style={{ textAlign: "center", marginTop: 45 }}>
            Seems like empty! your favourites will appear here...
          </MyText>
        )}
      </SafeAreaView>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.length + 10,
  },
});
