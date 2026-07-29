import { useState } from 'react';
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
import { AppTextInput } from '@/shared/components';
import { ProfileImagePicker } from './ProfileImagePicker';

export interface ProfileFormData {
  image: string | null;
  name: string;
  description: string;
  vendorType: string;
  usualLocation: string;
}

interface ProfileFormProps {
  data: ProfileFormData;
  onChange: (field: keyof ProfileFormData, value: any) => void;
}

export const VENDOR_TYPES = ['Ambulante', 'Estático'];

export const USUAL_LOCATIONS = Array.from({ length: 26 }, (_, i) =>
  `Edificio ${String.fromCharCode(65 + i)}`
);

type DropdownField = 'vendorType' | 'usualLocation';

export default function ProfileForm({ data, onChange }: ProfileFormProps) {
  const { colors } = useTheme();
  const [activeSheet, setActiveSheet] = useState<DropdownField | null>(null);

  const openSheet = (field: DropdownField) => setActiveSheet(field);
  const closeSheet = () => setActiveSheet(null);

  const sheetConfig: Record<DropdownField, { label: string; options: string[] }> = {
    vendorType: { label: 'Tipo de vendedor', options: VENDOR_TYPES },
    usualLocation: { label: 'Ubicación habitual', options: USUAL_LOCATIONS },
  };

  return (
    <View style={styles.form}>
      <ProfileImagePicker
        image={data.image}
        onChange={(img) => onChange('image', img)}
      />

      <AppTextInput
        label="Nombre"
        value={data.name}
        onChangeText={(text) => onChange('name', text)}
        containerStyle={styles.inputNoMargin}
      />

      <AppTextInput
        label="Descripción"
        value={data.description}
        onChangeText={(text) => onChange('description', text)}
        placeholder="(opcional)"
        multiline
        numberOfLines={4}
        containerStyle={styles.inputNoMargin}
      />

      {(['vendorType', 'usualLocation'] as DropdownField[]).map((field) => {
        const config = sheetConfig[field];
        const value = data[field];
        return (
          <TouchableOpacity
            key={field}
            activeOpacity={0.7}
            onPress={() => openSheet(field)}
            style={[
              styles.selector,
              { borderColor: colors.outlineVariant, backgroundColor: colors.surface },
            ]}
          >
            <View style={styles.selectorRow}>
              <Text
                style={[
                  styles.selectorText,
                  { color: value ? colors.onSurface : colors.onSurfaceVariant },
                ]}
                numberOfLines={1}
              >
                {value || config.label}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={colors.onSurfaceVariant} />
            </View>
          </TouchableOpacity>
        );
      })}

      {(['vendorType', 'usualLocation'] as DropdownField[]).map((field) => {
        const config = sheetConfig[field];
        return (
          <Modal
            key={field}
            visible={activeSheet === field}
            transparent
            animationType="slide"
            onRequestClose={closeSheet}
          >
            <TouchableWithoutFeedback onPress={closeSheet}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
              <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
              <Text variant="titleSmall" style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                {config.label}
              </Text>
              <ScrollView bounces={false}>
                {config.options.map((option) => {
                  const isSelected = option === data[field];
                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        onChange(field, option);
                        closeSheet();
                      }}
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
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  inputNoMargin: {
    marginBottom: 0,
  },
  selector: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  selectorRow: {
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
});
