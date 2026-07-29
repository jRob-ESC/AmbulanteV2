import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, useTheme, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ProfileForm, { ProfileFormData } from '../components/ProfileForm';

export function EditProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormData>({
    image: null,
    name: '',
    description: '',
    vendorType: '',
    usualLocation: '',
  });

  const handleChange = (field: keyof ProfileFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: dispatch save action / call API
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content
          title="Editar perfil"
          color={colors.onPrimary}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <ProfileForm data={formData} onChange={handleChange} />

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          contentStyle={styles.saveButtonContent}
        >
          Guardar cambios
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 0,
  },
  headerTitle: {
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  saveButtonContent: {
    paddingVertical: 6,
  },
});
