import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { API_URL } from "@/config/api";
import { CategoryCard } from "@/features/home/components/CategoryCard";
import { CATEGORIES } from "@/features/home/components/CategoryList";
import { useHomeProducts } from "@/features/home/hooks/useHomeProducts";
import { SuperiorFilter, type FilterConfig } from "@/shared/components";
import { ProductCard } from "../components/ProductCard";

type SortOption = "default" | "price" | "nearby";

const SORT_LABELS: Record<SortOption, string> = {
    default: "Ordenar",
    price: "Precio: menor a mayor",
    nearby: "Cercanía",
};

const CATALOG_FILTERS: FilterConfig[] = [
    {
        key: "sort",
        title: "Ordenar",
        options: Object.values(SORT_LABELS),
        defaultValue: SORT_LABELS.default,
    },
];

export function ProductsCatalogScreen() {
    const { colors } = useTheme();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const {
        data: products,
        isLoading: productsLoading,
        error: productsError,
    } = useHomeProducts({ limit: 12, categoryId: selectedCategoryId });

    const filterValues = {
        sort: SORT_LABELS[sortBy],
    };

    const visibleProducts = useMemo(() => {
        if (!products || sortBy !== "price") {
            return products ?? [];
        }

        return [...products].sort((a, b) => a.price - b.price);
    }, [products, sortBy]);

    const selectCategory = (categoryId: number | null) => {
        setSelectedCategoryId(categoryId);
    };

    const handleFilterChange = (key: string, value: string) => {
        if (key !== "sort") {
            return;
        }

        const option = (Object.keys(SORT_LABELS) as SortOption[]).find(
            (sortKey) => SORT_LABELS[sortKey] === value,
        );
        if (option) {
            setSortBy(option);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.categorySection}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                >
                    <CategoryCard
                        name="Todas"
                        icon="view-grid"
                        selected={selectedCategoryId === null}
                        onPress={() => selectCategory(null)}
                    />
                    {CATEGORIES.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            icon={category.icon}
                            selected={selectedCategoryId === category.id}
                            onPress={() => selectCategory(category.id)}
                        />
                    ))}
                </ScrollView>
            </View>

            <SuperiorFilter
                filters={CATALOG_FILTERS}
                values={filterValues}
                onChange={handleFilterChange}
            />

            {sortBy === "nearby" && (
                <Text
                    variant="bodySmall"
                    style={[styles.horizontalPadding, { color: colors.onSurfaceVariant }]}
                >
                    La ubicación de los vendedores aún no está disponible; se conserva el orden
                    predeterminado.
                </Text>
            )}

            {productsLoading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : productsError ? (
                <Text style={styles.horizontalPadding}>No se pudieron cargar los productos.</Text>
            ) : visibleProducts.length === 0 ? (
                <Text style={styles.horizontalPadding}>
                    No hay productos disponibles en esta categoría.
                </Text>
            ) : (
                <View style={styles.grid}>
                    {visibleProducts.map((item) => (
                        <View key={item.id} style={styles.cardWrapper}>
                            <ProductCard
                                product={{
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    imageUrl: item.imgUrl
                                        ? `${API_URL}${item.imgUrl}`
                                        : undefined,
                                }}
                                vendor={{
                                    id: item.vendor.id,
                                    avatarUrl: item.vendor.imgUrl
                                        ? `${API_URL}${item.vendor.imgUrl}`
                                        : undefined,
                                }}
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        gap: 20,
    },
    categorySection: {
        gap: 12,
    },
    horizontalPadding: {
        paddingHorizontal: 16,
    },
    categoryList: {
        paddingHorizontal: 16,
        gap: 16,
    },
    grid: {
        paddingHorizontal: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
    },
    cardWrapper: {
        width: "48%",
        alignItems: "center",
    },
    loader: {
        marginVertical: 24,
    },
});
