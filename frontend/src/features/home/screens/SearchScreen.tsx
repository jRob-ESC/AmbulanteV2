import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Searchbar, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { SearchSuggestions } from "../components/SearchSuggestions";

export type SearchEntity = "products" | "vendors";

const ENTITY_OPTIONS: { value: SearchEntity; label: string }[] = [
    { value: "products", label: "Productos" },
    { value: "vendors", label: "Vendedores" },
];

export function SearchScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [entity, setEntity] = useState<SearchEntity>("products");

    const goToResults = (search: string) => {
        const trimmed = search.trim();
        if (!trimmed) {
            return;
        }

        if (entity === "vendors") {
            router.push({ pathname: "/users" as any, params: { q: trimmed } });
        } else {
            router.push({ pathname: "/products" as any, params: { q: trimmed } });
        }
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <Searchbar
                placeholder={
                    entity === "products"
                        ? "Buscar productos..."
                        : "Buscar vendedores..."
                }
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => goToResults(query)}
                autoFocus
                style={[styles.searchbar, { backgroundColor: colors.surface }]}
            />

            <View style={styles.entityRow}>
                {ENTITY_OPTIONS.map((option) => {
                    const active = entity === option.value;
                    return (
                        <Pressable
                            key={option.value}
                            onPress={() => setEntity(option.value)}
                            style={[
                                styles.chip,
                                active
                                    ? {
                                          backgroundColor: colors.primary,
                                          borderColor: colors.primary,
                                      }
                                    : {
                                          backgroundColor: colors.surface,
                                          borderColor: colors.border,
                                      },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.chipLabel,
                                    {
                                        color: active
                                            ? colors.onPrimary
                                            : colors.textSecondary,
                                    },
                                ]}
                                numberOfLines={1}
                            >
                                {option.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <SearchSuggestions onSelect={goToResults} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    searchbar: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        elevation: 1,
    },
    entityRow: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
        marginTop: 12,
    },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    chipLabel: {
        fontSize: 13,
        fontWeight: "500",
    },
    content: {
        paddingBottom: 24,
        marginTop: 8,
    },
});
