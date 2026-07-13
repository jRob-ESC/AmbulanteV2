import React, { ReactNode } from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface BaseListCardProps {
  image: string;
  children: ReactNode;
  rightAdornment?: ReactNode;
}

export function BaseListCard({ image, children, rightAdornment }: BaseListCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>{children}</View>

      {rightAdornment ? <View style={styles.rightAdornment}>{rightAdornment}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    position: 'relative',
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  rightAdornment: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
