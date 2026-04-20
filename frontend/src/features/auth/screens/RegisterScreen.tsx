import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { useRegister } from '../hooks';
import { PasswordInput, LoginHeader } from '../components';
import { RegisterRequest } from '../types';
import { AppTextInput, AppButton } from '@/shared/components';

interface RegisterScreenProps {
  onRegister?: (data: RegisterRequest) => void;
  onLogin?: () => void;
}

export function RegisterScreen({
  onRegister,
  onLogin,
}: RegisterScreenProps) {
  const { colors } = useTheme();
  const register = useRegister();

  const handleRegister = () => {
    if (!register.canSubmit) {
      console.warn('Completa todos los campos');
      return;
    }

    onRegister?.(register.buildRequest());
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: colors.background },
        ]}
      >
        <LoginHeader colors={colors} />

        <Text style={styles.title}>
          Únete a la comunidad de compra-venta de CUCEI
        </Text>

        <View style={styles.form}>
          <AppTextInput
            label="Nombre"
            value={register.firstName}
            onChangeText={register.setFirstName}
            autoCapitalize="words"
          />

          <AppTextInput
            label="Apellido"
            value={register.lastName}
            onChangeText={register.setLastName}
            autoCapitalize="words"
          />

          <AppTextInput
            label="E-mail"
            value={register.email}
            onChangeText={register.setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PasswordInput
            value={register.password}
            onChange={register.setPassword}
            show={register.showPassword}
            onToggle={register.togglePassword}
          />

          <Text style={[styles.hint, { color: colors.secondary }]}>
            *Debe contener mínimo 8 caracteres, letras, números y símbolo.
          </Text>

          <PasswordInput
            label="Reingresa Contraseña"
            value={register.confirmPassword}
            onChange={register.setConfirmPassword}
            show={register.showConfirmPassword}
            onToggle={register.toggleConfirmPassword}
          />

          <AppButton
            mode="contained"
            onPress={handleRegister}
            disabled={!register.canSubmit}
            style={styles.button}
          >
            Regístrate
          </AppButton>

          <View style={styles.loginRow}>
            <Text>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={onLogin}>
              <Text style={{ color: colors.primary }}>
                Inicia sesión.
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
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },

  form: {
    width: '100%',
  },

  input: {
    marginBottom: 12,
  },

  hint: {
    fontSize: 11,
    marginTop: -6,
    marginBottom: 12,
    paddingHorizontal: 4,
    lineHeight: 16,
  },

  button: {
    marginTop: 8,
    marginBottom: 24,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});