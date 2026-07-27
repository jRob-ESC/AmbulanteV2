import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Appbar, Divider, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SuperiorFilter, type FilterConfig } from '@/shared/components';
import { SaleOrderHistoryCard } from '../components';

interface SaleOrderHistoryItem {
  id: string;
  productName: string;
  buyerName: string;
  orderDate: string;
  deliveryStatus: string;
  total: string;
  image: string;
  buyerAvatar: string;
}

const SALE_FILTERS: FilterConfig[] = [
  {
    key: 'fecha',
    title: 'Fecha',
    options: ['Cualquiera', 'Hoy', 'Esta semana', 'Este mes', 'Últimos 3 meses'],
    defaultValue: 'Cualquiera',
  },
  {
    key: 'entrega',
    title: 'Entrega',
    options: ['Todos', 'Por Entregar', 'En Camino', 'Entregado', 'Cancelado'],
    defaultValue: 'Todos',
  },
];

const SALES: SaleOrderHistoryItem[] = [
  { id: '1', productName: 'Tacos dorados', buyerName: 'Juan Pérez', orderDate: '16/05/2024', deliveryStatus: 'Por Entregar', total: '240.00', image: 'https://picsum.photos/80?101', buyerAvatar: 'https://picsum.photos/32?301' },
  { id: '2', productName: 'Enfrijoladas con pollo', buyerName: 'María García', orderDate: '12/01/2026', deliveryStatus: 'Entregado', total: '1580.00', image: 'https://picsum.photos/80?102', buyerAvatar: 'https://picsum.photos/32?302' },
  { id: '3', productName: 'Tamales oaxaqueños', buyerName: 'Carlos López', orderDate: '13/01/2026', deliveryStatus: 'Por Entregar', total: '320.00', image: 'https://picsum.photos/80?103', buyerAvatar: 'https://picsum.photos/32?303' },
  { id: '4', productName: 'Pozole rojo', buyerName: 'Ana Martínez', orderDate: '14/01/2026', deliveryStatus: 'En Camino', total: '950.00', image: 'https://picsum.photos/80?104', buyerAvatar: 'https://picsum.photos/32?304' },
  { id: '5', productName: 'Chilaquiles verdes', buyerName: 'Roberto Sánchez', orderDate: '15/01/2026', deliveryStatus: 'Cancelado', total: '410.00', image: 'https://picsum.photos/80?105', buyerAvatar: 'https://picsum.photos/32?305' },
  { id: '6', productName: 'Tostadas de tinga', buyerName: 'Sofía Hernández', orderDate: '16/01/2026', deliveryStatus: 'Entregado', total: '730.00', image: 'https://picsum.photos/80?106', buyerAvatar: 'https://picsum.photos/32?306' },
  { id: '7', productName: 'Sopa azteca', buyerName: 'Luis Torres', orderDate: '17/01/2026', deliveryStatus: 'Por Entregar', total: '560.00', image: 'https://picsum.photos/80?107', buyerAvatar: 'https://picsum.photos/32?307' },
  { id: '8', productName: 'Gorditas de chicharrón', buyerName: 'Claudia Ramírez', orderDate: '18/01/2026', deliveryStatus: 'Por Entregar', total: '290.00', image: 'https://picsum.photos/80?108', buyerAvatar: 'https://picsum.photos/32?308' },
  { id: '9', productName: 'Flautas de res', buyerName: 'Diego Flores', orderDate: '19/01/2026', deliveryStatus: 'Entregado', total: '840.00', image: 'https://picsum.photos/80?109', buyerAvatar: 'https://picsum.photos/32?309' },
  { id: '10', productName: 'Huaraches de nopales', buyerName: 'Patricia Cruz', orderDate: '20/01/2026', deliveryStatus: 'En Camino', total: '670.00', image: 'https://picsum.photos/80?110', buyerAvatar: 'https://picsum.photos/32?310' },
  { id: '11', productName: 'Memelas con frijoles', buyerName: 'Fernando Díaz', orderDate: '21/01/2026', deliveryStatus: 'Entregado', total: '380.00', image: 'https://picsum.photos/80?111', buyerAvatar: 'https://picsum.photos/32?311' },
  { id: '12', productName: 'Tlayuda oaxaqueña', buyerName: 'Valeria Morales', orderDate: '22/01/2026', deliveryStatus: 'Cancelado', total: '1120.00', image: 'https://picsum.photos/80?112', buyerAvatar: 'https://picsum.photos/32?312' },
];

export function SalesHistoryScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: SaleOrderHistoryItem }) => (
    <Pressable onPress={() => router.push({ pathname: '/profile/order-detail', params: { id: item.id, status: item.deliveryStatus } })}>
      <SaleOrderHistoryCard
        productName={item.productName}
        buyerName={item.buyerName}
        orderDate={item.orderDate}
        deliveryStatus={item.deliveryStatus}
        total={item.total}
        image={item.image}
        buyerAvatar={item.buyerAvatar}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content title="Mis ventas" color={colors.onPrimary} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <SuperiorFilter filters={SALE_FILTERS} />

      <Divider />

      <FlatList
        data={SALES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
      />
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
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
