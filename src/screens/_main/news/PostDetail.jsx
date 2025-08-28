import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AdMobBanner from '@components/admob/banner';

const NewsDetailScreen = ({ route }) => {
  const { title, contentEncoded, imageUrl } = route.params;

  // Limpiar enlaces anchor con REGEX
  const sanitizedHtmlContent = contentEncoded.replace(
    /<a\b[^>]*>(.*?)<\/a>/gi,
    '$1'
  );
  // Agregar sandbox a los iframes
  const htmlContentWithSandbox = sanitizedHtmlContent.replace(
    /(<iframe\b[^>]*)>/gi,
    '$1 sandbox="allow-scripts allow-same-origin">'
  );

  const htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Arial, sans-serif';
            font-size: 16px;
            line-height: 1.6;
            margin: 10px;
            padding: 0;
            background: #390000;
            color: #fff;
          }
          img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
          }
          .wp-caption {
            max-width: 100%;
          }
          h1 {
            font-size: 32px;
            font-weight: bold;
            color: #fff; /* Blanco */
            margin-bottom: 16px;
          }
          h2 {
            font-size: 28px;
            font-weight: bold;
            color: #eee; /* Gris claro */
            margin-bottom: 14px;
          }
          h3 {
            font-size: 24px;
            font-weight: bold;
            color: #eee; /* Gris claro */
            margin-bottom: 12px;
          }
          h4 {
            font-size: 20px;
            font-weight: bold;
            color: #eee; /* Gris claro */
            margin-bottom: 10px;
          }
          iframe {
            width: 100%;
            max-height: 360px;
          }
          ul {
            list-style-type: disc;
            padding-left: 20px;
          }
          ol {
            list-style-type: decimal;
            padding-left: 20px;
          }
          li {
            margin-bottom: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          /* Agrega cualquier estilo adicional según sea necesario */
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <img src="${imageUrl}" alt="Image" />
        <div>${htmlContentWithSandbox}</div>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {contentEncoded && (
        <WebView source={{ html: htmlContent }} style={styles.webView} />
      )}
      <AdMobBanner bannerType={"AnchorBanner"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#390000',
  },
  webView: {
    flex: 1,
    backgroundColor: '#170000',
  },
  centerAd: {
    backgroundColor: '#390000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsDetailScreen;
