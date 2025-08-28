import React from 'react';
import {Text, StyleSheet, ActivityIndicator, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomMessage = ({icon, message, loading, textColor}) => (
  <View style={styles.container}>
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={textColor || '#fff'} />
        <Text style={[styles.loadingMessage, {color: textColor}]}> Cargando anuncio...</Text>
      </View>
    ) : (
      <Text style={[styles.message, {color: textColor}]}>
        <Icon name={icon} size={20} /> {message}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row', // Alinear en fila
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 16,
    marginLeft: 10, // Espacio entre el indicador y el mensaje
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default CustomMessage;
