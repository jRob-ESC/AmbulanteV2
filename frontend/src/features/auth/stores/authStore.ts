import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';


interface AuthState {
    user: User | null;
    credentials: string | null;
    isAuthenticated: boolean;
    savedEmail: string | null;
    savedPassword: string | null;
    setAuth: (user: User, credentials: string) => void;
    clearAuth: () => void;
    setSavedCredentials: (email: string | null, password: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            credentials: null,
            isAuthenticated: false,
            savedEmail: null,
            savedPassword: null,
            setAuth: (user, credentials) => set({ user, credentials, isAuthenticated: true }),
            clearAuth: () => set({ user: null, credentials: null, isAuthenticated: false }),
            setSavedCredentials: (email, password) => set({ savedEmail: email, savedPassword: password }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);