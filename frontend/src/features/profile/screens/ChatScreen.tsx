import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Appbar, IconButton, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { UserAvatar } from '@/shared/components';
import { AppTextInput } from '@/shared/components';

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
};

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: '¡Hola! ¿Sigues vendiendo hoy?', fromMe: false, time: '10:12' },
  { id: '2', text: 'Sí, estoy en la esquina de siempre hasta las 3 pm 🙌', fromMe: true, time: '10:13' },
  { id: '3', text: '¿Tienes enfrijoladas disponibles?', fromMe: false, time: '10:14' },
  { id: '4', text: 'Sí, me quedan 5 porciones. ¿Te aparto una?', fromMe: true, time: '10:15' },
  { id: '5', text: 'Sí por favor, voy en unos 20 minutos', fromMe: false, time: '10:15' },
  { id: '6', text: 'Perfecto, aquí te espero 😊', fromMe: true, time: '10:16' },
];

type Props = {
  vendorId?: string;
  vendorName?: string;
  vendorAvatarUrl?: string;
};

export function ChatScreen({
  vendorId,
  vendorName = 'Juan Pérez',
  vendorAvatarUrl = 'https://i.pravatar.cc/150?img=12',
}: Props) {
  const { colors } = useTheme();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');

  const sendMessage = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text: trimmed, fromMe: true, time },
    ]);
    setInputText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [inputText]);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => {
      const isMe = item.fromMe;
      return (
        <View
          style={[
            styles.messageRow,
            isMe ? styles.messageRowMe : styles.messageRowOther,
          ]}
        >
          {!isMe && (
            <UserAvatar
              userId={Number(vendorId ?? 0)}
              avatarUrl={vendorAvatarUrl}
              size={32}
            />
          )}
          <View
            style={[
              styles.bubble,
              isMe
                ? [styles.bubbleMe, { backgroundColor: colors.primary }]
                : [styles.bubbleOther, { backgroundColor: '#E5E5E5' }],
            ]}
          >
            <Text
              variant="bodyMedium"
              style={{ color: isMe ? colors.onPrimary : '#1A1A1A' }}
            >
              {item.text}
            </Text>
            <Text
              variant="labelSmall"
              style={[
                styles.timeLabel,
                { color: isMe ? colors.onPrimary : '#1A1A1A', opacity: 0.7 },
              ]}
            >
              {item.time}
            </Text>
          </View>
        </View>
      );
    },
    [colors, vendorAvatarUrl, vendorId],
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <UserAvatar
          userId={Number(vendorId ?? 0)}
          avatarUrl={vendorAvatarUrl}
          size={36}
          isActive
          activeIndicatorSize={10}
        />
        <View style={styles.headerInfo}>
          <Text
            variant="titleMedium"
            style={{ color: colors.onPrimary, fontWeight: '700' }}
            numberOfLines={1}
          >
            {vendorName}
          </Text>
          <Text variant="labelSmall" style={{ color: colors.onPrimary, opacity: 0.8 }}>
            En línea
          </Text>
        </View>
      </Appbar.Header>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[
          styles.inputBar,
          { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant },
        ]}
      >
          <AppTextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe un mensaje..."
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            contentStyle={styles.textInputContent}
            multiline
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
        <IconButton
          icon="send"
          size={24}
          iconColor={inputText.trim() ? colors.primary : colors.onSurfaceVariant}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  messageList: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 2,
  },
  bubbleMe: {
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    borderBottomLeftRadius: 4,
  },
  timeLabel: {
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopWidth: 1,
  },
  textInputContainer: {
    flex: 1,
    marginBottom: 0,
  },
  textInput: {
    maxHeight: 120,
  },
  textInputContent: {
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
