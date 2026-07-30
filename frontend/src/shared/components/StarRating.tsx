import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    score: number;
    size?: number;
};

export function StarRating({ score, size = 14 }: Props) {
    const { colors } = useTheme();

    return (
        <View style={styles.row}>
            <MaterialCommunityIcons name="star" size={size} color="#F59E0B" />
            <Text
                variant="bodySmall"
                style={{ color: colors.onSurface, fontWeight: "700", fontSize: size }}
            >
                {score.toFixed(1)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
});
