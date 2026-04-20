import { useState } from 'react';
import { LoginRequest } from '../types/auth';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberCredentials, setRememberCredentials] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleRemember = () => setRememberCredentials(prev => !prev);

  const canSubmit = email.trim() !== '' && password.trim() !== '';

  const buildRequest = (): LoginRequest => ({
    email,
    password,
  });

  return {
    email,
    password,
    showPassword,
    rememberCredentials,
    setEmail,
    setPassword,
    togglePassword,
    toggleRemember,
    canSubmit,
    buildRequest,
  };
}