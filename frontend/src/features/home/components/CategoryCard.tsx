import { Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    name: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    onPress: () => void;
    selected?: boolean;
};

export function CategoryCard({ name, icon, onPress, selected = false }: Props) {
    const { colors } = useTheme();

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: selected ? "#FFF0F0" : colors.surface,
                    borderColor: selected ? "#E1251B" : "#E5E7EB",
                    opacity: pressed ? 0.7 : 1,
                },
            ]}
            onPress={onPress}
        >
            <MaterialCommunityIcons name={icon} size={32} color={colors.primary} />
            <Text
                variant="bodySmall"
                numberOfLines={1}
                style={[styles.label, { color: selected ? colors.primary : colors.onSurface }]}
            >
                {name}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 72,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 6,
        gap: 6,
        borderWidth: 1,
    },
    label: {
        fontWeight: "700",
        fontSize: 11,
        textAlign: "center",
    },
});
