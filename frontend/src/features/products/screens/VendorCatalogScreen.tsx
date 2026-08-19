import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { ProductCard } from '../components/ProductCard';

const MOCK_PRODUCTS = [
  { id: 1,  name: 'Enfrijoladas con pollo',   price: 55.00, imageUrl: 'https://picsum.photos/200?p=1'  },
  { id: 2,  name: 'Tacos de canasta',          price: 15.00, imageUrl: 'https://picsum.photos/200?p=2'  },
  { id: 3,  name: 'Torta de milanesa',         price: 45.00, imageUrl: 'https://picsum.photos/200?p=3'  },
  { id: 4,  name: 'Agua de horchata',          price: 20.00, imageUrl: 'https://picsum.photos/200?p=4'  },
  { id: 5,  name: 'Quesadillas de bistec',     price: 35.00, imageUrl: 'https://picsum.photos/200?p=5'  },
  { id: 6,  name: 'Pozole rojo',               price: 80.00, imageUrl: 'https://picsum.photos/200?p=6'  },
  { id: 7,  name: 'Chilaquiles verdes',        price: 60.00, imageUrl: 'https://picsum.photos/200?p=7'  },
  { id: 8,  name: 'Sopes surtidos',            price: 40.00, imageUrl: 'https://picsum.photos/200?p=8'  },
  { id: 9,  name: 'Mole con pollo',            price: 90.00, imageUrl: 'https://picsum.photos/200?p=9'  },
  { id: 10, name: 'Gorditas de chicharrón',    price: 25.00, imageUrl: 'https://picsum.photos/200?p=10' },
  { id: 11, name: 'Tamales oaxaqueños',        price: 30.00, imageUrl: 'https://picsum.photos/200?p=11' },
  { id: 12, name: 'Enchiladas suizas',         price: 70.00, imageUrl: 'https://picsum.photos/200?p=12' },
];

type Props = {
  vendorId?: string;
};

export function VendorCatalogScreen({ vendorId: _vendorId }: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content
          title="Productos de Juan Pérez"
          color={colors.onPrimary}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <FlatList
        data={MOCK_PRODUCTS}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard product={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
  },
});
