import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import ScreenLoading from "@screens/Loading/Screen";
import AdBanner from "@hooks/admob/banner";

const WebViewStats = () => {
  const [loading, setLoading] = useState(true);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tables Stats</title>
        <style>
            /* CSS reset */
            html, body {
                margin: 0;
                padding: 0;
                background: #390000;
            }

            a {
                text-decoration: none;
                color: #000;
            }

            /* Estilo del menú */
            .menu {
                background-color: #000;
                color: #fff;
                padding: 5px;
                cursor: pointer;
                display: inline-flex;
                flex-direction: column;
                width: 100%;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 18px;
                position: relative;
                height: 40px;
                justify-content: center;
            }

            .menu ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: none;
                position: absolute;
                background-color: #fff;
                top: 100%;
                left: 0;
                width: 100%;
                font-size: 18px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .menu li {
                padding: 8px 12px;
                color: #000;
                transition: color 0.2s ease-in-out;
                border-bottom: 1px solid black;
            }

            /* Cambio de color al pasar el cursor por encima */
            .menu li:hover {
                color: #000;
            }

            /* Mostrar el menú cuando se pasa el cursor por encima */
            .menu:hover ul {
                display: block;
            }
        </style>
    </head>
    <body>
        <div id="gz-scores"></div>
        <div class="gz-container clearflix">
            <div class="menu">
                Seleccionar Liga:
                <ul>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/743?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Liga MX</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/8?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Premier League</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/82?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Bundesliga</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/2?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Champions</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/564?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">LaLiga</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/384?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Serie A</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/301?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Ligue 1</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/746?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">Copa MX</a></li>
                    <li><a target="xcores" href="https://www.scoreaxis.com/widget/standings-widget/779?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f">MLS</a></li>
                </ul>
            </div>
            <div id="scoreaxis-widget-8405f" data-reactroot="">
                <iframe name="xcores" id="Iframe"
                    src="https://www.scoreaxis.com/widget/standings-widget/743?borderColor=%23b12a2a&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23390000&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f"
                    style="width:100%;border:none;transition:all 300ms ease"></iframe>
                <script>
                window.addEventListener("DOMContentLoaded", event => {
                    window.addEventListener("message", event => {
                        if (event.data.appHeight && "8405f" == event.data.inst) {
                            let container = document.querySelector(
                                "#scoreaxis-widget-8405f iframe");
                            container && (container.style.height = parseInt(event.data.appHeight) + "px");
                        }
                    }, false);
                });
                </script>
            </div>
        </div>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1, backgroundColor: "#390000" }}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ScreenLoading />
        </View>
      )}

      <WebView
        style={{ flex: 1, backgroundColor: "#390000" }}
        source={{ html: htmlContent }}
        onLoad={() => setLoading(false)}
      />

      <View style={{ maxWidth: "100%" }}>
        <AdBanner size="AnchorBanner" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: "100%",
    position: "absolute",
    zIndex: 999,
    height: "100%",
  },
});

export default WebViewStats;
