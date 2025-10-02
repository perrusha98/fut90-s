import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useRewardedAd from '@hooks/admob/reward';
import { useInterstitial } from '@hooks/admob/interstitial';
import LoadingOverlay from './LoadingOverlay';

import { Linking } from 'react-native';

const WebViewWithListener = ({ settings, onUrlChange }) => {
  const webViewRef = useRef(null);
  const [urlChangeCount, setUrlChangeCount] = useState(0);
  const [currentURL, setCurrentURL] = useState('');
  const [isVerificationInterstitial, setIsVerificationInterstitial] =
    useState(false);
  const [hasFirstUrlChanged, setHasFirstUrlChanged] = useState(false);

  // Desestructuración de configuraciones
  const {
    general: { webview_conf = {} } = {},
    ads: { InterstitialEach: interstitial, reward } = {},
    custom_url: url,
  } = settings?.screen_settings?.live ?? {};


  // Hooks personalizados
  const sendStatusVIP = status => {
    const injectedJavaScript = `
      window.receiveVerificationStatus(${status});
    `;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectedJavaScript);
    }
  };
  const {
    // REWARD
    showAlert: showRewarded,
    isLoading: RewardLoading,
  } = useRewardedAd(reward.alert, () => sendStatusVIP(true));

  const { CallInterstitial, isLoaded, hasError } = useInterstitial(() => {
    // Solo enviar verificación si el interstitial fue mostrado para verificación
    if (isVerificationInterstitial) {
      sendStatusVIP(true);
    }
    setIsVerificationInterstitial(false); // Resetear el estado
  });

  // Manejo de cambios en la navegación
  const handleNavigationStateChange = navState => {
    const newURL = navState.url;

    if (newURL !== currentURL) {
      setCurrentURL(newURL);
      if (onUrlChange) {
        onUrlChange(newURL); // Notificar cada cambio de URL
      }
    }

    if (newURL !== currentURL && newURL.includes('true')) {
      setCurrentURL(newURL);
      if (newURL.includes('interstitial')) {
        setIsVerificationInterstitial(true);
        CallInterstitial();
      } else if (newURL.includes('reward')) {
        showRewarded();
      }
    } else if (newURL !== currentURL) {
      setCurrentURL(newURL);
      setUrlChangeCount(prevCount => {
        const newCount = prevCount + 1;
        if (
          interstitial > 0 &&
          isLoaded &&
          newCount >= interstitial &&
          newCount % interstitial === 0
        ) {
          CallInterstitial();
        }
        return newCount;
      });
    }
  };

  const allowedDomains = webview_conf.allow_domains;
  // 🔒 Bloquear navegación a dominios no permitidos
  const handleShouldStartLoad = request => {
    try {
      const hostname = new URL(request.url).hostname;
      const isAllowed = allowedDomains.some(domain =>
        hostname.includes(domain),
      );

      if (!isAllowed) {
        return false; // Bloquea la navegación
      }

      return true; // Permite la navegación
    } catch (e) {
      return false; // Bloquea si no puede analizar
    }
  };
 
  const handleMessage = event => {
    const url = event.nativeEvent.data; // recibe la URL directamente
    Linking.openURL(url).catch(err => console.error('❌ Error al abrir:', err));
  };

  // Renderizado del componente
  return (
    <>
      <WebView
        ref={webViewRef}
        style={{ backgroundColor: '#1a0202' }}
        source={{ uri: url }}
        setSupportMultipleWindows={webview_conf.support_multiwindow}
        onMessage={handleMessage}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        javaScriptEnabled={true}
        scrollEnabled={false}
        allowsFullscreenVideo={true}
      />
      <LoadingOverlay isLoading={RewardLoading} />
    </>
  );
};

export default WebViewWithListener;
