import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginRequest } from '../schemas';
import { login } from '../services';
import { useAuthStore } from '../stores';

export function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberCredentials, setRememberCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null)

  const { setAuth, setSavedCredentials, savedEmail, savedPassword } = useAuthStore();

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { 
      email: savedEmail ?? '',
      password: savedPassword ?? ''
    },
    mode: 'onChange',
  });

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleRemember = () => setRememberCredentials(prev => !prev);

const onSubmit = handleSubmit(async (data: LoginRequest) => {
    try {
        setIsLoading(true);
        const response = await login(data.email, data.password);
        setAuth(response, btoa(`${data.email}:${data.password}`));
        setSavedCredentials(
            rememberCredentials ? data.email : null,
            rememberCredentials ? data.password : null,
        );
    } catch (error: any) {
      if ([401, 404].includes(error.status)) {
        setServerError("El correo o la contrasena introducidos son incorrectos")
      } else {
        console.error('Error al iniciar sesión:', error);
      }
    } finally {
        setIsLoading(false);
    }
});

  return {
    control,
    onSubmit,
    errors,
    serverError,
    isValid,
    isLoading,
    showPassword,
    rememberCredentials,
    togglePassword,
    toggleRemember,
  };
}