import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';

export function RememberCheckbox({
  checked,
  onToggle,
  colors,
}: any) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onToggle}
        color={colors.primary}
      />
      <Text style={styles.text}>Recordar credenciales</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  text: {
    fontSize: 14,
    marginLeft: 4,
  },
});