import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/stores"
import { fetchActiveVendors } from "../services/vendorsApi"

export function useActiveVendors() {
    const userId = useAuthStore((state) => state.user?.id);

    return useQuery({
        queryKey: ["active-vendors", userId],
        queryFn: fetchActiveVendors,
        enabled: !!userId,
    });
}
