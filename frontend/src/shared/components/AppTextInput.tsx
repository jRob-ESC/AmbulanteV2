import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';

interface AppTextInputProps extends React.ComponentProps<typeof TextInput> {
  errorMessage?: string;
  containerStyle?: React.ComponentProps<typeof View>['style'];
}

export function AppTextInput({
  errorMessage,
  containerStyle,
  style,
  ...props
}: AppTextInputProps) {
  const { colors } = useTheme();
  const hasError = !!errorMessage;

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        mode="outlined"
        dense
        style={[{ backgroundColor: colors.surface }, style]}
        outlineStyle={styles.outline}
        outlineColor={colors.outlineVariant}
        activeOutlineColor={colors.primary}
        error={hasError}
        {...props}
      />

      {hasError && (
        <HelperText type="error" style={styles.helper}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  outline: {
    borderRadius: 8,
  },
  helper: {
    marginTop: 2,
  },
});