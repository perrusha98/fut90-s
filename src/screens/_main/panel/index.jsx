// Importaciones de librerías externas
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

// Importaciones de componentes personalizados
import WebViewWithListener from './WebViewWithListener';
import AdMobBanner from '@components/admob/banner';
import AdOpenHook from '@components/admob/adOpen';

// Importaciones de contexto y utilidades
import ApiDataContext from '@api/StartUp/context';
import useKeepAwake from '@utils/useKeepAwake';
import checkOrientation from '@utils/checkOrientation';
import {useImmersiveOnFocus} from '@hooks/useImmersiveOnFocus';

const ChatWebView = ({url}) => {
  return (
    <WebView
      source={{uri: url}}
      style={{
        width: 300,
        height: 400,
        backgroundColor: 'transparent',
      }}
    />
  );
};

const PanelScreen = ({}) => {
  
  // Hooks personalizados
  useKeepAwake();
  useImmersiveOnFocus();

  // Obtener datos del contexto y orientación
  const {isLandscape} = checkOrientation();
  const {apiData} = useContext(ApiDataContext);
  const settings = apiData;

  // Extraer configuraciones de pantalla
  const {
    ads: {
      adOpen,
      banner: {top: ad_top, bottom: ad_bottom},
    },
    general: {
      sidebar: {enabled: isSidebar, type: sidebarType, widgets} = {},
    },
  } = settings.screen_settings.live;


  // Variable y función para manejar cambios de URL
  let urlChangeCount = 0;
  const [showChat, setShowChat] = React.useState(false); // Estado para alternar entre AdMobBanner y ChatWebView

  const handleUrlChange = url => {
    urlChangeCount += 1;
    if (urlChangeCount === 2) {
      console.log('Cambio de URL detectado (segundo cambio):', url);
      setShowChat(true); // Cambiar a ChatWebView en el segundo cambio
    }
  };

  return (
    <View style={styles.container}>
      {/* Anuncio de apertura */}
      {adOpen && <AdOpenHook />}

      {/* Banner superior (solo en modo portrait) */}
      {!isLandscape && ad_top !== 'none' && <AdMobBanner bannerType={ad_top} />}

      <View
        style={
          isLandscape && isSidebar
            ? styles.landscapeContainer
            : styles.portraitContainer
        }>
        {/* WebView principal */}
        <WebViewWithListener
          settings={apiData}
          onUrlChange={handleUrlChange}
          style={isLandscape ? styles.landscapeWebview : styles.webview}
        />

        {/* Sidebar lateral (solo en modo landscape) */}
        {isLandscape && isSidebar && (
          <View style={styles.landscapeAdContainer}>
            {sidebarType == 'ad' ? (
              <AdMobBanner bannerType={widgets.ad.size} />
            ) : sidebarType == 'chat' ? (
              <ChatWebView url={widgets.chat.url} />
            ) : (
              sidebarType == 'dual' &&
              (showChat ? (
                <ChatWebView url={widgets.chat.url} />
              ) : (
                <AdMobBanner bannerType={widgets.ad.size} />
              ))
            )}
          </View>
        )}
      </View>

      {/* Banner inferior (solo en modo portrait) */}
      {!isLandscape && ad_bottom !== 'none' && (
        <AdMobBanner bannerType={ad_bottom} />
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  landscapeWebview: {
    flex: 1,
  },
  landscapeAdContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitContainer: {
    flex: 1,
  },
});

export default PanelScreen;
