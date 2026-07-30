import { useLocalSearchParams } from "expo-router";
import { ProductsCatalogScreen } from "@/features/products/screens/ProductsCatalogScreen";

export default function ProductsCatalogPage() {
    const { q } = useLocalSearchParams<{ q?: string }>();

    return <ProductsCatalogScreen search={typeof q === "string" ? q : undefined} />;
}
