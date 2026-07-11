import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Divider, useTheme, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { UserAvatar } from '@/shared/components';
import { User } from '../../auth/types'

interface ProfileScreenProps {
  user: User | null;
  onLogout: () => void;
}

export function ProfileScreen({user, onLogout}: ProfileScreenProps) {
  const { colors } = useTheme();

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
    {user && (
      <View style={styles.header}>
        <UserAvatar
          userId={user.id}
          avatarUrl={user.imgUrl ?? undefined}
          size={80}
        />
        <Text variant="titleMedium" style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
    )}

      <List.Item
        title="Editar perfil"
        left={props => <List.Icon {...props} icon="pencil-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Opciones"
        left={props => <List.Icon {...props} icon="cog-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Mis productos"
        left={props => <List.Icon {...props} icon="shopping-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {router.push("/profile/my-products")}}
      />
      <Divider />
      <List.Item  
        title="Mis ordenes de compra"
        left={props => <List.Icon {...props} icon="clipboard-list-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Historial de venta"
        left={props => <List.Icon {...props} icon="clock-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Preferencias"
        left={props => <List.Icon {...props} icon="tune" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Acerca de"
        left={props => <List.Icon {...props} icon="information-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Salir de la cuenta"
        titleStyle={{ color: colors.error }}
        left={props => <List.Icon {...props} icon="logout" color={colors.error} />}
        onPress={onLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
  alignItems: 'center',
  paddingVertical: 24,
  gap: 8,
  },
  name: {
    fontWeight: '700',
  }
});