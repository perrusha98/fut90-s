import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

const LoadingOverlay = ({isLoading}) => {
  if (!isLoading) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="75" color="#fd9f00" />
      <Text style={{fontSize: 20}}> Cargando anuncio.</Text>
      <Text style={{fontSize: 14}}>
        Si no encontramos uno, accederás directamente.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 10,
  },
});

export default LoadingOverlay;
