import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useFocusEffect } from "expo-router";
import { VendorMapCard, type VendorMapCardData } from "../components";
import { consumeQueuedVendorSelection } from "../pendingMapVendor";

const INITIAL_REGION: Region = {
    latitude: 20.6736,
    longitude: -103.344,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
};

type VendorMarker = VendorMapCardData & {
    latitude: number;
    longitude: number;
};

const VENDORS: VendorMarker[] = [
    {
        id: "1",
        firstName: "Don",
        lastName: "Chava",
        imgUrl: "https://i.pravatar.cc/150?img=11",
        isMobileVendor: true,
        avgScore: 4.3,
        reviewsCount: 120,
        locationName: "Centro · Mercado San Juan",
        openUntil: "20:00",
        categories: ["Tacos", "Bebidas", "Antojitos"],
        products: [
            { id: "101", uri: "https://picsum.photos/id/292/200/200" },
            { id: "102", uri: "https://picsum.photos/id/493/200/200" },
            { id: "103", uri: "https://picsum.photos/id/488/200/200" },
            { id: "104", uri: "https://picsum.photos/id/429/200/200" },
            { id: "105", uri: "https://picsum.photos/id/404/200/200" },
            { id: "106", uri: "https://picsum.photos/id/312/200/200" },
        ],
        latitude: 20.6764,
        longitude: -103.3474,
    },
    {
        id: "2",
        firstName: "La Esquina",
        lastName: "del Sabor",
        imgUrl: "https://i.pravatar.cc/150?img=47",
        isMobileVendor: false,
        avgScore: 4.7,
        reviewsCount: 85,
        locationName: "Americana · Plaza del Sol",
        openUntil: "21:00",
        categories: ["Tortas", "Jugos"],
        products: [
            { id: "201", uri: "https://picsum.photos/id/431/200/200" },
            { id: "202", uri: "https://picsum.photos/id/312/200/200" },
            { id: "203", uri: "https://picsum.photos/id/326/200/200" },
            { id: "204", uri: "https://picsum.photos/id/188/200/200" },
            { id: "205", uri: "https://picsum.photos/id/225/200/200" },
        ],
        latitude: 20.6712,
        longitude: -103.3615,
    },
    {
        id: "3",
        firstName: "Lupita",
        lastName: "Antojitos",
        imgUrl: "https://i.pravatar.cc/150?img=5",
        isMobileVendor: true,
        avgScore: 3.9,
        reviewsCount: 47,
        locationName: "Chapultepec · Parque México",
        openUntil: "18:00",
        categories: ["Tamales", "Atole"],
        products: [
            { id: "301", uri: "https://picsum.photos/id/102/200/200" },
            { id: "302", uri: "https://picsum.photos/id/139/200/200" },
            { id: "303", uri: "https://picsum.photos/id/225/200/200" },
            { id: "304", uri: "https://picsum.photos/id/292/200/200" },
            { id: "305", uri: "https://picsum.photos/id/431/200/200" },
        ],
        latitude: 20.6654,
        longitude: -103.3716,
    },
];

export function MapScreen() {
    const mapRef = useRef<MapView>(null);
    const [selectedVendor, setSelectedVendor] = useState<VendorMarker | null>(null);

    useFocusEffect(
        useCallback(() => {
            const id = consumeQueuedVendorSelection();
            if (!id) {
                setSelectedVendor(null);
                return;
            }

            const vendor = VENDORS.find((item) => item.id === id);
            if (!vendor) {
                setSelectedVendor(null);
                return;
            }

            setSelectedVendor(vendor);
            mapRef.current?.animateToRegion({
                latitude: vendor.latitude,
                longitude: vendor.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.015,
            });
        }, []),
    );

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
                onPress={() => setSelectedVendor(null)}
            >
                {VENDORS.map((vendor) => (
                    <Marker
                        key={vendor.id}
                        coordinate={{
                            latitude: vendor.latitude,
                            longitude: vendor.longitude,
                        }}
                        onPress={(e) => {
                            e.stopPropagation();
                            setSelectedVendor(vendor);
                        }}
                    />
                ))}
            </MapView>

            {selectedVendor && (
                <View style={styles.cardContainer}>
                    <VendorMapCard
                        vendor={selectedVendor}
                        onClose={() => setSelectedVendor(null)}
                    />
                </View>
            )}
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
    cardContainer: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 24,
    },
});
