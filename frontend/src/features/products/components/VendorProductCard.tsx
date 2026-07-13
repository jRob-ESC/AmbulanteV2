import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { BaseListCard } from './BaseListCard';

interface VendorProductCardProps {
  name: string;
  category: string;
  price: string;
  stock: string;
  isActive: boolean;
  image: string;
}

export function VendorProductCard({
  name,
  category,
  price,
  stock,
  isActive,
  image,
}: VendorProductCardProps) {
  return (
    <BaseListCard image={image}>
      <View style={styles.headerRow}>
        <Text variant="titleSmall" style={styles.productName} numberOfLines={1}>
          {name}
        </Text>
        <Text variant="bodySmall" style={styles.categoryText}>
          Categoria: {category}
        </Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.priceColumn}>
          <Text variant="titleMedium" style={styles.priceText}>
            $ {price}
          </Text>
        </View>

        <View style={styles.rightMetrics}>
          <Text variant="bodyMedium" style={styles.stockText}>
            Stock: {stock}
          </Text>

          <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={[styles.statusText, isActive ? styles.activeText : styles.inactiveText]}>
              {isActive ? 'ACTIVO' : 'INACTIVO'}
            </Text>
          </View>
        </View>
      </View>
    </BaseListCard>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    gap: 2,
  },
  productName: {
    color: '#2d2d2d',
    fontWeight: '700',
    lineHeight: 20,
  },
  categoryText: {
    color: '#7d7d7d',
  },
  footerRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceColumn: {
    minWidth: 72,
  },
  rightMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceText: {
    color: '#232323',
    fontWeight: '700',
  },
  stockText: {
    color: '#4f4f4f',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  activeBadge: {
    backgroundColor: '#E6F6EA',
  },
  inactiveBadge: {
    backgroundColor: '#F1F1F1',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  activeText: {
    color: '#25A25A',
  },
  inactiveText: {
    color: '#7D7D7D',
  },
});
