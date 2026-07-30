import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { CategoryCard } from "./CategoryCard";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CategoryIcon = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export const CATEGORIES: { id: number; name: string; icon: CategoryIcon }[] = [
    { id: 1, name: "Alimentos", icon: "hamburger" },
    { id: 2, name: "Ropa", icon: "tshirt-crew-outline" },
    { id: 3, name: "Calzado", icon: "shoe-sneaker" },
    { id: 4, name: "Accesorios", icon: "glasses" },
    { id: 5, name: "Electrónicos", icon: "devices" },
    { id: 6, name: "Recreativos", icon: "gamepad-variant-outline" },
    { id: 7, name: "Otros", icon: "shape-outline" },
];

export function CategoryList() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text variant="titleMedium" style={styles.title}>Categorías</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {CATEGORIES.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        icon={category.icon}
                        onPress={() => router.push(`/search?category=${category.id}` as any)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    title: {
        paddingHorizontal: 16,
    },
    scroll: {
        paddingHorizontal: 16,
        gap: 16,
    },
});