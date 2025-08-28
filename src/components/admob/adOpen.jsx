import useAppOpenAd from '@hooks/admob/open'; // Importar useAppOpenAd
import React, { useEffect, useState } from 'react';

import { View } from 'react-native'; // Importar View de react-native

const AdOpenHook = ({}) => {
  const { isAdLoaded, showAd, isAdVisible } = useAppOpenAd();
  const [timerElapsed, setTimerElapsed] = useState(false);
  
  useEffect(() => {
    // Configurar un temporizador de 3.5 segundos
    const timer = setTimeout(() => {
      setTimerElapsed(true);
    }, 3000);
    
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);
  
  useEffect(() => {
    if (isAdLoaded && timerElapsed) {
      showAd(); // Llama showAd cuando el anuncio esté listo y hayan pasado 3.5 segundos
    }
  }, [isAdLoaded, timerElapsed]);

  return (
    <>
      {isAdVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#212121',
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

// const styles = StyleSheet.create({});

export default AdOpenHook;
