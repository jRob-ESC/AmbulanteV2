import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BaseListCard } from './BaseListCard';

const DELIVERY_STATUS_STYLES: Record<string, { backgroundColor: string; color: string }> = {
  'Por Entregar': { backgroundColor: '#FFF4E5', color: '#C27A16' },
  'En Camino': { backgroundColor: '#EEF2FF', color: '#4C6EF5' },
  Entregado: { backgroundColor: '#E6F6EA', color: '#25A25A' },
  Cancelado: { backgroundColor: '#FDECEC', color: '#D64545' },
};

interface SaleOrderHistoryCardProps {
  productName: string;
  buyerName: string;
  orderDate: string;
  deliveryStatus: string;
  total: string;
  image: string;
  buyerAvatar?: string;
}

export const SaleOrderHistoryCard = ({
  productName,
  buyerName,
  orderDate,
  deliveryStatus,
  total,
  image,
  buyerAvatar,
}: SaleOrderHistoryCardProps) => {
  const deliveryStyle = DELIVERY_STATUS_STYLES[deliveryStatus] ?? DELIVERY_STATUS_STYLES['Por Entregar'];

  return (
    <BaseListCard image={image}>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <Text variant="titleSmall" style={styles.productName} numberOfLines={1}>
            {productName}
          </Text>
          <Text variant="bodySmall" style={styles.buyerText} numberOfLines={1}>
            Para: {buyerName}
          </Text>
          <View style={styles.dateRow}>
            {buyerAvatar ? (
              <Image source={{ uri: buyerAvatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarIcon}>
                <MaterialCommunityIcons name="account" size={14} color="#7d7d7d" />
              </View>
            )}
            <Text variant="bodySmall" style={styles.dateText}>
              {orderDate}
            </Text>
          </View>
        </View>

        <View style={styles.rightCol}>
          <View style={styles.totalRow}>
            <Text variant="bodySmall" style={styles.ventaLabel}>
              Venta:{' '}
            </Text>
            <Text variant="titleSmall" style={styles.totalAmount}>
              ${total}
            </Text>
          </View>

          <Chip
            compact
            mode="flat"
            style={[styles.deliveryChip, { backgroundColor: deliveryStyle.backgroundColor }]}
            textStyle={[styles.deliveryChipText, { color: deliveryStyle.color }]}
          >
            {deliveryStatus}
          </Chip>
        </View>
      </View>
    </BaseListCard>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  leftCol: {
    flex: 1,
    gap: 2,
  },
  productName: {
    color: '#2d2d2d',
    fontWeight: '700',
    lineHeight: 20,
  },
  buyerText: {
    color: '#7d7d7d',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  avatarIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#d7e4ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#d7e4ec',
  },
  dateText: {
    color: '#7d7d7d',
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ventaLabel: {
    color: '#7d7d7d',
  },
  totalAmount: {
    color: '#2d2d2d',
    fontWeight: '700',
  },
  deliveryChip: {
    minHeight: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryChipText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
