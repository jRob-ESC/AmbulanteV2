import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Divider, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { OrderStatusBadge } from '../components';

const ORDER_ITEMS = [
  { id: '1', name: 'Enfrijoladas con pollo', unitPrice: '27.77', quantity: 9, total: 250 },
  { id: '2', name: 'Enfrijoladas con pollo', unitPrice: '27.77', quantity: 9, total: 250 },
  { id: '3', name: 'Enfrijoladas con pollo', unitPrice: '27.77', quantity: 9, total: 250 },
  { id: '4', name: 'Enfrijoladas con pollo', unitPrice: '27.77', quantity: 9, total: 250 },
];

export function OrderDetailScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { status } = useLocalSearchParams<{ status?: string }>();
  const orderStatus = Array.isArray(status) ? status[0] : status ?? 'Entregado';

  const productsTotal = useMemo(() => '$ 1580.00', []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content title="Detalle del pedido" color={colors.onPrimary} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={[styles.card, styles.firstCard]} mode="elevated">
          <View style={styles.statusBadgeContainer}>
            <OrderStatusBadge status={orderStatus} />
          </View>

          <View style={styles.tableHeader}>
            <Text variant="titleSmall" style={[styles.headerCell, styles.productCol]}>
              Producto
            </Text>
            <Text variant="titleSmall" style={[styles.headerCell, styles.centerCol]}>
              Cantidad
            </Text>
            <Text variant="titleSmall" style={[styles.headerCell, styles.endCol]}>
              Total
            </Text>
          </View>

          {ORDER_ITEMS.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.productInfo}>
                <Image source={{ uri: `https://picsum.photos/80?order-${item.id}` }} style={styles.itemImage} />
                <View style={styles.productTextWrap}>
                  <Text variant="bodyMedium" style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text variant="bodyMedium" style={styles.unitPriceText}>
                    $ {item.unitPrice} /u
                  </Text>
                </View>
              </View>

              <Text variant="bodyLarge" style={[styles.centerCol, styles.qtyText]}>
                {item.quantity}
              </Text>

              <Text variant="bodyLarge" style={[styles.endCol, styles.totalText]}>
                $ {item.total}.00
              </Text>
            </View>
          ))}

          <Divider />

          <View style={styles.summaryRow}>
            <Text variant="titleMedium" style={styles.summaryLabel}>
              Total de productos:
            </Text>
            <Text variant="titleMedium" style={styles.summaryValue}>
              {productsTotal}
            </Text>
          </View>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Metodo de recogida
          </Text>

          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.detailLabel}>
              Tipo de entrega:
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              Vendedor fue a entregar
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.detailLabel}>
              Fecha de Entrega:
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              08/02/2026
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.detailLabel}>
              Lugar de recogida:
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              Modulo R (Puestos)
            </Text>
          </View>
        </Card>

        {orderStatus === 'Pendiente' || orderStatus === 'En proceso' ? (
          <Button
            mode="contained"
            style={styles.buyAgainButton}
            labelStyle={styles.buyAgainLabel}
            buttonColor="#D6372D"
            onPress={() => {}}
          >
            Cancelar
          </Button>
        ) : (
          <Button
            mode="contained"
            style={styles.buyAgainButton}
            labelStyle={styles.buyAgainLabel}
            buttonColor="#D6372D"
            onPress={() => {}}
          >
            Volver a Comprar
          </Button>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginRight: 40,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  firstCard: {
    marginTop: 8,
  },
  statusBadgeContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerCell: {
    fontWeight: '700',
    color: '#2e2e2e',
  },
  productCol: {
    flex: 1.8,
  },
  centerCol: {
    flex: 0.8,
    textAlign: 'center',
  },
  endCol: {
    flex: 0.9,
    textAlign: 'right',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  productInfo: {
    flex: 1.8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productTextWrap: {
    flex: 1,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
  },
  itemName: {
    color: '#2d2d2d',
    fontWeight: '700',
    fontSize: 14,
  },
  unitPriceText: {
    color: '#7d7d7d',
    marginTop: 2,
  },
  qtyText: {
    color: '#111111',
    fontWeight: '700',
  },
  totalText: {
    color: '#D6372D',
    fontWeight: '700',
  },
  summaryRow: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#2d2d2d',
    fontWeight: '600',
  },
  summaryValue: {
    color: '#D6372D',
    fontWeight: '700',
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#2d2d2d',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 6,
  },
  detailLabel: {
    color: '#2d2d2d',
    fontWeight: '700',
    flex: 1.1,
  },
  detailValue: {
    color: '#2d2d2d',
    flex: 1,
    textAlign: 'right',
  },
  buyAgainButton: {
    marginTop: 8,
    alignSelf: 'center',
    borderRadius: 8,
  },
  buyAgainLabel: {
    fontWeight: '700',
    fontSize: 17,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
