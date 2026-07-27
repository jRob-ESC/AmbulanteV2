import { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { TextInput, Text, Switch, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  isActive: boolean;
}

interface ProductFormProps {
  data: ProductFormData,
  onChange: (field: keyof ProductFormData, value: any) => void;
}

export const CATEGORIAS = [
  'Alimentos', 'Ropa', 'Calzado', 'Accesorios',
  'Electrónicos', 'Recreativos', 'Otros',
];

export default function ProductForm({ data, onChange }: ProductFormProps){
    const { colors } = useTheme();
    const [sheetVisible, setSheetVisible] = useState(false);

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
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSheetVisible(true)}
                style={[
                  styles.selector,
                  { borderColor: colors.outline, backgroundColor: colors.surface },
                ]}
              >
                <Text
                  style={[
                    styles.selectorText,
                    { color: data.category ? colors.textPrimary : colors.textSecondary },
                  ]}
                  numberOfLines={1}
                >
                  {data.category || 'Seleccionar'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <Modal visible={sheetVisible} transparent animationType="slide" onRequestClose={() => setSheetVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setSheetVisible(false)}>
                  <View style={styles.backdrop} />
                </TouchableWithoutFeedback>
                <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
                  <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
                  <Text variant="titleSmall" style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                    Categoría
                  </Text>
                  <ScrollView bounces={false}>
                    {CATEGORIAS.map((cat) => {
                      const isSelected = cat === data.category;
                      return (
                        <TouchableOpacity
                          key={cat}
                          onPress={() => { onChange('category', cat); setSheetVisible(false); }}
                          activeOpacity={0.6}
                          style={[
                            styles.option,
                            { borderBottomColor: colors.border },
                            isSelected && { backgroundColor: `${colors.primary}12` },
                          ]}
                        >
                          <Text style={[styles.optionLabel, { color: isSelected ? colors.primary : colors.textPrimary }]}>
                            {cat}
                          </Text>
                          {isSelected && (
                            <MaterialCommunityIcons name="check" size={18} color={colors.primary} />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </Modal>
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

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChange('isActive', !data.isActive)}
              style={[styles.switchRow, { borderColor: colors.outline, backgroundColor: colors.surface }]}
            >
              <Text variant="bodyLarge" style={{ color: colors.textPrimary }}>Producto activo</Text>
              <Switch
                value={data.isActive}
                onValueChange={(val) => onChange('isActive', val)}
                color={colors.primary}
              />
            </TouchableOpacity>
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
  selector: {
    height: 56,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 16,
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    paddingTop: 12,
    elevation: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    paddingHorizontal: 20,
    marginBottom: 8,
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionLabel: {
    fontSize: 15,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
});