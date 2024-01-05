import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import useCartStore from "../store/useCartStore";
import MyText from "./CustomText";

const Header = ({ back, title, secondaryText, bag }) => {
  const navigation = useNavigation();
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
        {title ? <MyText style={styles.title}>{title}</MyText> : null}
        {secondaryText ? (
          <MyText style={styles.secondaryText}>{secondaryText}</MyText>
        ) : null}
      </View>
      {bag ? (
        <Pressable onPress={() => navigation.navigate("ShoppingCart")}>
          <Feather name="shopping-bag" size={24} color="black" />
          <MyText style={styles.cartQuantity}> {cart.length}</MyText>
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
