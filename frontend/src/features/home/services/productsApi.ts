import { HomeProductResponse } from "../types/product";
import { API_URL } from "@/config/api";
import { authFetch } from "@/config/httpClient";

type ProductQuery = {
    limit?: number;
    categoryId?: number | null;
};

export async function fetchHomeProducts({
    limit = 4,
    categoryId,
}: ProductQuery = {}): Promise<HomeProductResponse[]> {
    const params = new URLSearchParams({ limit: String(limit) });

    if (categoryId != null) {
        params.set("categoryId", String(categoryId));
    }

    const res = await authFetch(`${API_URL}/products/random?${params.toString()}`);

    if(!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}