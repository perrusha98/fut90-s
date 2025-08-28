import { useEffect } from 'react';
import KeepAwake from 'react-native-keep-awake';

/**
 * Hook personalizado para mantener la pantalla activa
 * @param {boolean} enabled Si es false, no activará KeepAwake (opcional, por defecto true)
 */
const useKeepAwake = (enabled = true) => {
  useEffect(() => {
    // Solo activar si enabled es true
    if (enabled) {
      // Activar keep awake cuando el componente se monta
      KeepAwake.activate();
      
      // Desactivar keep awake cuando el componente se desmonta
      return () => {
        KeepAwake.deactivate();
      };
    }
  }, [enabled]);
};

export default useKeepAwake;
