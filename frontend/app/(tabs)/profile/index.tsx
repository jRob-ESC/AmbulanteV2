import { ProfileScreen } from "@/features/profile/screens";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { router } from "expo-router";

export default function Profile() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    clearAuth();
    router.replace("/(auth)/login");
  };

  return (
    <ProfileScreen user={user} onLogout={handleLogout} />
  );
}
