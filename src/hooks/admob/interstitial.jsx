import React, {useEffect, useState, useContext} from 'react';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import ApiDataContext from '@api/StartUp/context';

const useInterstitial = (onAdClosedCallback) => {
  
  const {apiData} = useContext(ApiDataContext);
  const adsKeyWords = apiData.general_settings.screens.global.ads.keywords; // Convertir texto plano en array y eliminar elementos vacíos
  
  const IntersAd = __DEV__ ? TestIds.INTERSTITIAL :'ca-app-pub-4765178500146658/8194840661';
  
  const [hasError, setHasError] = useState(false);
  
  const {isLoaded, load, show, isClosed} = useInterstitialAd(IntersAd, {
    keywords: adsKeyWords,
  });

  useEffect(() => {
    try {
      load();
    } catch (error) {
      if (__DEV__) {
        console.error('Error al cargar el anuncio intersticial:', error);
      }
      setHasError(true);
    }
  }, [load]);

  useEffect(() => {
    if (isClosed || hasError) {
      try {
        load();
      } catch (error) {
        if (__DEV__) {
          console.error('Error al recargar el anuncio intersticial:', error);
        }
      }
      
      if (onAdClosedCallback) {
        onAdClosedCallback(); // Ejecutar callback al cerrar el Interstitial o en caso de error
      }
      
      if (hasError) {
        setHasError(false); // Resetear el estado de error
      }
    }
  }, [isClosed, load, onAdClosedCallback, hasError]);
  
  const CallInterstitial = () => {
    try {
      if (isLoaded) {
        show();
      } else {
        if (__DEV__) {
          console.warn('Anuncio intersticial no está cargado, ejecutando callback directamente');
        }
        setHasError(true); // Marcar como error para ejecutar el callback
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error al mostrar el anuncio intersticial:', error);
      }
      setHasError(true); // Marcar como error para ejecutar el callback
    }
  };

  return {CallInterstitial, isLoaded, hasError};
};

export {useInterstitial};
