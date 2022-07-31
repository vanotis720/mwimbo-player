import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Components/HomeScreen';
import ProductDetail from '../Components/ProductDetail';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigation() {
    return (
        <Stack.Navigator initialRouteName="HomeStack">
            <Stack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="ProductDetail" options={{ headerShown: false }} component={ProductDetail} />
        </Stack.Navigator>
    );
}