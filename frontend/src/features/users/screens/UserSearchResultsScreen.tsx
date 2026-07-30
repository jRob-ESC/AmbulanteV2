import { FlatList, StyleSheet, View } from "react-native";
import { Divider, Searchbar, Text, useTheme } from "react-native-paper";
import { UserSearchCard, type UserSearchResult } from "../components/UserSearchCard";

const MOCK_USERS: UserSearchResult[] = [
    {
        id: 1,
        firstName: "Tacos el",
        lastName: "Paisa",
        imgUrl: "https://picsum.photos/id/64/200/200",
        isVendor: true,
        vendorType: "mobile",
        avgScore: 4.8,
        isOnline: true,
    },
    {
        id: 2,
        firstName: "El Tío",
        lastName: "de los Tacos",
        imgUrl: "https://picsum.photos/id/91/200/200",
        isVendor: true,
        vendorType: "static",
        avgScore: 4.8,
        isOnline: true,
    },
    {
        id: 3,
        firstName: "María's",
        lastName: "Tamales",
        imgUrl: "https://picsum.photos/id/177/200/200",
        isVendor: true,
        vendorType: "mobile",
        avgScore: 4.8,
        isOnline: true,
    },
    {
        id: 4,
        firstName: "Juan",
        lastName: "Tacos",
        imgUrl: "https://picsum.photos/id/1005/200/200",
        isVendor: false,
        vendorType: "static",
        avgScore: 3.9,
        isOnline: false,
    },
    {
        id: 5,
        firstName: "Foodie",
        lastName: "Jorge",
        imgUrl: "https://picsum.photos/id/1012/200/200",
        isVendor: false,
        vendorType: "mobile",
        avgScore: 4.2,
        isOnline: false,
    },
];

type Props = {
    search?: string;
};

export function UserSearchResultsScreen({ search = "" }: Props) {
    const { colors } = useTheme();

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <Searchbar
                placeholder="Buscar vendedores..."
                value={search}
                editable={false}
                style={[styles.searchbar, { backgroundColor: colors.surface }]}
            />

            <FlatList
                data={MOCK_USERS}
                keyExtractor={(item) => String(item.id)}
                ItemSeparatorComponent={() => (
                    <Divider style={{ backgroundColor: colors.outlineVariant }} />
                )}
                ListEmptyComponent={
                    <Text
                        variant="bodyMedium"
                        style={[styles.empty, { color: colors.onSurfaceVariant }]}
                    >
                        No se encontraron usuarios.
                    </Text>
                }
                renderItem={({ item }) => (
                    <UserSearchCard
                        user={item}
                        onPress={() => {}}
                        onViewProfile={() => {}}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    searchbar: {
        margin: 16,
        borderRadius: 12,
        elevation: 1,
    },
    list: {
        paddingBottom: 24,
    },
    empty: {
        textAlign: "center",
        marginTop: 32,
        paddingHorizontal: 16,
    },
});
