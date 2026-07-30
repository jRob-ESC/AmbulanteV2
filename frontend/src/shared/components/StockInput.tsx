import { useState } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { IconButton, Text, TextInput, useTheme } from 'react-native-paper';

type StockInputProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  style?: ViewStyle;
  height?: number;
  step?: number;
  compact?: boolean;
};

export function StockInput({
  value,
  onChange,
  style,
  height,
  step = 5,
  compact = false,
}: StockInputProps) {
  const theme = useTheme();
  const [rawText, setRawText] = useState(String(value));
  const [focused, setFocused] = useState(false);

  const handleAdjust = (delta: number) => {
    const current = parseInt(rawText, 10);
    const base = isNaN(current) ? 0 : current;
    const next = Math.max(0, base + delta);
    setRawText(String(next));
    onChange(next);
  };

  const handleChangeText = (text: string) => {
    setRawText(text.replace(/[^0-9]/g, ''));
  };

  const handleBlur = () => {
    setFocused(false);
    const parsed = parseInt(rawText, 10);
    const next = Math.max(0, isNaN(parsed) ? 0 : parsed);
    setRawText(String(next));
    onChange(next);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[
        styles.row,
        height ? { height }: undefined,
        {
          borderColor: focused ? theme.colors.primary : theme.colors.outline,
          borderRadius: theme.roundness * 2,
        },
      ]}>
        <IconButton
          icon="minus"
          size={compact ? 16 : 20}
          disabled={value <= 0}
          onPress={() => handleAdjust(-step)}
          style={[styles.btn, compact && styles.compactBtn]}
        />

        {compact ? (
          <View style={styles.compactValue}>
            <Text variant="bodyMedium" style={styles.compactValueText}>
              {rawText}
            </Text>
          </View>
        ) : (
          <TextInput
            value={rawText}
            onChangeText={handleChangeText}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            keyboardType="number-pad"
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            style={styles.input}
            contentStyle={styles.inputContent}
            dense
          />
        )}

        <IconButton
          icon="plus"
          size={compact ? 16 : 20}
          onPress={() => handleAdjust(step)}
          style={[styles.btn, compact && styles.compactBtn]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 4,
  },
  label: { marginBottom: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  btn: { margin: 0 },
  compactBtn: {
    width: 30,
    height: 30,
  },
  input: {
    width: 72,
    backgroundColor: 'transparent',
  },
  compactValue: {
    width: 36,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContent: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  compactValueText: {
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
  },
});