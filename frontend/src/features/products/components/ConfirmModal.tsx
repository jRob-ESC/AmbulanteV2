import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  dismissLabel?: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirmar',
  dismissLabel = 'Cancelar',
  onDismiss,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.body}>
          {message}
        </Text>
        <View style={styles.actions}>
          <Button mode="outlined" style={styles.btn} textColor="#D6372D" onPress={onDismiss}>
            {dismissLabel}
          </Button>
          <Button mode="contained" style={styles.btn} buttonColor="#D6372D" onPress={onConfirm}>
            {confirmLabel}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 24,
    gap: 12,
  },
  title: {
    fontWeight: '700',
    color: '#2d2d2d',
  },
  body: {
    color: '#6d6d6d',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    borderRadius: 8,
    borderColor: '#D6372D',
  },
});
