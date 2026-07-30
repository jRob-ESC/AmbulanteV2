import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppButton, StockInput } from '@/shared/components';

const MOCK_PRODUCT = {
    id: 1,
    category: 'CAFE DEL MERCADO',
    name: 'GUADALAJARA BLEND - Edición Especial',
    price: 420.0,
    originalPrice: 480.0,
    rating: 4.8,
    reviewCount: 112,
    stock: 25,
    description:
        'Café artesanal de cuerpo medio, notas de chocolate oscuro y cítricos suaves, cultivado en la región serrana de Jalisco. Perfecto para disfrutar en cualquier momento del día.',
    imageUrl: 'https://picsum.photos/id/766/800/600',
};

export function ProductDetailScreen() {
    const { colors } = useTheme();
    const [quantity, setQuantity] = useState(1);
    const [expanded, setExpanded] = useState(false);

    const subtotal = MOCK_PRODUCT.price * quantity;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: MOCK_PRODUCT.imageUrl }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Content */}
                <View style={[styles.contentCard, { backgroundColor: colors.surface }]}>
                    {/* Category */}
                    <Text
                        variant="labelMedium"
                        style={[styles.category, { color: colors.secondary }]}
                    >
                        {MOCK_PRODUCT.category}
                    </Text>

                    {/* Product name */}
                    <Text
                        variant="headlineSmall"
                        style={[styles.productName, { color: colors.textPrimary }]}
                    >
                        {MOCK_PRODUCT.name}
                    </Text>

                    {/* Price row */}
                    <View style={styles.priceRow}>
                        <Text
                            variant="headlineMedium"
                            style={[styles.price, { color: colors.primary }]}
                        >
                            ${MOCK_PRODUCT.price.toFixed(2)} MXN
                        </Text>
                        <Text
                            variant="bodyMedium"
                            style={[styles.originalPrice, { color: colors.textSecondary }]}
                        >
                            ${MOCK_PRODUCT.originalPrice.toFixed(2)} MXN
                        </Text>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                        <MaterialCommunityIcons name="star" size={18} color="#F59E0B" />
                        <Text
                            variant="bodyMedium"
                            style={[styles.ratingValue, { color: colors.textPrimary }]}
                        >
                            {MOCK_PRODUCT.rating}
                        </Text>
                        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                            ({MOCK_PRODUCT.reviewCount} reseñas)
                        </Text>
                    </View>

                    {/* Description */}
                    <Text
                        variant="bodyMedium"
                        style={[styles.description, { color: colors.textSecondary }]}
                        numberOfLines={expanded ? undefined : 3}
                    >
                        {MOCK_PRODUCT.description}
                    </Text>
                    <Pressable onPress={() => setExpanded(!expanded)} hitSlop={6}>
                        <Text
                            variant="labelMedium"
                            style={[styles.expandToggle, { color: colors.primary }]}
                        >
                            {expanded ? 'Ver menos' : 'Ver más'}
                        </Text>
                    </Pressable>

                    <Divider style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Quantity section */}
                    <Text
                        variant="titleMedium"
                        style={[styles.sectionTitle, { color: colors.textPrimary }]}
                    >
                        Selección de Cantidad
                    </Text>

                    <View style={styles.qtyRow}>
                        <StockInput
                            value={quantity}
                            onChange={setQuantity}
                            step={1}
                            style={styles.stockInput}
                        />
                        <View style={styles.stockInfo}>
                            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                                Stock Disponible ({MOCK_PRODUCT.stock} pz)
                            </Text>
                            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                                Subtotal ({quantity} pz): ${(MOCK_PRODUCT.price * quantity).toFixed(2)} MXN
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Fixed bottom bar */}
            <View
                style={[
                    styles.bottomBar,
                    {
                        backgroundColor: colors.surface,
                        borderTopColor: colors.border,
                    },
                ]}
            >
                <View style={styles.subtotalBlock}>
                    <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                        Subtotal:
                    </Text>
                    <Text
                        variant="titleMedium"
                        style={[styles.subtotalAmount, { color: colors.primary }]}
                    >
                        ${subtotal.toFixed(2)} MXN ({quantity} pz)
                    </Text>
                </View>
                <AppButton
                    icon="cart-plus"
                    style={styles.addButton}
                    onPress={() => {}}
                >
                    Añadir al Carrito
                </AppButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        paddingBottom: 16,
    },
    /* Hero */
    heroContainer: {
        height: 280,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    /* Content */
    contentCard: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -22,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
        gap: 10,
    },
    category: {
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    productName: {
        fontWeight: '800',
        lineHeight: 30,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 10,
        flexWrap: 'wrap',
    },
    price: {
        fontWeight: '800',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingValue: {
        fontWeight: '700',
    },
    description: {
        lineHeight: 22,
    },
    expandToggle: {
        marginTop: -4,
    },
    divider: {
        marginVertical: 6,
    },
    sectionTitle: {
        fontWeight: '700',
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    stockInput: {
        flex: 0,
        width: 160,
    },
    stockInfo: {
        flex: 1,
        gap: 4,
    },
    /* Bottom bar */
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: 1,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    subtotalBlock: {
        gap: 2,
    },
    subtotalAmount: {
        fontWeight: '800',
    },
    addButton: {
        alignSelf: 'auto',
        borderRadius: 10,
    },
});
