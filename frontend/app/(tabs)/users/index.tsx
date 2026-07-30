import { useLocalSearchParams } from "expo-router";
import { UserSearchResultsScreen } from "@/features/users/screens/UserSearchResultsScreen";

export default function UsersSearchPage() {
    const { q } = useLocalSearchParams<{ q?: string }>();

    return <UserSearchResultsScreen search={typeof q === "string" ? q : undefined} />;
}
