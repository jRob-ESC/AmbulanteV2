import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { useLogin } from '../hooks';
import { LoginHeader } from '../components';
import { PasswordInput } from '../components';
import { RememberCheckbox } from '../components';
import { LoginRequest } from '../types/auth';
import { AppTextInput, AppButton } from '@/shared/components';

interface LoginScreenProps {
  onLogin?: (data: LoginRequest) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginScreen({
  onLogin,
  onForgotPassword,
  onRegister,
}: LoginScreenProps) {
  const { colors } = useTheme();
  const login = useLogin();

  const handleLogin = () => {
    if (!login.canSubmit) {
      console.warn('Por favor, completa todos los campos.');
      return;
    }

    onLogin?.(login.buildRequest());
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LoginHeader colors={colors} />

        <View style={styles.form}>
          <AppTextInput
            label="E-mail"
            value={login.email}
            onChangeText={login.setEmail}
            placeholder="Ingresa tu e-mail institucional"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <PasswordInput
            value={login.password}
            onChange={login.setPassword}
            show={login.showPassword}
            onToggle={login.togglePassword}
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
            onPress={handleLogin}
            disabled={!login.canSubmit}
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
  keyboardAvoid: { flex: 1 },
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