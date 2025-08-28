import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Hook personalizado para detectar la orientación del dispositivo
 * @returns {Object} Objeto con propiedades isLandscape y isPortrait
 */
const useOrientation = () => {
  const { width, height } = useWindowDimensions();
  const [isLandscape, setIsLandscape] = useState(width > height);
  
  useEffect(() => {
    // Actualizar el estado de orientación cuando cambien las dimensiones
    setIsLandscape(width > height);
  }, [width, height]);

  return {
    isLandscape,
    isPortrait: !isLandscape
  };
};

export default useOrientation;
