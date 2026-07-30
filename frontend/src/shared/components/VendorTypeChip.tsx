import { StyleSheet, type ViewStyle } from "react-native";
import { Chip, useTheme } from "react-native-paper";

export type VendorType = "mobile" | "static";

type Props = {
    type: VendorType;
    alignSelf?: ViewStyle["alignSelf"];
};

const CONFIG = {
    mobile: {
        label: "Ambulante",
        icon: "map-marker-account",
        colorKey: "primary",
    },
    static: {
        label: "Estático",
        icon: "store",
        colorKey: "secondary",
    },
} as const;

export function VendorTypeChip({ type, alignSelf = "flex-start" }: Props) {
    const { colors } = useTheme();
    const { label, icon, colorKey } = CONFIG[type];
    const color = colors[colorKey];

    return (
        <Chip
            compact
            mode="outlined"
            icon={icon}
            style={[styles.chip, { borderColor: color, backgroundColor: colors.surface, alignSelf }]}
            textStyle={[styles.text, { color }]}
        >
            {label}
        </Chip>
    );
}

const styles = StyleSheet.create({
    chip: {
        height: 24,
    },
    text: {
        fontSize: 12,
        fontWeight: "700",
        marginVertical: 0,
    },
});
