import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  addToCartIcon,
  favouriteActiveIcon,
  favouriteInActiveIcon,
} from "../constants/icons";
import useCartStore from "../store/useCartStore";
import useFavoriteStore from "../store/useFavourite";
import { useCallback } from "react";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ProductItem = ({ product, navigation }) => {
  const { addToCart } = useCartStore();
  const { addToFavorites, removeFromFavorites, favorites } = useFavoriteStore();

  const isFavorite = favorites.some(
    (favProduct) => favProduct.id === product.id,
  );

  const handleFavouritePress = useCallback(() => {
    // add or remove to favourite list
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }, [isFavorite, removeFromFavorites, addToFavorites]);

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
        {
          isFavorite ? <AntDesign name="heart" size={24} color="#FF8181" /> :
            <AntDesign name="hearto" size={24} color="black" />
        }

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
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.title}>
            {product.title.length >= 15
              ? `${product.title.slice(0, 14)}...`
              : product.title}
          </Text>
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
