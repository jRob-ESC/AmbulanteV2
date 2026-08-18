import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Divider, IconButton, Surface, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton, StarRating, UserAvatar, VendorTypeChip } from "@/shared/components";

export interface VendorProduct {
    id: string;
    uri: string;
}

export interface VendorMapCardData {
    id: string;
    firstName: string;
    lastName: string;
    imgUrl?: string;
    isMobileVendor: boolean;
    avgScore: number;
    reviewsCount: number;
    locationName?: string;
    openUntil?: string;
    categories?: string[];
    products?: VendorProduct[];
}

type Props = {
    vendor: VendorMapCardData;
    onClose: () => void;
};

const MAX_VISIBLE_IMAGES = 4;

export function VendorMapCard({ vendor, onClose }: Props) {
    const { colors } = useTheme();
    const router = useRouter();

    const fullName = `${vendor.firstName} ${vendor.lastName}`;
    const vendorType = vendor.isMobileVendor ? "mobile" : "static";

    return (
        <Surface style={[styles.card, { backgroundColor: colors.surface }]} elevation={4}>
            {/* Header */}
            <View style={styles.header}>
                <UserAvatar
                    userId={Number(vendor.id)}
                    avatarUrl={vendor.imgUrl}
                    size={56}
                    isActive
                    activeIndicatorSize={14}
                />

                <View style={styles.headerInfo}>
                    <View style={styles.nameRow}>
                        <Text
                            variant="titleMedium"
                            numberOfLines={1}
                            style={[styles.name, { color: colors.onSurface }]}
                        >
                            {fullName}
                        </Text>
                        <VendorTypeChip type={vendorType} />
                    </View>

                    <View style={styles.ratingRow}>
                        <StarRating score={vendor.avgScore} size={14} />
                        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                            ({vendor.reviewsCount.toLocaleString()})
                        </Text>
                    </View>
                </View>

                <IconButton
                    icon="close"
                    size={18}
                    onPress={onClose}
                    style={styles.closeButton}
                    iconColor={colors.onSurfaceVariant}
                />
            </View>

            <Divider style={styles.divider} />

            {/* Details */}
            <View style={styles.details}>
                {vendor.locationName && (
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            size={16}
                            color={colors.primary}
                        />
                        <Text
                            variant="bodySmall"
                            style={[styles.detailText, { color: colors.onSurface }]}
                            numberOfLines={1}
                        >
                            {vendor.locationName}
                        </Text>
                    </View>
                )}

                {vendor.openUntil && (
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                            name="clock-outline"
                            size={16}
                            color={colors.onSurfaceVariant}
                        />
                        <Text
                            variant="bodySmall"
                            style={{ color: colors.onSurfaceVariant }}
                        >
                            {`Horario: Abierto hasta ${vendor.openUntil}`}
                        </Text>
                    </View>
                )}

                {vendor.categories && vendor.categories.length > 0 && (
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                            name="tag-multiple-outline"
                            size={16}
                            color={colors.onSurfaceVariant}
                        />
                        <Text
                            variant="bodySmall"
                            style={[styles.detailText, { color: colors.onSurface }]}
                            numberOfLines={1}
                        >
                            {vendor.categories.join(", ")}
                        </Text>
                    </View>
                )}
            </View>

            {vendor.products && vendor.products.length > 0 && (
                <>
                    <Divider style={styles.divider} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productImagesRow}
                    >
                        {vendor.products.slice(0, MAX_VISIBLE_IMAGES).map((product) => (
                            <Pressable
                                key={product.id}
                                onPress={() => router.push(`/products/${product.id}` as any)}
                                style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}
                            >
                                <Image
                                    source={{ uri: product.uri }}
                                    style={[styles.productImage, { borderColor: colors.outlineVariant }]}
                                />
                            </Pressable>
                        ))}
                        {vendor.products.length > MAX_VISIBLE_IMAGES && (
                            <Pressable
                                onPress={() => router.push(`/vendors/${vendor.id}` as any)}
                                style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}
                            >
                                <View style={[styles.productImage, styles.moreImagesOverlay, { backgroundColor: colors.surfaceVariant }]}>
                                    <Text variant="titleSmall" style={{ color: colors.onSurfaceVariant, fontWeight: "700" }}>
                                        +{vendor.products.length - MAX_VISIBLE_IMAGES}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    </ScrollView>
                </>
            )}

            <AppButton
                icon="account-circle-outline"
                onPress={() => router.push(`/vendors/${vendor.id}` as any)}
                style={styles.profileButton}
            >
                Ver perfil
            </AppButton>
        </Surface>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    headerInfo: {
        flex: 1,
        gap: 5,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
    name: {
        fontWeight: "700",
        flexShrink: 1,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    closeButton: {
        margin: 0,
        marginTop: -4,
        marginRight: -8,
    },
    divider: {
        marginVertical: 12,
    },
    details: {
        gap: 8,
        marginBottom: 14,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    detailText: {
        flex: 1,
    },
    profileButton: {
        alignSelf: "stretch",
        marginTop: 14,
    },
    productImagesRow: {
        gap: 8,
        paddingVertical: 2,
    },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 10,
        borderWidth: 1,
    },
    moreImagesOverlay: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
    },
});
