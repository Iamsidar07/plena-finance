import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";
import FavouriteScreen from "./src/screens/FavouriteScreen";
import CustomBottomTab from "./src/components/CustomBottomTab";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_300Light,
  Manrope_800ExtraBold,
  Manrope_200ExtraLight,
} from "@expo-google-fonts/manrope";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_300Light,
    Manrope_800ExtraBold,
    Manrope_200ExtraLight,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" backgroundColor="#2A4BA0" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
          <Stack.Screen name="Favourites" component={FavouriteScreen} />
        </Stack.Navigator>
        <CustomBottomTab />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

