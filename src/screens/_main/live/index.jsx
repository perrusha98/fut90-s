// Importaciones de librerías externas
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Importaciones de contexto y utilidades
import ApiDataContext from '@api/StartUp/context';
import useKeepAwake from '@utils/useKeepAwake';
import checkOrientation from '@utils/orientation/check';
import Orientation from 'react-native-orientation-locker';
import { useImmersiveOnFocus } from '@utils/useImmersiveOnFocus';

// Importaciones de componentes personalizados
import Panel from './panel/core';
import ChatBox from './webview/chat';

// Importación de Hooks
import AdBanner from '@hooks/admob/banner';
import AdOpenHook from '@hooks/admob/openAd/timeout';

const PanelScreen = ({}) => {
  const { isLandscape } = checkOrientation();
  const { apiData } = useContext(ApiDataContext);

  useKeepAwake();
  useImmersiveOnFocus();

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  // Extraer configuraciones de pantalla
  const {
    general: {
      sidebar: { enabled: isSidebar, type: sidebarType, widgets } = {},
    },
    ads: { adOpen, banner },
  } = apiData.screen_settings.live;

  // Variable y función para manejar cambios de URL
  let count = 0;
  const [showChat, setShowChat] = React.useState(false);

  const handleURLChange = url => {
    count += 1;
    if (count === 2) {
      setShowChat(true);
    }
  };

  return (
    <View style={[styles.container, isLandscape && { flexDirection: 'row' }]}>
      {adOpen && <AdOpenHook />}

      {/* MAIN PANEL*/}
      <View style={styles.main}>
        {banner.top !== 'none' && <AdBanner size={banner.top} />}
        <Panel settings={apiData} onUrlChange={handleURLChange} />
        {banner.bottom !== 'none' && <AdBanner size={banner.bottom} />}
      </View>

      {/* SIDEBAR  (LANDSCAPE) */}
      {isLandscape && isSidebar && (
        <View style={styles.sidebar}>
          {sidebarType == 'ad' ? (
            <AdBanner size={widgets.ad.size} />
          ) : sidebarType == 'chat' ? (
            <ChatBox url={widgets.chat.url} />
          ) : (
            sidebarType == 'dual' &&
            (!showChat ? (
              <AdBanner size={widgets.ad.size} />
            ) : (
              <ChatBox url={widgets.chat.url} />
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  main: {
    flex: 1,
  },
  sidebar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PanelScreen;
