import { Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Surface, Text, useTheme } from "react-native-paper";

const INITIAL_REGION: Region = {
    latitude: 20.6736,
    longitude: -103.344,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
};

const VENDORS = [
    {
        id: "1",
        title: "Tacos Don Chava",
        description: "Centro",
        latitude: 20.6764,
        longitude: -103.3474,
    },
    {
        id: "2",
        title: "La Esquina del Sabor",
        description: "Americana",
        latitude: 20.6712,
        longitude: -103.3615,
    },
    {
        id: "3",
        title: "Antojitos Lupita",
        description: "Chapultepec",
        latitude: 20.6654,
        longitude: -103.3716,
    },
];

export function MapScreen() {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
            >
                {VENDORS.map((vendor) => (
                    <Marker
                        key={vendor.id}
                        coordinate={{
                            latitude: vendor.latitude,
                            longitude: vendor.longitude,
                        }}
                        title={vendor.title}
                        description={vendor.description}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    legend: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 16,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 2,
    },
    webContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 8,
    },
});
