import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterRequest } from '../schemas';
import { register, login } from '../services';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../stores';

export function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { setAuth } = useAuthStore();

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const onSubmit = handleSubmit(async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setServerError(null);
      await register(data.firstName, data.lastName, data.email, data.password);
      const response = await login(data.email, data.password);
      setAuth(response, btoa(`${data.email}:${data.password}`));
    } catch(error: any) {
      if (error.status === 409){
        setServerError('El email ingresado ya esta registrado');
      } else {
        setServerError('Ocurrio un error inesperado, intenta de nuevo');
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
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
  };
}