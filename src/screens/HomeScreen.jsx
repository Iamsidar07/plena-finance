import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { arrowIcon, cartIcon, searchIcon } from "../constants/icons";
import { data } from "../constants/carousel";
import { SCREEN_WIDTH } from "../constants/screen";
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import useCartStore from "../store/useCartStore";

const location = "Green Way 3000, Sylhet"

const BASE_URL = `https://dummyjson.com`

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [isFetchingProducts, setIsFetchingProducts] = useState(true);
    const [isErrorWhileFetchingProducts, setIsErrorWhileFetchingProducts] = useState(false);
    const { cart } = useCartStore();
    console.log({ cart })
    useEffect(() => {
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
                console.log(error);
                setIsErrorWhileFetchingProducts(true)
            } finally {
                setIsFetchingProducts(false)
            }
        }
        fetchProducts();
    }, [])

    const carouselItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Image
                    source={item.image}
                    resizeMode="contain"
                    style={styles.carouselItem}
                />
            </View>
        )
    }

    const renderProductItem = ({ item }) => {
        return (
            <ProductItem product={item} />
        )
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Hey, Rahul</Text>
                    <Pressable>
                        <Image source={cartIcon} style={styles.cartIcon} />
                        <Text style={styles.cartQuantity}>{cart.length}</Text>
                    </Pressable>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={searchIcon} style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search for products or store"
                        placeholderTextColor={"#8891A5"}
                        cursorColor={"#8891A5"}
                    />
                </View>
                <View style={styles.deliveryDetailContainer}>
                    {/* left */}
                    <View style={styles.deliveryDetailLeftContainer}>
                        <Text style={styles.deliveryDetailTitle}>
                            DELEVERY TO
                        </Text>
                        <View style={styles.deliveryDetailDescriptionContainer}>
                            <Text style={styles.deliveryDetailDescription}>
                                {location.length >= 20 ? `${location.slice(0, 20)}...` : location}
                            </Text>
                            <Pressable>
                                <Image source={arrowIcon} style={styles.arrowIcon} />
                            </Pressable>
                        </View>
                    </View>
                    {/* right */}
                    <View style={styles.deliveryDetailLeftContainer}>
                        <Text style={styles.deliveryDetailTitle}>
                            WITHIN
                        </Text>
                        <View style={styles.deliveryDetailDescriptionContainer}>
                            <Text style={styles.deliveryDetailDescription}>
                                1 HOUR
                            </Text>
                            <Pressable>
                                <Image source={arrowIcon} style={styles.arrowIcon} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <View>
                <FlatList
                    data={data}
                    renderItem={carouselItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    contentContainerStyle={{
                        padding: 10,
                    }}
                />
            </View>
            <Text style={styles.recommendedTitle}>Recommended</Text>
            <>
                {
                    isFetchingProducts ? <Text style={{ textAlign: "center" }}>Loading...</Text> : <FlatList
                        data={products}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={{
                            padding: 10,
                        }}
                    />
                }
            </>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },
    fixedHeader: {
        backgroundColor: '#2A4BA0',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 0,
    },
    scrollableContent: {
        flex: 1,
    },
    headerContainer: {
        padding: 20,
        backgroundColor: "#2A4BA0",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
    },
    searchIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain"
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
        marginTop: 45,
    },
    input: {
        color: "#FFF",
        fontWeight: "500",
        fontSize: 14,
        flex: 1,
        lineHeight: 19.2
    },
    deliveryDetailContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30,
    },
    deliveryDetailLeftContainer: {

    },
    deliveryDetailTitle: {
        fontSize: 11,
        fontWeight: "800",
        color: "#8891A5",
        lineHeight: 15.2,
        letterSpacing: 0.2
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
        backgroundColor: "red",
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
        padding: 20,
    }
})