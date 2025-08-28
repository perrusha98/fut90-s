import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Image, View, Dimensions, Animated, Easing, Text } from "react-native";

// Importación directa de imágenes para evitar problemas en producción
const imageAssets = {
  "06": require("../../../assets/logo/06.png"),
  "14": require("../../../assets/logo/14.png"),
  "23": require("../../../assets/logo/23.png"),
  "31": require("../../../assets/logo/31.png"),
  "42": require("../../../assets/logo/42.png"),
  "52": require("../../../assets/logo/52.png"),
  "60": require("../../../assets/logo/60.png"),
  "68": require("../../../assets/logo/68.png"),
  "77": require("../../../assets/logo/77.png"),
  "90": require("../../../assets/logo/90.png"),
  "ball": require("../../../assets/logo/ball.png"),
};

const LogoImage = React.memo(() => {
  // Memoizar valores de dimensiones para evitar recálculos
  const { imageSize, ballSize } = useMemo(() => {
    const windowWidth = Dimensions.get("window").width;
    return {
      imageSize: windowWidth * 0.5,
      ballSize: windowWidth * 0.2
    };
  }, []);

  // Valor para la animación de rotación
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Secuencia inicial ordenada - memoizada para evitar recreaciones
  const imageSequence = useMemo(() => ["06", "14", "23", "31", "42", "52", "60", "68", "77", "90"], []);

  // Estado para manejo de errores
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [displaySequence, setDisplaySequence] = useState(imageSequence);
  const [randomizing, setRandomizing] = useState(false);
  const [finalPhase, setFinalPhase] = useState(false);
 
  // Iniciar animación de rotación - optimizada con useCallback
  const startRotation = useCallback(() => {
    try {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } catch (error) {
      console.error("Error al iniciar rotación:", error);
      setHasError(true);
      setErrorMsg("Error en animación");
    }
  }, [rotateAnim]);

  useEffect(() => {
    startRotation();
  }, [startRotation]);

  // Transformar el valor de la animación en grados de rotación - memoizado
  const rotate = useMemo(() => rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  }), [rotateAnim]);

  // Simplificamos la precarga de imágenes para evitar problemas en producción
  useEffect(() => {
    try {
      // Marcamos como listo después de un breve retraso sin prefetch
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error al precargar imágenes:", error);
      setHasError(true);
      setErrorMsg("Error al cargar recursos");
      // Aún así intentamos mostrar el componente
      setIsReady(true);
    }
  }, []);

  // Iniciar aleatorización después de 1 segundo
  useEffect(() => {
    if (!isReady) return;
    
    const randomizeTimer = setTimeout(() => {
      try {
        setRandomizing(true);
        setCurrentIndex(0); // Reiniciar la animación para la fase aleatoria
      } catch (error) {
        console.error("Error en randomización:", error);
      }
    }, 1000);
    
    return () => clearTimeout(randomizeTimer);
  }, [isReady]);

  // Generar secuencia aleatoria - optimizada con useCallback
  const generateRandomSequence = useCallback(() => {
    try {
      return [...imageSequence.slice(0, -1)]
        .sort(() => Math.random() - 0.5)
        .concat("90"); // Aseguramos que "90" sea siempre el último
    } catch (error) {
      console.error("Error al generar secuencia aleatoria:", error);
      return imageSequence; // Fallback a secuencia normal
    }
  }, [imageSequence]);

  // Avanzar en la secuencia o aleatorizar
  useEffect(() => {
    if (!isReady) return;

    try {
      if (randomizing && !finalPhase) {
        setDisplaySequence(generateRandomSequence());
        setFinalPhase(true);
        setCurrentIndex(0);
        return;
      }

      if (currentIndex >= displaySequence.length - 1) return;

      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error en la secuencia de animación:", error);
      setHasError(true);
      setErrorMsg("Error en animación");
    }
  }, [isReady, currentIndex, randomizing, finalPhase, displaySequence, generateRandomSequence]);

  // Memoizar el renderizado de las imágenes para evitar recreaciones innecesarias
  const imagesContent = useMemo(() => {
    try {
      return displaySequence.map((key, index) => (
        <Image
          key={key + index}
          source={imageAssets[key]}
          style={{
            position: "absolute",
            maxWidth: imageSize,
            maxHeight: imageSize,
                height: '100%',
                width: '100%',
            resizeMode: "contain",
            opacity: index === currentIndex ? 1 : 0,
            zIndex: 99,
          }}
        />
      ));
    } catch (error) {
      console.error("Error al renderizar imágenes:", error);
      return (
        <Text style={{color: 'red'}}>Error al cargar imágenes</Text>
      );
    }
  }, [displaySequence, imageSize, currentIndex]);

  // Incluso si no está listo, mostramos algo para evitar pantallas en blanco
  return (
    <View
      style={{
        maxWidth: imageSize,
        maxHeight: imageSize,
                height: '100%',
                width: '100%',
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      {hasError ? (
        <Text style={{color: 'red'}}>{errorMsg || "Error al cargar"}</Text>
      ) : (
        <>
          {isReady && imagesContent}
          
          {/* Pelota giratoria encima de todo - solo mostrarla cuando isReady es true */}
          {isReady && (
            <Animated.Image
              source={imageAssets["ball"]}
              style={{
                position: "absolute",
                maxWidth: ballSize - 8,
                maxHeight: ballSize - 8,
                height: '100%',
                width: '100%',
                resizeMode: "contain",
                zIndex: 9,
                transform: [{ rotate }],
                right: -5,
                top: 45,
              }}
            />
          )}
        </>
      )}
    </View>
  );
});

export default LogoImage;
