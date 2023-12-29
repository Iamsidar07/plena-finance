import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SCREEN_WIDTH } from '../constants/screen'
import { favouriteActiveIcon, favouriteInActiveIcon } from '../constants/icons'
import useFavoriteStore from '../store/useFavourite'

const ImageCarousel = ({ product }) => {
    const viewabilityConfigRef = useRef({
        itemVisiblePercentThreshold: 50,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToFavorites, removeFromFavorites, favorites } = useFavoriteStore();

    const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);

    const handleFavouritePress = () => {
        // add or remove to favourite list
        if (isFavorite) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    }
    const renderItem = ({ item }) => {
        return (
            <Image source={{ uri: item }} style={styles.image} />
        )
    }
    const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={product.images}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                horizontal
                snapToAlignment='center'
                snapToStart={true}
                scrollEnabled={true}
                pagingEnabled={true}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={viewabilityConfigRef.current}
            />
            <Pressable style={styles.favouriteContainer} onPress={handleFavouritePress}>
                <Image source={isFavorite ? favouriteActiveIcon : favouriteInActiveIcon} style={styles.icon} />
            </Pressable>
            <View style={styles.paginationContainer}>
                {product.images.map((_, index) => (
                    <View key={index} style={{ ...styles.paginationDot, borderColor: index === currentIndex ? "#F9B023" : "#E4E4E4" }} />
                ))}
            </View>
        </View>
    )
}

export default ImageCarousel

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: 207,
        position: "relative",
        backgroundColor: "#F8F9FB",
    },
    image: {
        width: SCREEN_WIDTH,
        height: 207,
        resizeMode: "contain",
    },
    favouriteContainer: {
        position: "absolute",
        zIndex: 1,
        top: 10,
        right: 10,
        width: 58,
        height: 58,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 1
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    paginationContainer: {
        position: "absolute",
        zIndex: 1,
        bottom: 10,
        left: 10,
        flexDirection: "row",
        columnGap: 5,
    },
    paginationDot: {
        borderWidth: 4,
        borderRadius: 5,
        width: 17,
    }
})