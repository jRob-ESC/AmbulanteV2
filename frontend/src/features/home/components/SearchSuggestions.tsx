import { StyleSheet, View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

const SUGGESTIONS = [
    "Tacos al pastor",
    "Elotes",
    "Aguas frescas",
    "Hot dogs",
    "Fruta picada",
    "Tamales",
];

type Props = {
    onSelect?: (suggestion: string) => void;
};

export function SearchSuggestions({ onSelect }: Props) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text variant="titleMedium" style={styles.title}>
                Sugerencias
            </Text>
            {SUGGESTIONS.map((suggestion) => (
                <List.Item
                    key={suggestion}
                    title={suggestion}
                    left={(props) => (
                        <List.Icon {...props} icon="magnify" color={colors.onSurfaceVariant} />
                    )}
                    onPress={() => onSelect?.(suggestion)}
                    style={styles.item}
                    titleStyle={{ color: colors.onSurface }}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    title: {
        paddingHorizontal: 8,
        marginBottom: 4,
    },
    item: {
        paddingVertical: 2,
    },
});
