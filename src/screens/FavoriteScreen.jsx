import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import useFavouriteStore from "../store/useFavourite";
import ProductItem from "../components/ProductItem"
import { StatusBar } from 'expo-status-bar';
const FavoriteScreen = ({ route, navigation }) => {
    const { favorites } = useFavouriteStore();
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header back secondaryText={"Your Favorites"} navigation={navigation} />
                <FlatList
                    data={favorites}
                    renderItem={({ item }) => <ProductItem navigation={navigation} product={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{
                        padding: 10,
                        marginTop: 10,
                    }}
                />
            </SafeAreaView>
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.length
    },
})