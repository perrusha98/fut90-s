import { useEffect } from 'react';
import KeepAwake from 'react-native-keep-awake';

/**
 * Hook personalizado para mantener la pantalla activa
 * @param {boolean} enabled Si es false, no activará KeepAwake (opcional, por defecto true)
 */
const useKeepAwake = (enabled = true) => {
  useEffect(() => {
    if (enabled) {
      KeepAwake.activate();
      return () => {
        KeepAwake.deactivate();
      };
    }
  }, [enabled]);
};

export default useKeepAwake;
