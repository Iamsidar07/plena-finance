import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SCREEN_WIDTH } from "../constants/screen";
import useFavouriteStore from "../store/useFavourite";
import { AntDesign } from "@expo/vector-icons";

const ImageCarousel = ({ product }) => {
  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToFavourites, removeFromFavourites, favourites } = useFavouriteStore();

  const isFavourite = favourites.some(
    (favProduct) => favProduct.id === product.id,
  );

  const handleFavouritePress = useCallback(() => {
    // add or remove to favourite list
    if (isFavourite) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }
  }, [isFavourite, removeFromFavourites, addToFavourites]);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }, []);

  const renderItem = ({ item }) => {
    return <Image source={{ uri: item }} style={styles.image} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={product.images}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        snapToAlignment="center"
        snapToStart={true}
        scrollEnabled={true}
        pagingEnabled={true}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfigRef.current}
      />
      <Pressable
        style={styles.favouriteContainer}
        onPress={handleFavouritePress}
      >
        {isFavourite ? (
          <AntDesign name="heart" size={24} color="#FF8181" />
        ) : (
          <AntDesign name="hearto" size={24} color="black" />
        )}
      </Pressable>
      <View style={styles.paginationContainer}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={{
              ...styles.paginationDot,
              borderColor: index === currentIndex ? "#F9B023" : "#E4E4E4",
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 207,
    position: "relative",
  },
  image: {
    width: SCREEN_WIDTH,
    height: 207,
    resizeMode: "contain",
  },
  favouriteContainer: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 10,
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  paginationContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    left: 10,
    flexDirection: "row",
    columnGap: 5,
  },
  paginationDot: {
    borderWidth: 4,
    borderRadius: 5,
    width: 17,
  },
});
