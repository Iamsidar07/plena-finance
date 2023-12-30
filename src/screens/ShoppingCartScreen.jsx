import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated
} from "react-native";
import useCartStore from "../store/useCartStore";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import { DELEVERY_CHARGE } from "../config";
import { useState } from "react";
export default function ShoppingCartScreen({ navigation }) {
  const [animation] = useState(new Animated.Value(1));
  const [removedProductId, setRemovedProductId] = useState(null);
  const { cart, increaseQuantity, decreaseQuantity, clearCart } =
    useCartStore();
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subTotal + DELEVERY_CHARGE;

  const handleDecreaseQuantity = (item) => {
    console.log("item", item);

    if (item["quantity"] === 1) {
      console.log("Yes");
      setRemovedProductId(item.id);
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // After animation, remove item
        decreaseQuantity(item.id);
        animation.setValue(1);
      });
      return;
    }
    decreaseQuantity(item.id);
  }

  const renderItem = ({ item }) => {
    return (
      <Animated.View
        key={item.id}
        style={[
          styles.cartItemContainer,
          {
            opacity: removedProductId === item.id ? animation : 1,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.cartItem}>
          <View style={styles.cartItemLeft}>
            <Pressable
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product: JSON.stringify(item),
                })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
            </Pressable>
            <View style={styles.cartInfoContainer}>
              <Text style={styles.cartItemTitle}>{item.title}</Text>
              <Text style={styles.cartItemPrice}>${item.price}</Text>
            </View>
          </View>
          <View style={styles.cartItemRight}>
            <Pressable
              style={styles.increaseQuantityTextContainer}
              onPress={() => increaseQuantity(item.id)}
            >
              <Text style={styles.controller}>+</Text>
            </Pressable>
            <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
            <Pressable
              style={styles.increaseQuantityTextContainer}
              onPress={() => handleDecreaseQuantity(item)}
            >
              <Text style={styles.controller}>-</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        back
        bag
        secondaryText={`Shopping Cart(${cart.length})`}
        navigation={navigation}
      />
      <View style={styles.contentContainer}>
        {cart?.length > 0 ? (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
            <View style={styles.totalContainer}>
              <View style={styles.totalRowContainer}>
                <Text style={styles.leftTotalText}>Subtotal</Text>
                <Text style={styles.rightTotalText}>${subTotal}</Text>
              </View>
              <View style={styles.totalRowContainer}>
                <Text style={styles.leftTotalText}>Delivery</Text>
                <Text style={styles.rightTotalText}>${DELEVERY_CHARGE}</Text>
              </View>
              <View style={styles.totalRowContainer}>
                <Text style={styles.leftTotalText}>Total</Text>
                <Text style={styles.rightTotalText}>${total}</Text>
              </View>
              <Pressable style={[styles.button]}>
                <Text style={styles.checkoutText}>Proceed To Checkout</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <Text style={{ textAlign: "center" }}>Your cart is empty</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.length + 50,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 2,
  },
  cartItemContainer: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: "#EBEBFB",
    paddingVertical: 5,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartItemLeft: {
    flexDirection: "row",
    columnGap: 10,
    flex: 0.7,
  },
  cartInfoContainer: {
    width: "100%",
  },
  cartItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E222B",
    lineHeight: 19.2,
    maxWidth: "100%",
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E222B",
  },
  cartItemRight: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  increaseQuantityTextContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#F8F9FB",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  controller: {
    color: "#130F26",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19.2,
  },
  cartItemQuantity: {
    color: "#130F26",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19.2,
  },
  totalContainer: {
    marginTop: "auto",
    padding: 20,
    borderRadius: 30,
    marginHorizontal: -10,
    backgroundColor: "#F8F9FB",
    rowGap: 12,
  },
  totalRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftTotalText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#616A7D",
  },
  rightTotalText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E222B",
  },
  button: {
    width: "100%",
    borderRadius: 20,
    height: 56,
    backgroundColor: "#2A4BA0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  checkoutText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.2,
    color: "#ffffff",
  },
});
