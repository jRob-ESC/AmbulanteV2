import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Appbar, Divider, AnimatedFAB, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SuperiorFilter } from '@/shared/components';
import { VendorProductCard } from '../components';
import { useState } from 'react';

interface VendorProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  isActive: boolean;
  image: string;
}

// Mock Data
const PRODUCTS: VendorProductItem[] = [
  { id: '1', name: 'Enfrijoladas con pollo', category: 'Antojitos', price: '250', stock: '5', isActive: true, image: 'https://picsum.photos/80?1' },
  { id: '2', name: 'Quesadillas de bistec', category: 'Antojitos', price: '190', stock: '3', isActive: true, image: 'https://picsum.photos/80?2' },
  { id: '3', name: 'Tacos dorados', category: 'Antojitos', price: '120', stock: '8', isActive: false, image: 'https://picsum.photos/80?3' },
  { id: '4', name: 'Pozole rojo', category: 'Caldos', price: '180', stock: '2', isActive: true, image: 'https://picsum.photos/80?4' },
  { id: '5', name: 'Chilaquiles verdes', category: 'Desayunos', price: '145', stock: '6', isActive: true, image: 'https://picsum.photos/80?5' },
  { id: '6', name: 'Sopes surtidos', category: 'Antojitos', price: '160', stock: '4', isActive: false, image: 'https://picsum.photos/80?6' },
  { id: '7', name: 'Mole con pollo', category: 'Comida corrida', price: '220', stock: '1', isActive: true, image: 'https://picsum.photos/80?7' },
  { id: '8', name: 'Gorditas de chicharron', category: 'Antojitos', price: '95', stock: '10', isActive: true, image: 'https://picsum.photos/80?8' },
  { id: '9', name: 'Tamales oaxaquenos', category: 'Desayunos', price: '85', stock: '7', isActive: false, image: 'https://picsum.photos/80?9' },
  { id: '10', name: 'Torta cubana', category: 'Cena', price: '130', stock: '5', isActive: true, image: 'https://picsum.photos/80?10' },
  { id: '11', name: 'Enchiladas suizas', category: 'Comida corrida', price: '210', stock: '3', isActive: true, image: 'https://picsum.photos/80?11' },
  { id: '12', name: 'Flautas de papa', category: 'Antojitos', price: '110', stock: '9', isActive: true, image: 'https://picsum.photos/80?12' },
];

export function VendorProductsScreen() {
  const { colors } = useTheme();

  const router = useRouter();
  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }: { nativeEvent: { contentOffset: { y: number } } }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const renderItem = ({ item }: { item: VendorProductItem }) => (
    <Pressable onPress={() => router.push(`/profile/products/${item.id}`)}>
      <VendorProductCard
        name={item.name}
        category={item.category}
        price={item.price}
        stock={item.stock}
        isActive={item.isActive}
        image={item.image}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content title="Mis Productos" color={colors.onPrimary} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <SuperiorFilter/>

      <Divider />

      {/* Products List */}
      <FlatList
        data={PRODUCTS}
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
    color: '#FFFFFF',
    textAlign: 'center',
    marginRight: 40,
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 108,
  },
  fab: {
    position: 'absolute',
    bottom: 8,
    right: 16,
  },
});
