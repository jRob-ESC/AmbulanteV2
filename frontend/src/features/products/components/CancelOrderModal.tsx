import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

interface CancelOrderModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

export function CancelOrderModal({ visible, onDismiss, onConfirm }: CancelOrderModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text variant="titleMedium" style={styles.modalTitle}>
          ¿Cancelar pedido?
        </Text>
        <Text variant="bodyMedium" style={styles.modalBody}>
          Esta acción no se puede deshacer. ¿Deseas cancelar este pedido?
        </Text>
        <View style={styles.modalActions}>
          <Button mode="outlined" style={styles.modalBtn} textColor="#D6372D" onPress={onDismiss}>
            No, mantener
          </Button>
          <Button mode="contained" style={styles.modalBtn} buttonColor="#D6372D" onPress={onConfirm}>
            Sí, cancelar
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
  modalTitle: {
    fontWeight: '700',
    color: '#2d2d2d',
  },
  modalBody: {
    color: '#6d6d6d',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  modalBtn: {
    borderRadius: 8,
    borderColor: '#D6372D',
  },
});
