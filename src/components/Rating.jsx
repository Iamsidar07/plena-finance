import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ratingFilled, ratingOutline } from '../constants/icons';

const Rating = ({ ratings }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Image
                source={i <= ratings ? ratingFilled : ratingOutline}
                style={styles.star}
                key={i}
            />
        )
    }
    return (
        <View style={styles.ratingContainer}>
            {stars}
        </View>
    )
}

export default Rating

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
    }
})