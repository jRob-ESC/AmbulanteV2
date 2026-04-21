import { TextInput, useTheme } from 'react-native-paper';
import { AppTextInput } from '@/shared/components';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  show: boolean;
  onToggle: () => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}

export function PasswordInput({
  value,
  onChange,
  onBlur,
  show,
  onToggle,
  label = 'Contraseña',
  placeholder = 'Ingresa tu contraseña',
  errorMessage
}: PasswordInputProps) {
  const { colors } = useTheme();

  return (
    <AppTextInput
      label={label}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      secureTextEntry={!show}
      errorMessage={errorMessage}
      autoCapitalize="none"
      autoComplete="password"
      right={
        <TextInput.Icon
          icon={show ? 'eye-off' : 'eye'}
          onPress={onToggle}
          color={colors.secondary}
        />
      }
    />
  );
}