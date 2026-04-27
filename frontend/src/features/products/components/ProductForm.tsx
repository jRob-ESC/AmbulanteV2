import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Menu } from 'react-native-paper';
import { StockInput } from '@/shared/components';

const CATEGORIAS = [
  'Alimentos', 'Ropa', 'Calzado', 'Accesorios',
  'Electrónicos', 'Recreativos', 'Otros',
];

export default function ProductForm(){
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [detalles, setDetalles] = useState('');
    const [inputHeight, setInputHeight] = useState(56);

    return (
        <View>
            <TextInput
                label="Nombre"
                value={nombre}
                onChangeText={setNombre}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Precio"
                value={precio}
                onChangeText={setPrecio}
                mode="outlined"
                left={<TextInput.Affix text="$ " />}
                keyboardType="numeric"
                style={styles.input}
            />

            <View style={styles.row}>
              <View style={styles.stockWrapper}>
                <Text variant="labelMedium" style={styles.fieldLabel}>Stock</Text>
                <StockInput
                  value={stock}
                  onChange={setStock}
                  height={inputHeight}
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
                    value={categoria}
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
                    setCategoria(cat);
                    setMenuVisible(false);
                    }}
                  />
                ))}
              </Menu>
            </View>
          </View>

            <TextInput
                label="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                mode="outlined"
                placeholder="(opcional)"
                multiline
                numberOfLines={4}
                style={styles.input}
            />

            <TextInput
                label="Detalles adicionales"
                value={detalles}
                onChangeText={setDetalles}
                mode="outlined"
                placeholder="(opcional)"
                multiline
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