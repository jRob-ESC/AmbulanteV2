import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function ProfileLayout() {
    const { colors } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.onPrimary,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    color: colors.onPrimary,
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Perfil",
                    headerShown: true,
                }}
            />
            <Stack.Screen name="my-products" />
            <Stack.Screen name="order-history" />
            <Stack.Screen name="order-detail" />
            <Stack.Screen name="sales-history" />
            <Stack.Screen name="products/register" />
            <Stack.Screen name="products/[id]" />
        </Stack>
    );
}
