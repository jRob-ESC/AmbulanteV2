import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Menu, Text, useTheme } from 'react-native-paper';
import { AppButton, StockInput, UserAvatar, VendorTypeChip } from '@/shared/components';

const SELLER = {
    id: 1,
    name: 'María González',
    type: 'mobile' as const,
    avatarUrl: 'https://i.pravatar.cc/160?img=47',
};

const CART_PRODUCTS = [
    {
        id: 1,
        category: 'CAFÉ DEL MERCADO',
        name: 'Guadalajara Blend - Edición Especial',
        price: 420,
        imageUrl: 'https://picsum.photos/id/766/300/300',
    },
    {
        id: 2,
        category: 'ELECTRODOMÉSTICOS',
        name: 'Molinillo Eléctrico Compacto',
        price: 950,
        imageUrl: 'https://picsum.photos/id/30/300/300',
    },
    {
        id: 3,
        category: 'HOGAR',
        name: 'Juego de Tazas Cerámica (4 pzs)',
        price: 300,
        imageUrl: 'https://picsum.photos/id/225/300/300',
    },
];

const SHIPPING_OPTIONS = [
    'Recoger con el vendedor',
    'Entrega en punto acordado',
    'Envío a domicilio',
];

export function CartDetailScreen() {
    const { colors } = useTheme();
    const [quantities, setQuantities] = useState<Record<number, number>>({
        1: 2,
        2: 1,
        3: 1,
    });
    const [shippingMenuVisible, setShippingMenuVisible] = useState(false);
    const [shippingType, setShippingType] = useState('');

    const total = useMemo(
        () =>
            CART_PRODUCTS.reduce(
                (sum, product) => sum + product.price * (quantities[product.id] ?? 0),
                0,
            ),
        [quantities],
    );

    const updateQuantity = (productId: number, quantity: number) => {
        setQuantities((current) => ({ ...current, [productId]: quantity }));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.productsCard, { backgroundColor: colors.surface }]}>
                    {CART_PRODUCTS.map((product, index) => {
                        const quantity = quantities[product.id] ?? 0;
                        const subtotal = product.price * quantity;

                        return (
                            <View key={product.id}>
                                <View style={styles.productRow}>
                                    <Image source={{ uri: product.imageUrl }} style={styles.productImage} />

                                    <View style={styles.productDetails}>
                                        <Text
                                            variant="labelSmall"
                                            numberOfLines={1}
                                            style={{ color: colors.textSecondary }}
                                        >
                                            {product.category}
                                        </Text>
                                        <Text
                                            variant="titleMedium"
                                            numberOfLines={2}
                                            style={[styles.productName, { color: colors.textPrimary }]}
                                        >
                                            {product.name}
                                        </Text>
                                        <Text
                                            variant="titleMedium"
                                            style={[styles.price, { color: colors.primary }]}
                                        >
                                            ${product.price.toFixed(2)} MXN
                                        </Text>

                                        <View style={styles.quantityRow}>
                                            <StockInput
                                                value={quantity}
                                                onChange={(value) => updateQuantity(product.id, value)}
                                                step={1}
                                                height={34}
                                                compact
                                                style={styles.stockInput}
                                            />
                                            <View style={styles.subtotal}>
                                                <Text
                                                    variant="labelSmall"
                                                    style={{ color: colors.textSecondary }}
                                                >
                                                    Subtotal ({quantity} pz)
                                                </Text>
                                                <Text
                                                    variant="labelLarge"
                                                    style={[styles.subtotalValue, { color: colors.textPrimary }]}
                                                >
                                                    ${subtotal.toFixed(2)} MXN
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {index < CART_PRODUCTS.length - 1 && (
                                    <Divider style={{ backgroundColor: colors.border }} />
                                )}
                            </View>
                        );
                    })}
                </View>

                <Card
                    style={[styles.sellerCard, { backgroundColor: colors.surface }]}
                    mode="elevated"
                >
                    <Card.Content style={styles.sellerContent}>
                        <UserAvatar
                            userId={SELLER.id}
                            avatarUrl={SELLER.avatarUrl}
                            size={48}
                        />
                        <View style={styles.sellerDetails}>
                            <Text variant="labelSmall" style={{ color: colors.textSecondary }}>
                                Vendido por
                            </Text>
                            <Text
                                variant="titleMedium"
                                style={[styles.sellerName, { color: colors.textPrimary }]}
                            >
                                {SELLER.name}
                            </Text>
                        </View>
                        <VendorTypeChip type={SELLER.type} alignSelf="center" />
                    </Card.Content>
                </Card>

                <View style={[styles.shippingCard, { backgroundColor: colors.surface }]}>
                    <Text
                        variant="titleMedium"
                        style={[styles.sectionTitle, { color: colors.textPrimary }]}
                    >
                        Tipo de envío
                    </Text>

                    <Menu
                        visible={shippingMenuVisible}
                        onDismiss={() => setShippingMenuVisible(false)}
                        contentStyle={{ backgroundColor: colors.surface }}
                        anchor={
                            <Button
                                mode="outlined"
                                icon="chevron-down"
                                contentStyle={styles.shippingButtonContent}
                                style={[styles.shippingButton, { borderColor: colors.border }]}
                                textColor={shippingType ? colors.textPrimary : colors.textSecondary}
                                onPress={() => setShippingMenuVisible(true)}
                            >
                                {shippingType || 'Elige tu tipo de envío'}
                            </Button>
                        }
                    >
                        {SHIPPING_OPTIONS.map((option) => (
                            <Menu.Item
                                key={option}
                                title={option}
                                onPress={() => {
                                    setShippingType(option);
                                    setShippingMenuVisible(false);
                                }}
                            />
                        ))}
                    </Menu>
                </View>

                <View style={[styles.totalCard, { backgroundColor: colors.surface }]}>
                    <Text variant="titleMedium" style={{ color: colors.textPrimary }}>
                        Total de la compra
                    </Text>
                    <Text
                        variant="headlineSmall"
                        style={[styles.totalValue, { color: colors.primary }]}
                    >
                        ${total.toFixed(2)} MXN
                    </Text>
                </View>

                <AppButton
                    icon="cash"
                    disabled={!shippingType || total === 0}
                    style={styles.confirmButton}
                    onPress={() => {}}
                >
                    Confirmar compra en efectivo
                </AppButton>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 24,
        gap: 14,
    },
    productsCard: {
        borderRadius: 14,
        paddingHorizontal: 14,
        elevation: 1,
    },
    productRow: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 14,
    },
    productImage: {
        width: 104,
        height: 104,
        borderRadius: 10,
    },
    productDetails: {
        flex: 1,
        gap: 2,
    },
    productName: {
        fontWeight: '800',
        lineHeight: 20,
    },
    price: {
        fontWeight: '800',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        marginTop: 4,
    },
    stockInput: {
        flex: 0,
        width: 98,
    },
    subtotal: {
        flex: 1,
        alignItems: 'flex-end',
    },
    subtotalValue: {
        fontWeight: '700',
    },
    sellerCard: {
        borderRadius: 14,
    },
    sellerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
    },
    sellerDetails: {
        flex: 1,
    },
    sellerName: {
        fontWeight: '800',
    },
    shippingCard: {
        borderRadius: 14,
        padding: 14,
        gap: 10,
        elevation: 1,
    },
    sectionTitle: {
        fontWeight: '800',
    },
    shippingButton: {
        borderRadius: 10,
    },
    shippingButtonContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        height: 48,
    },
    totalCard: {
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1,
    },
    totalValue: {
        fontWeight: '800',
    },
    confirmButton: {
        width: '100%',
        alignSelf: 'stretch',
    },
});
