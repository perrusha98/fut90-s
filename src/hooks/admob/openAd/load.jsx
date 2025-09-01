import { useEffect, useState, useRef } from 'react';
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const useAppOpenAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false); 
  const [isAdVisible, setIsAdVisible] = useState(false); // Estado para controlar la visibilidad del fondo blanco
  const appOpenAd = useRef(null);  // Usamos un ref para mantener la instancia del anuncio

  useEffect(() => {
    // Define el ID del anuncio

    const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-4765178500146658/7516732556';

    // Crea la instancia del anuncio
    appOpenAd.current = AppOpenAd.createForAdRequest(adUnitId);

    const handleAdLoaded = () => {
      setIsAdLoaded(true); // Marca el anuncio como cargado
    };

    const handleAdClosed = () => {
      setIsAdLoaded(false); // Reset cuando el anuncio se cierre
      setIsAdVisible(false); // Oculta el fondo blanco cuando el anuncio se cierra
    }; 

    const handleAdFailedToLoad = (error) => {
      console.error('Error al cargar el anuncio de App Open:', error);
      setIsAdLoaded(false); // Si falla, indicamos que no está cargado
      setIsAdVisible(false); // Oculta el fondo blanco si falla la carga
    };

    // Añadir los listeners de eventos
    const adLoadedListener = appOpenAd.current.addAdEventListener(
      AdEventType.LOADED,
      handleAdLoaded
    );
    const adClosedListener = appOpenAd.current.addAdEventListener(
      AdEventType.CLOSED,
      handleAdClosed
    );
    const adFailedToLoadListener = appOpenAd.current.addAdEventListener(
      AdEventType.ERROR,
      handleAdFailedToLoad
    );

    // Cargar el anuncio
    appOpenAd.current.load();

    // Limpiar los listeners cuando el componente se desmonte
    return () => {
      adLoadedListener();
      adClosedListener();
      adFailedToLoadListener();
    };
  }, []);

  const showAd = () => {
    if (isAdLoaded && appOpenAd.current) {
      setIsAdVisible(true); // Muestra el fondo blanco cuando se muestra el anuncio
      appOpenAd.current.show();
    } else {
      console.log("El anuncio no está cargado aún");
    }
  };

  return { isAdLoaded, showAd, isAdVisible }; // Devuelve el estado de visibilidad del anuncio
};

export default useAppOpenAd;
