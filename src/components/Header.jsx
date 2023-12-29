import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { backIcon, bagDark } from '../constants/icons'
import useCartStore from '../store/useCartStore'

const Header = ({ back, title, secondaryText, bag }) => {
  const { cart } = useCartStore();
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {
          back ? <Pressable style={styles.backContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </Pressable> : null
        }
        {
          title ? <Text style={styles.title}>{title}</Text> : null
        }
        {
          secondaryText ? <Text style={styles.secondaryText}>Hey, Rahul</Text> : null
        }

      </View>
      {
        bag ? <Pressable>
          <Image source={bagDark} style={styles.cartIcon} />
          <Text style={styles.cartQuantity}>{cart.length}</Text>
        </Pressable> : null
      }
    </View>
  )
}

export default Header

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
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    position: "relative"
  },
  cartQuantity: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 50,
    top: -7,
    left: 9,
    backgroundColor: "#FFC83A",
    color: "#FFFFFF",
    textAlign: "center",
    borderColor: "#ffffff",
    borderWidth: 2
  },
})