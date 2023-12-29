import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
import Rating from "../components/Rating";
import useCartStore from "../store/useCartStore";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProductDetailScreen({ route, navigation }) {
  const { addToCart } = useCartStore();
  const product = JSON.parse(route.params.product);
  const price = product.price;
  const discountPercentage = product.discountPercentage;
  const salePrice = price - ((price * discountPercentage) / 100).toFixed(2);
  const discountPrice = (price - salePrice).toFixed(2);

  const handleAddToCartPress = useCallback(() => {
    addToCart(product);
  }, [product]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Header back bag navigation={navigation} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.reviewContainer}>
            <Rating ratings={product.rating} />
            <Text style={styles.reviewText}>{product.rating} Star</Text>
          </View>
          <View style={styles.carouselContainer}>
            <ImageCarousel product={product} />
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.salePrice}>${product.price.toFixed(2)}</Text>
            <Text style={styles.discountPrice}>${discountPrice} OFF</Text>
          </View>
          <View style={styles.actionContainer}>
            <Pressable
              onPress={handleAddToCartPress}
              style={[styles.button, styles.addToCart]}
            >
              <Text style={styles.addToCartText}>Add To Cart</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buyNow]}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </Pressable>
          </View>
          <Text style={styles.detail}>Details</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 25,
    lineHeight: 19,
  },
  title: {
    fontSize: 50,
    fontWeight: "300",
    lineHeight: 62.55,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    columnGap: 5,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#A1A1AB",
  },
  carouselContainer: {
    marginTop: 10,
    marginHorizontal: -25,
    position: "relative",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    columnGap: 5,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#2A4BA0",
  },
  discountPrice: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "#FAFBFD",
    backgroundColor: "#2A4BA0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 70,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    columnGap: 5,
    width: "100%",
  },
  button: {
    width: "50%",
    borderRadius: 20,
    height: 56,
  },
  addToCart: {
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A4BA0",
  },
  buyNow: {
    backgroundColor: "#2A4BA0",
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19.2,
    color: "#2A4BA0",
  },
  buyNowText: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19.2,
    color: "#ffffff",
  },
  detail: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "#1E222B",
  },
  descriptionContainer: {
    paddingVertical: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "#8891A5",
  },
});

