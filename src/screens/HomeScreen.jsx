import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/CustomText";
import ProductItem from "../components/ProductItem";
import { BASE_URL, DELEVERY_LOCATION } from "../config";
import { data } from "../constants/carousel";
import { SCREEN_WIDTH } from "../constants/screen";
import useCartStore from "../store/useCartStore";
import { debounce } from "../utils/debounce";
import { showToast } from "../utils/toast";
export default function HomeScreen() {
  const navigation = useNavigation();
  const { cart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isErrorWhileFetchingProducts, setIsErrorWhileFetchingProducts] =
    useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    StatusBar.setBackgroundColor("#2A4BA0");
    StatusBar.setBarStyle("light-content");
    return () => {
      StatusBar.setBackgroundColor("#2A4BA0");
      StatusBar.setBarStyle("dark-content");
    };
  }, []);
  const fetchProducts = async () => {
    try {
      setIsFetchingProducts(true);
      setIsErrorWhileFetchingProducts(false);
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        setIsErrorWhileFetchingProducts(true);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      showToast(error.message);
      setIsErrorWhileFetchingProducts(true);
    } finally {
      setIsFetchingProducts(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = useCallback(
    (value) => {
      setSearchInput(value);
      const debounceFunc = debounce(() => {
        const results = products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase()),
        );
        setSearchResults(results);
      }, 700);
      debounceFunc();
    },
    [products, searchInput, searchResults, debounce],
  );

  const carouselItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.carouselItem}
        />
      </View>
    );
  };

  const renderProductItem = ({ item }) => {
    return <ProductItem product={item} />;
  };

  const ListHeaderComponent = () => {
    return (
      <>
        {!searchInput ? (
          <FlatList
            data={data}
            renderItem={carouselItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={{
              padding: 10,
            }}
          />
        ) : null}
        <MyText style={[styles.recommendedTitle]}>
          {searchInput ? `"${searchInput}"` : "Recommended"}
        </MyText>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <MyText style={styles.headerTitle}>Hey, Rahul</MyText>
          <Pressable onPress={() => navigation.navigate("ShoppingCart")}>
            <Feather name="shopping-bag" size={24} color="white" />
            <MyText style={styles.cartQuantity}>{cart.length}</MyText>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="search1" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Search for products or store"
            placeholderTextColor={"#8891A5"}
            cursorColor={"#8891A5"}
            value={searchInput}
            onChangeText={handleSearchChange}
          />
        </View>
        <View style={styles.deliveryDetailContainer}>
          {/* left */}
          <View>
            <MyText style={styles.deliveryDetailTitle}>DELEVERY TO</MyText>
            <View style={styles.deliveryDetailDescriptionContainer}>
              <MyText style={styles.deliveryDetailDescription}>
                {DELEVERY_LOCATION.length >= 20
                  ? `${DELEVERY_LOCATION.slice(0, 20)}...`
                  : DELEVERY_LOCATION}
              </MyText>
              <Pressable>
                <AntDesign name="down" size={14} color="#8891A5" />
              </Pressable>
            </View>
          </View>
          {/* right */}
          <View style={styles.deliveryDetailLeftContainer}>
            <MyText style={styles.deliveryDetailTitle}> WITHIN</MyText>
            <View style={styles.deliveryDetailDescriptionContainer}>
              <MyText style={styles.deliveryDetailDescription}>1 HOUR</MyText>
              <Pressable>
                <AntDesign name="down" size={14} color="#8891A5" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {isFetchingProducts ? (
        <ActivityIndicator
          size={"large"}
          color={"#2A4BA0"}
          style={{ marginTop: 25 }}
        />
      ) : (
        <FlatList
          data={searchInput ? searchResults : products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{
            padding: 0,
            paddingBottom: 100,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isFetchingProducts}
              onRefresh={fetchProducts}
              colors={["#2A4BA0"]} // Customizing the refresh indicator color(s)
              progressBackgroundColor="#F8F9FB" // Background color of the refresh indicator
            />
          }
        />
      )}
      {isErrorWhileFetchingProducts && !isFetchingProducts ? (
        <MyText style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}>
          Something went wrong!
        </MyText>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  headerContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#2A4BA0",
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 22,
    color: "#F8F9FB",
  },
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    position: "relative",
  },
  cartQuantity: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 50,
    top: -4,
    left: 9,
    backgroundColor: "#FFC83A",
    color: "#FFFFFF",
    textAlign: "center",
    borderColor: "#ffffff",
    borderWidth: 2,
  },
  searchIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  arrowIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  inputContainer: {
    padding: 15,
    backgroundColor: "#153075",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 50,
    marginTop: 15,
  },
  input: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 14,
    flex: 1,
    lineHeight: 19.2,
    fontFamily: "Manrope_400Regular",
  },
  deliveryDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 10,
  },
  deliveryDetailTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8891A5",
    lineHeight: 15.2,
    letterSpacing: 0.2,
  },
  deliveryDetailDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F8F9FB",
    lineHeight: 19.2,
    letterSpacing: 0.2,
  },
  deliveryDetailDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 4,
  },
  carouselItem: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  item: {
    width: SCREEN_WIDTH - 50,
    height: 123,
    marginRight: 20,
  },
  recommendedTitle: {
    fontSize: 30,
    fontWeight: "400",
    lineHeight: 38,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
