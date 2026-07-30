import { Pressable, StyleSheet, Image, View } from "react-native";

type Props = { 
    userId: number;
    avatarUrl?: string | null;
    size?: number;
    onPress?: () => void;
    isActive?: boolean;
    activeIndicatorSize?: number;
    activeIndicatorColor?: string;
};

export function UserAvatar({
    avatarUrl,
    size = 40,
    onPress,
    isActive,
    activeIndicatorSize = 10,
    activeIndicatorColor,
}: Props) {
    const avatar = (
        <Image
            source={{ uri: avatarUrl ?? undefined }}
            style={[
                styles.avatar,
                { width: size, height: size, borderRadius: size / 2 }
            ]}
        />
    );

    return (
        <View>
            {onPress ? (
                <Pressable onPress={onPress}>{avatar}</Pressable>
            ) : (
                avatar
            )}

            {isActive && (
                <View
                    style={[
                        styles.activeIndicator,
                        {
                            width: activeIndicatorSize,
                            height: activeIndicatorSize,
                            borderRadius: activeIndicatorSize / 2,
                            ...(activeIndicatorColor
                                ? { backgroundColor: activeIndicatorColor }
                                : {}),
                        },
                    ]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },
    activeIndicator: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#22C55E",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    }
});