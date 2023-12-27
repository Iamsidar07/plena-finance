import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Group screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    options={{ tabBarLabel: "Home" }}
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    options={{ tabBarLabel: "Product Details" }}
                    name="ProductDetail"
                    component={ProductDetailScreen}
                />
                <Tab.Screen
                    options={{ tabBarLabel: "Shopping Cart" }}
                    name="ShoppingCart"
                    component={ShoppingCartScreen}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}