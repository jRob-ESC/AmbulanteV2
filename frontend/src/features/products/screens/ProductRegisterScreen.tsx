import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, useTheme, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ProductForm from '../components/ProductForm';
import type { ProductFormData } from '../components/ProductForm';

export function ProductRegisterScreen() {
    const router = useRouter();
    const theme = useTheme();

    const [formData, setFormData] = useState<ProductFormData>({
      name: '',
      price: '',
      stock: 0,
      category: '',
      description: '',
      additionalDetails: '',
      image: null,
    })

    const handleChange = (field: keyof ProductFormData, value: any) => {
      setFormData(prev => ({
        ...prev,  
        [field]: value
      }));
    };

    return (
        <View style={styles.container}>        
        <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title="Registro de producto" titleStyle={styles.headerTitle} />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ProductForm 
            data={formData}
            onChange={handleChange}
          />

          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={() => router.back()} 
              style={[styles.button, styles.exitButton]}
              labelStyle={{ color: '#8d2d24' }}
            >
              Cancelar
            </Button>
            
            <Button 
              mode="contained" 
              onPress={() => console.log('Guardado')} 
              style={[styles.button, styles.saveButton]}
            >
              Guardar
            </Button>
          </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 40, 
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    borderRadius: 8,
    paddingVertical: 4,
  },
  exitButton: {
    backgroundColor: '#fbe9e7',
    elevation: 0,
  },
  saveButton: {
    backgroundColor: '#d32f2f',
  },
});
