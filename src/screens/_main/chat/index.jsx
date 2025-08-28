import React, {useContext} from 'react';

import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";

import ApiDataContext from '@api/StartUp/context';

const ChatScreen = () => {
  const {apiData} = useContext(ApiDataContext);
  const chatUrl = apiData.general_settings.screens.chat.url; // Desestructurar y renombrar

  return (
    <View style={styles.container}>
      <WebView source={{ uri: chatUrl }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#390000",
    flex: 1,
  },
  webview: {
    backgroundColor: "#390000",
    flex: 1,
  },
});

export default ChatScreen;
