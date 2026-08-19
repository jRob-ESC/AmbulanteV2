import { Redirect, Tabs, useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuthStore } from "@/features/auth/stores"

export default function TabsLayout() {
    const { colors } = useTheme();
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Tabs 
            screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.onPrimary,
                headerTitleStyle: {
                    color: colors.onPrimary,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.outline,
                }
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen 
                name="map"
                options={{
                    title: "Mapa",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="map-marker" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Carrito",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Buscar",
                    href: null,
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={colors.onPrimary}
                            style={{ marginLeft: 16 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="users/index"
                options={{
                    title: "Usuarios",
                    href: null,
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={colors.onPrimary}
                            style={{ marginLeft: 16 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="products/index"
                options={{
                    title: "Productos",
                    href: null,
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={colors.onPrimary}
                            style={{ marginLeft: 16 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="products/[id]"
                options={{
                    title: "Detalle del producto",
                    href: null,
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={colors.onPrimary}
                            style={{ marginLeft: 16 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="vendors/[id]"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}