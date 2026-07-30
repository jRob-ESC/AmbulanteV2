import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StarRating, UserAvatar, VendorTypeChip } from "@/shared/components";

export type UserSearchResult = {
    id: number;
    firstName: string;
    lastName: string;
    imgUrl?: string;
    isVendor: boolean;
    vendorType?: "mobile" | "static";
    avgScore?: number;
    isOnline?: boolean;
};

type Props = {
    user: UserSearchResult;
    onPress?: () => void;
    onViewProfile?: () => void;
};

export function UserSearchCard({ user, onPress, onViewProfile }: Props) {
    const { colors } = useTheme();

    const fullName = `${user.firstName} ${user.lastName}`;
    const roleLabel = user.isVendor ? "Vendedor" : "Cliente";

    const indicatorColor = user.isOnline
        ? undefined
        : colors.onSurfaceDisabled;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: colors.surface,
                    opacity: pressed ? 0.85 : 1,
                },
            ]}
        >
            <UserAvatar
                userId={user.id}
                avatarUrl={user.imgUrl}
                size={56}
                isActive
                activeIndicatorSize={14}
                activeIndicatorColor={indicatorColor}
            />

            <View style={styles.body}>
                <Text
                    variant="titleSmall"
                    numberOfLines={1}
                    style={{ color: colors.onSurface, fontWeight: "700" }}
                >
                    {fullName}
                </Text>

                <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                    {roleLabel}
                </Text>

                {user.vendorType && (
                    <VendorTypeChip type={user.vendorType} />
                )}

                <Pressable onPress={onViewProfile} hitSlop={8}>
                    <Text
                        variant="labelMedium"
                        style={[styles.profileLink, { color: colors.primary }]}
                    >
                        Ver Perfil
                    </Text>
                </Pressable>
            </View>

            <View style={styles.right}>
                {user.avgScore !== undefined && (
                    <StarRating score={user.avgScore} />
                )}
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={colors.onSurfaceVariant}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    body: {
        flex: 1,
        gap: 3,
    },
    badge: {
        marginTop: 2,
    },
    profileLink: {
        marginTop: 2,
        fontWeight: "600",
    },
    right: {
        alignItems: "flex-end",
        gap: 4,
    },
    rating: {
        marginTop: 2,
    },
});
