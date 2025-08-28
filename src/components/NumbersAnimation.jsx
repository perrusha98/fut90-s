import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importamos la librería de iconos
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get("window");

// Lista de iconos posibles para mostrar
const ICONS = ["trophy", "star","star-o", "soccer-ball-o", "thumbs-up", "heart", "play-circle-o", "play-circle", "youtube-play","soccer-ball-o", "play-circle", "video-camera", ];

const NumbersAnimation = React.memo(({ opacity = 0.3 }) => {
  
  const [numberGrid, setNumberGrid] = useState([]);
  const animationRef = useRef(null);
  const requestRef = useRef(null);
  
  // Calcular cuántos elementos necesitamos para llenar la pantalla
  const { columnCount, rowCount } = useMemo(() => ({
    columnCount: Math.ceil(width / 50), // 50px por número
    rowCount: Math.ceil(height / 30)
  }), []);
  
  // Generar un número aleatorio formateado entre 01 y 90 con un apóstrofe
  const getRandomNumber = useCallback(() => {
    return {
      type: 'number',
      value: String(Math.floor(Math.random() * 90) + 1).padStart(2, '0') + "'"
    };
  }, []);
  
  // Generar un icono aleatorio
  const getRandomIcon = useCallback(() => {
    return {
      type: 'icon',
      value: ICONS[Math.floor(Math.random() * ICONS.length)]
    };
  }, []);
  
  // Decidir si generar un número o un icono (20% de probabilidad de icono)
  const generateRandomElement = useCallback(() => {
    return Math.random() < 0.15 ? getRandomIcon() : getRandomNumber();
  }, [getRandomIcon, getRandomNumber]);
  
  // Obtener un intervalo de tiempo aleatorio entre 100ms y 1000ms
  const getRandomInterval = useCallback(() => {
    return Math.random() * 900 + 100; // Entre 100ms y 1000ms
  }, []);
  
  // Inicializar la grilla con valores y tiempos de actualización
  const initializeGrid = useCallback(() => {
    const now = performance.now();
    const newGrid = [];
    
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        row.push({
          ...generateRandomElement(),
          nextUpdateTime: now + getRandomInterval()
        });
      }
      newGrid.push(row);
    }
    
    return newGrid;
  }, [rowCount, columnCount, generateRandomElement, getRandomInterval]);
  
  // Función principal de animación que se ejecuta en cada frame
  const animationLoop = useCallback((timestamp) => {
    setNumberGrid(prevGrid => {
      // Crear una copia del grid actual solo si realmente hay cambios
      let newGrid = null;
      let hasChanges = false;
      
      // Revisar cada celda para ver si necesita actualización
      for (let i = 0; i < prevGrid.length; i++) {
        for (let j = 0; j < prevGrid[i].length; j++) {
          if (timestamp >= prevGrid[i][j].nextUpdateTime) {
            // Creamos la copia solo cuando sea necesario (lazy copy)
            if (!newGrid) {
              newGrid = [...prevGrid.map(row => [...row])];
            }
            // Es tiempo de actualizar este elemento
            newGrid[i][j] = {
              ...generateRandomElement(),
              nextUpdateTime: timestamp + getRandomInterval()
            };
            hasChanges = true;
          }
        }
      }
      
      // Solo actualizar el estado si hubo cambios
      return hasChanges ? newGrid : prevGrid;
    });
    
    // Continuar el loop de animación
    requestRef.current = requestAnimationFrame(animationLoop);
  }, [generateRandomElement, getRandomInterval]);
  
  useEffect(() => {
    // Inicializar grid
    setNumberGrid(initializeGrid());
    
    // Iniciar el loop de animación
    requestRef.current = requestAnimationFrame(animationLoop);
    
    // Limpiar al desmontar
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [initializeGrid, animationLoop]);
  
  // Memoizar la estructura renderizada
  const gridContent = useMemo(() => (
    numberGrid.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.row}>
        {row.map((cell, colIndex) => (
          cell.type === 'icon' ? (
            <Icon 
              key={`cell-${rowIndex}-${colIndex}`}
              name={cell.value}
              style={styles.icon}
            />
          ) : (
            <Text 
              key={`cell-${rowIndex}-${colIndex}`} 
              style={styles.number}
            >
              {cell.value}
            </Text>
          )
        ))}
      </View>
    ))
  ), [numberGrid]);
  
  return (
    <View style={[styles.container, { opacity }]}>
      {gridContent}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  number: {
    fontSize: 30,
    fontFamily: "dsdigit",
    color: "#520000",
    margin: 5,
    width: 40,
    textAlign: "center",
  },
  icon: {
    fontSize: 30,
    color: "#520000",
    margin: 5,
    width: 40,
    textAlign: "center",
  }
});

export default NumbersAnimation;
