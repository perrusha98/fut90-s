import React, { useRef, useContext, useEffect, useState } from "react";
import Navigation from "../../navigation";
import ApiDataContext from "./context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UpdateScreen from "@api/screens/Updates";
import ErrorScreen from "@api/screens/Error";
import SplashScreen from "@api/screens/Splash";

import { getVersion } from "react-native-device-info";
import AdOpenHook from "@hooks/admob/openAd/timeout";

const AppStartUpScreen = () => {
  const { storeApiData, apiData } = useContext(ApiDataContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [retry, setRetry] = useState(0);

  // const [apiURL, setApi] = useState(null); // Cambiar el estado inicial
  const [apiURL, setApi] = useState("https://apis.donromans.com/fut-90.json"); 

  const appVersion = getVersion();

  const settingAppVersion = apiData?.general_settings?.version;
  const requiereUpdate = appVersion < settingAppVersion;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }
        const data = await response.json();
          setHasError(false);
          setErrorDetails(null);
          storeApiData(data.acf);
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 3000);
      } catch (error) {
        console.error("Error al cargar los datos del API:", error);
        setErrorDetails({
          message: error.message,
          code: error.message.includes("Error del servidor")
            ? parseInt(error.message.split(": ")[1])
            : null,
        });
        setTimeout(() => {
          setHasError(true);
        }, 2500);
      }
    };
    fetchData();
  }, [retry]);
  
  return (
    <>
      {apiData?.general_settings?.adOpen && requiereUpdate == false ? (
        <AdOpenHook />
      ) : null}
      {hasError ? (
        <ErrorScreen
          onRetry={() => {
            setRetry(retry + 1);
            setHasError(false);
          }}
          retryNumber={retry}
          errorDetails={errorDetails}
        />
      ) : isDataLoaded ? (
        requiereUpdate ? (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <UpdateScreen settings={apiData} />
          </GestureHandlerRootView>
        ) : (
          <Navigation />
        )
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default AppStartUpScreen;
