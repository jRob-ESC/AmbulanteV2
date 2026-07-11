import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ProductForm from '../components/ProductForm';
import type { ProductFormData } from '../components/ProductForm';

const EMPTY_FORM: ProductFormData = {
  name: '',
  price: '',
  stock: 0,
  category: '',
  description: '',
  additionalDetails: '',
  image: null,
};

const MOCK_PRODUCTS: Record<string, ProductFormData> = {
  '1': {
    name: 'Enfrijoladas con pollo',
    price: '250',
    stock: 5,
    category: 'Alimentos',
    description: 'Enfrijoladas rellenas de pollo deshebrado con crema y queso.',
    additionalDetails: 'Incluye salsa de frijol y guarnición de cebolla.',
    image: 'https://picsum.photos/400',
  },
  '2': {
    name: 'Tacos al pastor',
    price: '80',
    stock: 12,
    category: 'Alimentos',
    description: 'Orden de 5 tacos al pastor con piña y cilantro.',
    additionalDetails: 'Tortilla hecha a mano.',
    image: 'https://picsum.photos/401',
  },
  '3': {
    name: 'Agua de horchata',
    price: '35',
    stock: 20,
    category: 'Alimentos',
    description: 'Agua fresca de horchata natural.',
    additionalDetails: 'Vaso de 500 ml.',
    image: 'https://picsum.photos/402',
  },
};

const DEFAULT_MOCK: ProductFormData = {
  name: 'Enfrijoladas con pollo',
  price: '250',
  stock: 5,
  category: 'Alimentos',
  description: 'Producto de ejemplo con datos mock.',
  additionalDetails: 'Detalles adicionales de ejemplo.',
  image: 'https://picsum.photos/60',
};

function getInitialFormData(id?: string): ProductFormData {
  if (!id) return EMPTY_FORM;
  return MOCK_PRODUCTS[id] ?? DEFAULT_MOCK;
}

export function ProductFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ProductFormData>(() =>
    getInitialFormData(id)
  );

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      console.log('Actualizado', id, formData);
    } else {
      console.log('Guardado', formData);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title={isEditing ? 'Editar producto' : 'Nuevo producto'}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProductForm
          data={formData}
          onChange={handleChange}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => router.back()}
            style={[styles.button, styles.exitButton]}
            labelStyle={{ color: '#8d2d24' }}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            onPress={handleSave}
            style={[styles.button, styles.saveButton]}
          >
            Guardar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    borderRadius: 8,
    paddingVertical: 4,
  },
  exitButton: {
    backgroundColor: '#fbe9e7',
    elevation: 0,
  },
  saveButton: {
    backgroundColor: '#d32f2f',
  },
});
