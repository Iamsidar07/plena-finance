import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import useCartStore from "../store/useCartStore";
import { Feather, AntDesign } from '@expo/vector-icons';

const Header = ({ back, title, secondaryText, bag, navigation }) => {
  const { cart } = useCartStore();
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {back ? (
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backContainer}
          >
            <AntDesign name="left" size={15} color="#1E222B" />
          </Pressable>
        ) : null}
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {secondaryText ? (
          <Text style={styles.secondaryText}>{secondaryText}</Text>
        ) : null}
      </View>
      {bag ? (
        <Pressable onPress={() => navigation.navigate("ShoppingCart")}>
          <Feather name="shopping-bag" size={24} color="black" />
          <Text style={styles.cartQuantity}>{cart.length}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
  },
  backContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
    borderRadius: 50,
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  secondaryText: {
    color: "#1E222B",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  cartQuantity: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 50,
    top: -10,
    left: 15,
    backgroundColor: "#FFC83A",
    color: "#FFFFFF",
    textAlign: "center",
    borderColor: "#ffffff",
    borderWidth: 2,
  },
});
