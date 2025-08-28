import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Platform} from 'react-native';
import ImmersiveMode from 'react-native-immersive-mode';

export function useImmersiveOnFocus(onlyLandscape = true) {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;

      const apply = () => {
        ImmersiveMode.fullLayout(true);
        ImmersiveMode.setBarMode('FullSticky'); // activa al enfocar
      };

      // Re-aplicar con pequeño delay por si Android muestra barras al animar
      const t = setTimeout(apply, 0);
      apply();

      return () => {
        // Al perder foco (blur) desmonta
        ImmersiveMode.fullLayout(false);
        ImmersiveMode.setBarMode('Normal');
        clearTimeout(t);
      };
    }, [])
  );
}
