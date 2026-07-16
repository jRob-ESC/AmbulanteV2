import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

interface OrderStatusBadgeProps {
  status: string;
}

const STATUS_STYLES: Record<string, { backgroundColor: string; color: string }> = {
  Entregado: { backgroundColor: '#E6F6EA', color: '#25A25A' },
  'En proceso': { backgroundColor: '#FFF4E5', color: '#C27A16' },
  Pendiente: { backgroundColor: '#EEF2FF', color: '#4C6EF5' },
  Cancelado: { backgroundColor: '#FDECEC', color: '#D64545' },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.Pendiente;

  return (
    <Chip
      compact
      mode="flat"
      style={[styles.badge, { backgroundColor: statusStyle.backgroundColor }]}
      textStyle={[styles.badgeText, { color: statusStyle.color }]}
    >
      {status}
    </Chip>
  );
}

const styles = StyleSheet.create({
  badge: {
    minHeight: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
