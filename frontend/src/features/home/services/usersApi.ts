import { FavoriteVendorResponse } from "../types/user";
import { API_URL } from "@/config/api";
import { authFetch } from "@/config/httpClient";
import { useAuthStore } from "@/features/auth/stores";

export async function fetchActiveVendors(): Promise<FavoriteVendorResponse[]> {
    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const res = await authFetch(`${API_URL}/users/${userId}/favorites`);

    if (!res.ok) {
        throw new Error("Failed to fetch vendors");
    }

    return res.json();
}
