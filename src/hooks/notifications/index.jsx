import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Alert, Linking, AppState } from 'react-native';

import messaging from '@react-native-firebase/messaging';

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

// Función para mostrar logs solo en modo desarrollo
const devLog = (message, data) => {
  if (__DEV__) {
    if (data) {
      // console.log(message, data);
    } else {
      // console.log(message);
    }
  }
};

const FCMListener = () => {
  
  const requestUserPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Permiso de Notificaciones',
          message:
            'Esta aplicación desea enviar notificaciones. ¿Desea permitirlo?',
          buttonNeutral: 'CERRAR',
          buttonPositive: 'ACTIVAR NOTIFICACIONES',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          devLog('Authorization status', authStatus);
        }
      } else {
        devLog('Permiso denegado para notificaciones');
      }
    } catch (err) {
      if (__DEV__) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestUserPermission();

    messaging()
      .getToken()
      .then((token) => {
        devLog(token);
      })
      .catch((error) => {
        devLog('Error al obtener el token:', error);
      });

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          devLog(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      devLog(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      devLog('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      devLog('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);



  return null;
};

export default FCMListener;
