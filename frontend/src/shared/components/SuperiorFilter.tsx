import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CATEGORIAS = ['Todas', 'Alimentos', 'Ropa', 'Calzado', 'Accesorios', 'Electrónicos', 'Recreativos', 'Otros'];
const STOCK_OPTIONS = ['Cualquiera', 'Con stock', 'Sin stock', 'Poco stock (< 5)'];

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function FilterChip({ label, active, onPress }: FilterChipProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        active
          ? { backgroundColor: colors.primary, borderColor: colors.primary }
          : { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text
        style={[styles.chipLabel, { color: active ? colors.onPrimary : colors.textSecondary }]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={16}
        color={active ? colors.onPrimary : colors.textSecondary}
        style={{ marginLeft: 2 }}
      />
    </TouchableOpacity>
  );
}

type OptionSheetProps = {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

function OptionSheet({ visible, title, options, selected, onSelect, onClose }: OptionSheetProps) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
        <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
        <Text variant="titleSmall" style={[styles.sheetTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>

        <ScrollView bounces={false}>
          {options.map((option) => {
            const isSelected = option === selected;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => { onSelect(option); onClose(); }}
                activeOpacity={0.6}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border },
                  isSelected && { backgroundColor: `${colors.primary}12` },
                ]}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    { color: isSelected ? colors.primary : colors.textPrimary },
                  ]}
                >
                  {option}
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
  );
}

export function SuperiorFilter() {
  const [categoria, setCategoria] = useState('Todas');
  const [stock, setStock] = useState('Cualquiera');
  const [openSheet, setOpenSheet] = useState<'categoria' | 'stock' | null>(null);

  return (
    <View style={styles.container}>
      <FilterChip
        label={categoria}
        active={categoria !== 'Todas'}
        onPress={() => setOpenSheet('categoria')}
      />
      <FilterChip
        label={stock}
        active={stock !== 'Cualquiera'}
        onPress={() => setOpenSheet('stock')}
      />

      <OptionSheet
        visible={openSheet === 'categoria'}
        title="Categoría"
        options={CATEGORIAS}
        selected={categoria}
        onSelect={setCategoria}
        onClose={() => setOpenSheet(null)}
      />
      <OptionSheet
        visible={openSheet === 'stock'}
        title="Cantidad de stock"
        options={STOCK_OPTIONS}
        selected={stock}
        onSelect={setStock}
        onClose={() => setOpenSheet(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: 160,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '500',
    flexShrink: 1,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
});