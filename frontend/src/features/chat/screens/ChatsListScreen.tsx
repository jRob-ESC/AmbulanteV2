import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Appbar, Divider, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { UserAvatar } from '@/shared/components';

type ChatPreview = {
  id: string;
  vendorId: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
};

const MOCK_CHATS: ChatPreview[] = [
  {
    id: '1',
    vendorId: '1',
    name: 'Juan Pérez',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Perfecto, aquí te espero 😊',
    lastTime: '12:16',
    unread: 0,
  },
  {
    id: '2',
    vendorId: '2',
    name: 'María González',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    lastMessage: '¿A qué hora llegas hoy?',
    lastTime: '11:40',
    unread: 2,
  },
  {
    id: '3',
    vendorId: '3',
    name: 'Carlos Ruiz',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Sí, tengo tacos disponibles',
    lastTime: 'Ayer',
    unread: 0,
  },
  {
    id: '4',
    vendorId: '4',
    name: 'Ana Torres',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    lastMessage: 'Gracias por tu pedido 🙌',
    lastTime: 'Ayer',
    unread: 0,
  },
  {
    id: '5',
    vendorId: '5',
    name: 'Luis Mendoza',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'Hoy no salgo, disculpa',
    lastTime: 'Lun',
    unread: 0,
  },
];

export function ChatsListScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const renderItem = ({ item }: { item: ChatPreview }) => (
    <Pressable
      onPress={() => router.push(`/vendors/${item.vendorId}/chat` as any)}
      android_ripple={{ color: colors.surfaceVariant }}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: pressed ? colors.surfaceVariant : colors.surface },
      ]}
    >
      <UserAvatar
        userId={Number(item.vendorId)}
        avatarUrl={item.avatarUrl}
        size={52}
      />

      <View style={styles.textBlock}>
        <Text
          variant="titleSmall"
          style={[styles.name, { color: colors.onSurface }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          variant="bodySmall"
          style={[
            styles.lastMessage,
            { color: item.unread > 0 ? colors.onSurface : colors.onSurfaceVariant },
            item.unread > 0 && { fontWeight: '700' },
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>

      <View style={styles.metaBlock}>
        <Text
          variant="labelSmall"
          style={{ color: item.unread > 0 ? colors.primary : colors.onSurfaceVariant }}
        >
          {item.lastTime}
        </Text>
        {item.unread > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text variant="labelSmall" style={{ color: colors.onPrimary, fontSize: 11 }}>
              {item.unread}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title="Chats"
          color={colors.onPrimary}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginLeft: 80 }} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '700',
  },
  list: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontWeight: '600',
  },
  lastMessage: {
    flexShrink: 1,
  },
  metaBlock: {
    alignItems: 'flex-end',
    gap: 6,
    minWidth: 44,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
