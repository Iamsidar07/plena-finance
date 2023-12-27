import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { arrowIcon, cartIcon, searchIcon } from "../constants/icons";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Hey, Rahul</Text>
                    <Image source={cartIcon} style={styles.cartIcon} />
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
                                Green Way 3000, Sylhet
                            </Text>
                            <Image source={arrowIcon} style={styles.arrowIcon} />
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
                            <Image source={arrowIcon} style={styles.arrowIcon} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
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
        width: 35,
        height: 35,
        resizeMode: "contain"
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
        letterSpacing: 0.2
    },
    deliveryDetailDescriptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        gap: 4,
    },
    


})