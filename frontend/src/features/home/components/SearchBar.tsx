import { Pressable, StyleSheet } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

export function SearchBar() {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <Pressable onPress={() => router.push("/search" as any)}>
            <Searchbar
                placeholder="Buscar productos o vendedores..."
                value=""
                editable={false}
                pointerEvents="none"
                style={[styles.searchbar, { backgroundColor: colors.surface }]}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchbar: {
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 1,
    },
});
