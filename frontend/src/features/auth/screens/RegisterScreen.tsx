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

import { useRegister } from '../hooks';
import { PasswordInput, LoginHeader } from '../components';
import { AppTextInput, AppButton } from '@/shared/components';

interface RegisterScreenProps {
  onLogin?: () => void;
}

export function RegisterScreen({ onLogin }: RegisterScreenProps) {
  const { colors } = useTheme();
  const register = useRegister();

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

          <Controller
            control={register.control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Nombre"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ingresa tu nombre"
                autoCapitalize="words"
                errorMessage={register.errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={register.control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Apellido"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ingresa tu apellido"
                autoCapitalize="words"
                errorMessage={register.errors.lastName?.message}
              />
            )}
          />

          <Controller
            control={register.control}
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
                errorMessage={register.errors.email?.message}
              />
            )}
          />

          <Controller
            control={register.control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                show={register.showPassword}
                onToggle={register.togglePassword}
                errorMessage={register.errors.password?.message}
              />
            )}
          />

          <Text style={[styles.hint, { color: colors.secondary }]}>
            *Debe contener mínimo 8 caracteres, una mayúscula y un número.
          </Text>

          <Controller
            control={register.control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                label="Reingresa Contraseña"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                show={register.showConfirmPassword}
                onToggle={register.toggleConfirmPassword}
                errorMessage={register.errors.confirmPassword?.message}
              />
            )}
          />

          {register.serverError && (
            <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 12 }}>
              {register.serverError}
            </Text>
          )}

          <AppButton
            onPress={register.onSubmit}
            disabled={!register.isValid || register.isLoading}
            loading={register.isLoading}
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