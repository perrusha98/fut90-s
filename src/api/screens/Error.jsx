import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const ErrorScreen = ({onRetry, errorDetails, retryNumber}) => {
  console.log(retryNumber);
  const getMessage = () => {
    if (errorDetails) {
      if (errorDetails.code >= 500 && errorDetails.code < 600) {
        return `Hubo un problema con el servidor (código: ${errorDetails.code}). Por favor, inténtalo de nuevo más tarde.`;
      } else {
        return `No se pudieron cargar los datos. Por favor, verifica tu conexión a internet y vuelve a intentarlo.`;
      }
    } else {
      return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  };

  const getIcon = () => {
    if (errorDetails) {
      if (errorDetails.code >= 500 && errorDetails.code < 600) {
        return require('@assets/misc/error.png');
      } else {
        return require('@assets/misc/error.png');
      }
    } else {
      return require('@assets/misc/error.png');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#390000', '#000', '#390000']}
        locations={[0.25, 0.5, 0.8]}
        style={styles.background}
      />
      <View style={styles.content}>
        <Image source={getIcon()} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Error</Text>
        <Text style={styles.message}>{getMessage()}</Text>
        {errorDetails && (
          <View style={styles.errorDetails}>
            {errorDetails.code && (
              <Text style={styles.errorText}>Código: {errorDetails.code}</Text>
            )}
            <Text style={styles.errorText}>
              Detalles: {errorDetails.message}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Icon
            name="refresh"
            color="#000"
            size={25}
            style={{paddingHorizontal: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  lottie: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: '#e30000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e30000',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  errorDetails: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default ErrorScreen;
