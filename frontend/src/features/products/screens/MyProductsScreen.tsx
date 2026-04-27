import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Text, Divider, AnimatedFAB, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SuperiorFilter } from '@/shared/components';
import { ProductRow } from '../components';
import { useState } from 'react';

// Datos de ejemplo
const PRODUCTOS = [
  { id: '1', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '2', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '3', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '4', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '5', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '6', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '7', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '8', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '9', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '10', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '11', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
  { id: '12', nombre: 'Enfrijoladas con pollo', precio: '250', stock: '5', image: 'https://via.placeholder.com/60' },
];

export function MyProductsScreen() {
  const { colors } = useTheme();

  const router = useRouter();
  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const renderItem = ({ item }) => (
    <ProductRow id={item.id}  nombre={item.nombre} precio={item.precio} stock={item.stock} image={item.image}/>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Mis Productos" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {/* Filtros Superiores */}
      <SuperiorFilter/>

      <Divider />

      {/* Encabezado de Tabla */}
      <View style={styles.tableHeader}>
        <View style={styles.columnImagePlaceholder} />
        <Text style={[styles.headerLabel, styles.columnNombre]}>Nombre</Text>
        <Text style={[styles.headerLabel, styles.columnPrecio]}>Precio</Text>
        <Text style={[styles.headerLabel, styles.columnStock]}>Stock</Text>
      </View>

      {/* Lista de Productos */}
      <FlatList
        data={PRODUCTOS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      <AnimatedFAB 
        icon="plus"
        label="Crear producto"
        extended={isExtended}
        onPress={() => {router.push('/profile/products/register')}}
        animateFrom='right'
        iconMode='static'
        style={[styles.fab, {backgroundColor: colors.primary}]}
        color={colors.onPrimary}
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
    textAlign: 'center',
    marginRight: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'colors.textPrimary',
    textAlign: 'center',
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 108,
  },
  columnImagePlaceholder: {
    width: 70,
  },
  columnNombre: {
    flex: 2,
    paddingHorizontal: 10,
  },
  columnPrecio: {
    flex: 1,
    alignItems: 'center',
  },
  columnStock: {
    flex: 0.8,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 44,
    right: 16,
  },
});
