// useOrientationOnFocus.js
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

function apply(mode) {
  switch (mode) {
    case 'portrait':
      Orientation.lockToPortrait();
      break;
    case 'portraitUpsideDown':
      Orientation.lockToPortraitUpsideDown();
      break;
    case 'landscape':
      Orientation.lockToLandscape();
      break;
    case 'landscapeLeft':
      Orientation.lockToLandscapeLeft();
      break;
    case 'landscapeRight':
      Orientation.lockToLandscapeRight();
      break;
    case 'unlock':
      Orientation.unlockAllOrientations();
      break;
    default:
      break;
  }
}

export function useOrientationOnFocus({ enter, exit = 'portrait' }) {
  useFocusEffect(
    useCallback(() => {
      apply(enter);
      return () => apply(exit);
    }, [enter, exit])
  );
}
