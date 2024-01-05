import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import useCartStore from "../store/useCartStore";
import useFavouriteStore from "../store/useFavourite";
import MyText from "./CustomText";

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  const { addToCart } = useCartStore();
  const { addToFavourites, removeFromFavourites, favourites } =
    useFavouriteStore();

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

  const handleAddToCartPress = useCallback(() => {
    // add to cart
    addToCart(product);
  }, [addToCart, product]);

  return (
    <View style={styles.itemContainer}>
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
      <Pressable
        onPress={() =>
          navigation.navigate("ProductDetail", {
            product: JSON.stringify(product),
          })
        }
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: product.thumbnail }}
          resizeMode="cover"
          style={styles.image}
        />
      </Pressable>
      <View style={styles.infoContainer}>
        <View>
          <MyText style={styles.price}>${product.price}</MyText>
          <MyText style={styles.title} numberOfLines={1}>
            {product.title}
          </MyText>
        </View>
        <Pressable style={styles.addToCartIcon} onPress={handleAddToCartPress}>
          <AntDesign name="plus" size={14} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: "45%",
    minHeight: 194,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#F8F9FB",
    position: "relative",
  },
  favouriteContainer: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 10,
  },
  imageContainer: {
    width: "100%",
    height: 135,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  infoContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1E222B",
  },
  title: {
    color: "#616A7D",
    fontSize: 12,
    fontWeight: "400",
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  addToCartIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A4BA0",
    borderRadius: 50,
    padding: 1,
  },
});
