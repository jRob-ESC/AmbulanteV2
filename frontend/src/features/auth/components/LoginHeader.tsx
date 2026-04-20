import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export function LoginHeader({ colors }: any) {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('@/assets/images/lion-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>LEON AMBULANTE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 12,
  },
});