import { useQuery } from "@tanstack/react-query"
import { fetchHomeProducts } from "../services/productsApi"

type ProductQuery = {
    limit?: number;
    categoryId?: number | null;
};

export function useHomeProducts(options: ProductQuery = {}) {
    const { limit = 4, categoryId = null } = options;

    return useQuery({
        queryKey: ["home-products", limit, categoryId],
        queryFn: () => fetchHomeProducts({ limit, categoryId })
    });
}