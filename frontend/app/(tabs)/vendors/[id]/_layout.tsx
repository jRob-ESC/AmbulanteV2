import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function VendorLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.onPrimary,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="catalog" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}
