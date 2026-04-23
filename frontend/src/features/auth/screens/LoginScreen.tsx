import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useLogin } from '../hooks';
import { LoginHeader } from '../components';
import { PasswordInput } from '../components';
import { RememberCheckbox } from '../components';
import { LoginRequest } from '../schemas';
import { AppTextInput, AppButton } from '@/shared/components';

interface LoginScreenProps {
  onLogin?: (data: LoginRequest) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginScreen({
  onForgotPassword,
  onRegister,
}: LoginScreenProps) {
  const { colors } = useTheme();
  const login = useLogin();

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoid, {backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LoginHeader colors={colors} />

        <View style={styles.form}>
          
          <Controller 
            control={login.control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="E-mail"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ingresa tu e-mail institucional"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                errorMessage={login.errors.email?.message}
              />
            )}
          />

          <Controller
            control={login.control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                show={login.showPassword}
                onToggle={login.togglePassword}
                errorMessage={login.errors.password?.message}
              />
            )}
          />

          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={{ color: colors.primary }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <RememberCheckbox
            checked={login.rememberCredentials}
            onToggle={login.toggleRemember}
            colors={colors}
          />

          <AppButton
            onPress={login.onSubmit}
            disabled={!login.isValid || login.isLoading}
            style={styles.button}
          >
            Ingresar
          </AppButton>

          <View style={styles.loginRow}>
            <Text>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={onRegister}>
              <Text style={{ color: colors.primary }}>
                Registrate Aqui.
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: { 
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 28,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
  },
    loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 24,
  }
});