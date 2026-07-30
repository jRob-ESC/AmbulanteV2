import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Icon, List, Menu, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { UserAvatar } from '@/shared/components';
import { ConfirmModal } from '@/features/products/components';
import { User } from '../../auth/types'

interface ProfileScreenProps {
  user: User | null;
  onLogout: () => void;
}

export function ProfileScreen({user, onLogout}: ProfileScreenProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [isVisibleAsConnected, setIsVisibleAsConnected] = useState(true);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);

  return (
    <>
      <ConfirmModal
        visible={deactivateModalVisible}
        title="¿Desactivar tu cuenta?"
        message="Estás a punto de desactivar tu cuenta. Tu perfil y tus productos dejarán de estar visibles hasta que vuelvas a activarla."
        dismissLabel="Cancelar"
        confirmLabel="Desactivar"
        onDismiss={() => setDeactivateModalVisible(false)}
        onConfirm={() => setDeactivateModalVisible(false)}
      />
      <ScrollView style={styles.container}>
    {user && (
      <View style={styles.header}>
        <Menu
          visible={statusMenuVisible}
          onDismiss={() => setStatusMenuVisible(false)}
          style={styles.statusMenu}
          contentStyle={{ backgroundColor: colors.surface }}
          anchor={
            <View>
              <UserAvatar
                userId={user.id}
                avatarUrl={user.imgUrl ?? undefined}
                size={80}
                isActive
                activeIndicatorSize={18}
                activeIndicatorColor={
                  isVisibleAsConnected ? undefined : colors.onSurfaceDisabled
                }
                onPress={() => setStatusMenuVisible(true)}
              />
              <View
                pointerEvents="none"
                style={[
                  styles.avatarAction,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.surface,
                  },
                ]}
              >
                <Icon source="chevron-down" size={14} color={colors.onPrimary} />
              </View>
            </View>
          }
        >
          <Menu.Item
            leadingIcon={
              isVisibleAsConnected ? 'account-off-outline' : 'account-check-outline'
            }
            title={
              isVisibleAsConnected
                ? 'Mostrarme como desconectado'
                : 'Mostrarme como conectado'
            }
            onPress={() => {
              setIsVisibleAsConnected((current) => !current);
              setStatusMenuVisible(false);
            }}
          />
        </Menu>
        <Text variant="titleMedium" style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
    )}

      <List.Item
        title="Editar perfil"
        left={props => <List.Icon {...props} icon="pencil-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => { router.push('/profile/edit-profile') }}
      />
      <Divider />
      <List.Item
        title="Mis productos"
        left={props => <List.Icon {...props} icon="clipboard-list-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {router.push("/profile/my-products")}}
      />
      <Divider />
      <List.Item  
        title="Mis compras"
        left={props => <List.Icon {...props} icon="shopping-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {router.push("/profile/order-history")}}
      />
      <Divider />
      <List.Item
        title="Historial de venta"
        left={props => <List.Icon {...props} icon="clock-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => { router.push('/profile/sales-history') }}
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
        title="Desactivar mi cuenta"
        titleStyle={{ color: colors.error }}
        left={props => <List.Icon {...props} icon="account-off-outline" color={colors.error} />}
        right={props => <List.Icon {...props} icon="chevron-right" color={colors.error} />}
        onPress={() => setDeactivateModalVisible(true)}
      />
      <Divider />
      <List.Item
        title="Salir de la cuenta"
        titleStyle={{ color: colors.error }}
        left={props => <List.Icon {...props} icon="logout" color={colors.error} />}
        onPress={onLogout}
      />
      </ScrollView>
    </>
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
  avatarAction: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusMenu: {
    marginLeft: 48,
  },
  name: {
    fontWeight: '700',
  }
});