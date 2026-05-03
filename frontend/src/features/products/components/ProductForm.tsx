import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Menu } from 'react-native-paper';
import { StockInput } from '@/shared/components';
import { ProductImagePicker } from './ProductImagePicker';

export interface ProductFormData {
  name: string,
  price: string,
  stock: number,
  category: string,
  description: string,
  additionalDetails: string,
  image: string | null;
}

interface ProductFormProps {
  data: ProductFormData,
  onChange: (field: keyof ProductFormData, value: any) => void;
}

const CATEGORIAS = [
  'Alimentos', 'Ropa', 'Calzado', 'Accesorios',
  'Electrónicos', 'Recreativos', 'Otros',
];

export default function ProductForm({ data, onChange }: ProductFormProps){
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View>
            <ProductImagePicker 
              image={data.image}
              onChange={(img) => onChange('image', img)}
            />

            <TextInput
                label="Nombre"
                value={data.name}
                onChangeText={(text) => onChange('name', text)}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Precio"
                value={data.price}
                onChangeText={(text) => onChange('price', text)}
                mode="outlined"
                left={<TextInput.Affix text="$ " />}
                keyboardType="numeric"
                style={styles.input}
            />

            <View style={styles.row}>
              <View style={styles.stockWrapper}>
                <Text variant="labelMedium" style={styles.fieldLabel}>Stock</Text>
                <StockInput
                  value={data.stock}
                  onChange={(value) => onChange('stock', value)}
                  height={56}
                />
              </View>

            <View style={styles.categoriaWrapper}>
              <Text variant="labelMedium" style={styles.fieldLabel}>Categoría</Text>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                contentStyle={{backgroundColor: '#fff'}}
                anchor={
                  <TextInput
                    value={data.category}
                    mode="outlined"
                    placeholder="Seleccionar"
                    right={<TextInput.Icon icon="chevron-down" onPress={() => setMenuVisible(true)} />}
                    style={styles.categoriaInput}
                  />
                }
              >
                {CATEGORIAS.map((cat) => (
                  <Menu.Item
                    key={cat}
                    title={cat}
                    onPress={() => {
                      onChange('category', cat);
                      setMenuVisible(false);
                    }}
                  />
                ))}
              </Menu>
            </View>
          </View>

            <TextInput
                label="Descripción"
                value={data.description}
                onChangeText={(text) => onChange('description', text)}
                mode="outlined"
                placeholder="(opcional)"
                multiline={true}
                numberOfLines={4}
                style={styles.input}
            />

            <TextInput
                label="Detalles adicionales"
                value={data.additionalDetails}
                onChangeText={(text) => onChange('additionalDetails', text)}
                mode="outlined"
                placeholder="(opcional)"
                multiline={true}
                numberOfLines={4}
                style={styles.input}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 20,
    marginBottom: 16,
  },
  stockWrapper: {
    width: 140,
  },
  categoriaWrapper: {
    flex: 1,
  },
  fieldLabel: {
    marginBottom: 4,
    marginLeft: 4,
  },
  categoriaInput: {
    backgroundColor: '#fff',
  },
});