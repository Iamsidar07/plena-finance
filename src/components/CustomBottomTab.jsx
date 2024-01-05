import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MyText from "./CustomText";
const CustomBottomTab = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    {
      id: 1,
      name: "Home",
      title: "Home",
      icon: <AntDesign name="home" size={24} color="black" />,
      activeIcon: <Entypo name="home" size={24} color="#E0B420" />,
    },

    {
      id: 2,
      name: "ShoppingCart",
      title: "Cart",
      icon: <Feather name="shopping-bag" size={24} color="black" />,
      activeIcon: <Entypo name="shopping-bag" size={24} color="#E0B420" />,
    },
    {
      id: 3,
      name: "Favourites",
      title: "Favourite",
      icon: <AntDesign name="hearto" size={24} color="black" />,
      activeIcon: <AntDesign name="heart" size={24} color="#E0B420" />,
    },
  ];

  const handlePress = (tab) => {
    setActiveTab(tab.name);
    navigation.navigate(tab.name);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <Pressable
            key={tab.id}
            onPress={() => handlePress(tab)}
            style={styles.itemContainer}
          >
            <View
              style={[styles.itemIcon, isActive ? styles.itemIconActive : {}]}
            >
              {isActive ? tab.activeIcon : tab.icon}
            </View>
            <MyText
              style={[styles.itemText, { display: isActive ? "none" : "flex" }]}
            >
              {tab.title}
            </MyText>
          </Pressable>
        );
      })}
      <Pressable style={styles.itemContainer}>
        <Entypo name="dots-three-vertical" size={24} color="black" />
        <MyText style={[styles.itemText]}>More</MyText>
      </Pressable>
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    allignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 12,
    color: "#8891A5",
    fontWeight: "500",
    marginTop: 2,
  },
  itemIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  itemIconActive: {
    padding: 20,
    borderRadius: 50,
    borderColor: "#C4C4C4",
    borderWidth: 5,
    backgroundColor: "#1E222B",
    position: "relative",
    elevation: 1,
    shadowColor: "#A3A5B8",
    borderCurve: 12,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    transform: [
      {
        translateY: -35,
      },
    ],
  },
});
