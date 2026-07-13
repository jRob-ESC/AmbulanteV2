import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { BaseListCard } from './BaseListCard';

interface OrderHistoryCardProps {
  orderNumber: string;
  vendor: string;
  orderDate: string;
  status: string;
  itemCount: string;
  total: string;
  image: string;
  vendorAvatar?: string;
}

const STATUS_STYLES: Record<string, { backgroundColor: string; color: string }> = {
  Entregado: { backgroundColor: '#E6F6EA', color: '#25A25A' },
  'En proceso': { backgroundColor: '#FFF4E5', color: '#C27A16' },
  Pendiente: { backgroundColor: '#EEF2FF', color: '#4C6EF5' },
  Cancelado: { backgroundColor: '#FDECEC', color: '#D64545' },
};

export const OrderHistoryCard = ({
  orderNumber,
  vendor,
  orderDate,
  status,
  itemCount,
  total,
  image,
  vendorAvatar,
}: OrderHistoryCardProps) => {
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.Pendiente;

  return (
    <BaseListCard image={image} rightAdornment={<Text style={styles.chevron}>›</Text>}>
      <View style={styles.topRow}>
        <View style={styles.headerRow}>
          <Text variant="titleSmall" style={styles.orderTitle} numberOfLines={1}>
            Orden #{orderNumber}
          </Text>
          <Text variant="bodySmall" style={styles.vendorText} numberOfLines={1}>
            Distribuidora {vendor}
          </Text>
          <Text variant="bodySmall" style={styles.dateText} numberOfLines={1}>
            {orderDate}
          </Text>
        </View>

        <View style={styles.avatarWrap}>
          {vendorAvatar ? (
            <Image source={{ uri: vendorAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text variant="labelSmall" style={[styles.statusText, { color: statusStyle.color }]}>
            {status}
          </Text>
        </View>

        <View style={styles.metricsContainer}>
          <Text variant="bodyMedium" style={styles.itemsText}>
            {itemCount} articulos
          </Text>
          <Text variant="titleMedium" style={styles.totalText}>
            $ {total}
          </Text>
        </View>
      </View>
    </BaseListCard>
  );
};

const styles = StyleSheet.create({
  chevron: {
    color: '#b5b5b5',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingRight: 18,
  },
  headerRow: {
    flex: 1,
    gap: 1,
  },
  orderTitle: {
    color: '#2d2d2d',
    fontWeight: '700',
    lineHeight: 20,
  },
  vendorText: {
    color: '#7d7d7d',
  },
  dateText: {
    color: '#7d7d7d',
  },
  avatarWrap: {
    marginLeft: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d7e4ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d7e4ec',
  },
  avatarText: {
    fontSize: 16,
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metricsContainer: {
    alignItems: 'flex-end',
  },
  itemsText: {
    color: '#3e3e3e',
  },
  totalText: {
    color: '#1f8f45',
    fontWeight: '700',
  },
});
