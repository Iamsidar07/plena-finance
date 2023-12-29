import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { showToast } from "../utils/toast";
import { BASE_URL } from "../config";
import ProductItem from "../components/ProductItem";

export default function ProductDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const [product, setProduct] = useState({});
    const [isFetchingProduct, setIsFetchingProduct] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                setIsError(false);
                setIsFetchingProduct(true);
                const response = await fetch(`${BASE_URL}/products/${id}`);
                const data = await response.json();
                console.log(data);
                setProduct(data);
            } catch (error) {
                showToast(error.message);
                setIsError(true);
            } finally {
                setIsFetchingProduct(false);
            }
        };
        getProductDetails();
    }, [])
    return (
        <>
            <Text>{product?.title}</Text>
        </>
    )
}