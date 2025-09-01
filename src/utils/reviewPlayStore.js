import React, { useEffect } from 'react';
import InAppReview from 'react-native-in-app-review';

// Funciones para mostrar logs solo en modo desarrollo
const devLog = (message, data) => {
  if (__DEV__) {
    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
};

const devError = (message, error) => {
  if (__DEV__) {
    if (error) {
      console.error(message, error);
    } else {
      console.error(message);
    }
  }
};

const ReviewInApp = () => {

  useEffect(() => {
    // Solicitar una revisión en la tienda después de que la aplicación haya estado en uso durante un tiempo
    const requestReview = async () => {
      try {
        const didRequest = await InAppReview.RequestInAppReview();
        devLog('InAppReview requested: ', didRequest);
      } catch (error) {
        devError('Error requesting InAppReview: ', error);
      }
    };

    // Llamar a la función para solicitar la revisión después de un tiempo determinado (por ejemplo, 5 minutos)
    const timeout = setTimeout(() => {
      requestReview();
    }, 180000); // 3 minutos = 180,000 milisegundos

    // Limpiar el temporizador cuando se desmonta el componente
    return () => clearTimeout(timeout); 
  }, []);

  return null; // No se renderiza ningún componente en la pantalla
};

export default ReviewInApp;
