import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Appbar, Divider, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SuperiorFilter, type FilterConfig } from '@/shared/components';
import { OrderHistoryCard } from '../components';

interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  vendor: string;
  orderDate: string;
  status: string;
  itemCount: string;
  total: string;
  image: string;
  vendorAvatar: string;
}

const ORDER_FILTERS: FilterConfig[] = [
  {
    key: 'fecha',
    title: 'Fecha',
    options: ['Cualquiera', 'Hoy', 'Esta semana', 'Este mes', 'Últimos 3 meses'],
    defaultValue: 'Cualquiera',
  },
  {
    key: 'status',
    title: 'Estado',
    options: ['Todos', 'Pendiente', 'En proceso', 'Entregado', 'Cancelado'],
    defaultValue: 'Todos',
  },
];

// Mock data
const PRODUCTS: OrderHistoryItem[] = [
  { id: '1', orderNumber: '1024', vendor: 'Juárez', orderDate: '12/01/2026', status: 'Entregado', itemCount: '5', total: '1580.00', image: 'https://picsum.photos/80?1', vendorAvatar: 'https://picsum.photos/32?201' },
  { id: '2', orderNumber: '1025', vendor: 'Juárez', orderDate: '13/01/2026', status: 'En proceso', itemCount: '4', total: '1320.00', image: 'https://picsum.photos/80?2', vendorAvatar: 'https://picsum.photos/32?202' },
  { id: '3', orderNumber: '1026', vendor: 'Juárez', orderDate: '14/01/2026', status: 'Pendiente', itemCount: '6', total: '2010.00', image: 'https://picsum.photos/80?3', vendorAvatar: 'https://picsum.photos/32?203' },
  { id: '4', orderNumber: '1027', vendor: 'Juárez', orderDate: '15/01/2026', status: 'Cancelado', itemCount: '3', total: '950.00', image: 'https://picsum.photos/80?4', vendorAvatar: 'https://picsum.photos/32?204' },
  { id: '5', orderNumber: '1028', vendor: 'Juárez', orderDate: '16/01/2026', status: 'Entregado', itemCount: '5', total: '1580.00', image: 'https://picsum.photos/80?5', vendorAvatar: 'https://picsum.photos/32?205' },
  { id: '6', orderNumber: '1029', vendor: 'Juárez', orderDate: '17/01/2026', status: 'En proceso', itemCount: '7', total: '2440.00', image: 'https://picsum.photos/80?6', vendorAvatar: 'https://picsum.photos/32?206' },
  { id: '7', orderNumber: '1030', vendor: 'Juárez', orderDate: '18/01/2026', status: 'Entregado', itemCount: '2', total: '740.00', image: 'https://picsum.photos/80?7', vendorAvatar: 'https://picsum.photos/32?207' },
  { id: '8', orderNumber: '1031', vendor: 'Juárez', orderDate: '19/01/2026', status: 'Pendiente', itemCount: '8', total: '2690.00', image: 'https://picsum.photos/80?8', vendorAvatar: 'https://picsum.photos/32?208' },
  { id: '9', orderNumber: '1032', vendor: 'Juárez', orderDate: '20/01/2026', status: 'Cancelado', itemCount: '4', total: '1280.00', image: 'https://picsum.photos/80?9', vendorAvatar: 'https://picsum.photos/32?209' },
  { id: '10', orderNumber: '1033', vendor: 'Juárez', orderDate: '21/01/2026', status: 'Entregado', itemCount: '5', total: '1580.00', image: 'https://picsum.photos/80?10', vendorAvatar: 'https://picsum.photos/32?210' },
  { id: '11', orderNumber: '1034', vendor: 'Juárez', orderDate: '22/01/2026', status: 'En proceso', itemCount: '6', total: '1870.00', image: 'https://picsum.photos/80?11', vendorAvatar: 'https://picsum.photos/32?211' },
  { id: '12', orderNumber: '1035', vendor: 'Juárez', orderDate: '23/01/2026', status: 'Entregado', itemCount: '5', total: '1580.00', image: 'https://picsum.photos/80?12', vendorAvatar: 'https://picsum.photos/32?212' },
];

export function OrderHistoryScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: OrderHistoryItem }) => (
    <Pressable onPress={() => router.push({ pathname: '/profile/order-detail', params: { id: item.id } })}>
      <OrderHistoryCard
        orderNumber={item.orderNumber}
        vendor={item.vendor}
        orderDate={item.orderDate}
        status={item.status}
        itemCount={item.itemCount}
        total={item.total}
        image={item.image}
        vendorAvatar={item.vendorAvatar}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content title="Mis compras" color={colors.onPrimary} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <SuperiorFilter filters={ORDER_FILTERS} />

      <Divider />

      {/* Products List */}
      <FlatList
        data={PRODUCTS}
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
