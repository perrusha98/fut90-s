
import {WebView} from 'react-native-webview';

const ChatWebView = ({ url, height, width }) => {
  return (
    <WebView
      source={{ uri: url }}
      style={{
        width: "100%",
        height: "100%",
        minWidth: 300,
        minHeight: 300,
        backgroundColor: 'transparent',
      }}
    />
  );
};


export default ChatWebView