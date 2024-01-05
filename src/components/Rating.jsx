import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
const Rating = ({ ratings }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const star =
      i <= ratings ? (
        <AntDesign key={i} name="star" size={24} color="#F9B023" />
      ) : (
        <AntDesign key={i} name="staro" size={24} color="black" />
      );
    stars.push(star);
  }
  return <View style={styles.ratingContainer}>{stars}</View>;
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    columnGap: 1,
    allignItems: "center",
  },
  star: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
