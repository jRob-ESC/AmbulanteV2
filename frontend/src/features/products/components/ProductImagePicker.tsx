import { View, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { IconButton, Text } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

interface ProductImagePickerProps {
  image: string | null,
  onChange: (img: string | null) => void;
}

export function ProductImagePicker({ image, onChange }: ProductImagePickerProps) {
  const pickImage = async () => {
    // Ask for permission to access image gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permiso requerido',
        'Se necesita acceso a la galeria para seleccionar una imagen'
      );
      return;
    }

    // If granted, access the gallery and allows user to select an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [1, 1],
      quality: 0.7,
    });

    // Process the image
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onChange(uri);
    }
  };

  return (            
    <View style={styles.imageContainer}>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode='cover'
            />
          ) : (
            <IconButton icon="upload" size={30} iconColor="#8d2d24" />
          )}
      </TouchableOpacity>
      <Text style={styles.imageLabel}>
        {image ? "Cambiar imagen" : "Imagen del producto"} 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c07e78',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  imageLabel: {
    fontSize: 12,
    color: '#666',
  },
})