import { Pressable, StyleSheet, Image, View } from "react-native";

type Props = { 
    userId: number;
    avatarUrl?: string | null;
    size?: number;
    onPress?: () => void;
    isActive?: boolean;
};

export function UserAvatar({ avatarUrl, size = 40, onPress, isActive }: Props) {
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
                <View style={styles.activeIndicator} />
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
        bottom: 2,
        right: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#22C55E",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    }
});