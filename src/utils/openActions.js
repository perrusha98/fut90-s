import { Linking, ToastAndroid } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RewardHook from '@hooks/admob/reward';

const openActions = () => {
  const navigation = useNavigation();

  const handleRewardEarned = () => {
    navigation.navigate('Live-Stack');
  };

 const { showAlert, isLoading } = RewardHook(
  {
    title: '',
    description: 'Para acceder a esta sección debes ver un anuncio antes',
  },
  handleRewardEarned 
);

  const Link = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  const Screen = (screenName, params = {}) => {
    navigation.navigate(screenName, params);
  };

  const Live = () => {
    showAlert();
  };

  const none = () => {
    ToastAndroid.show('Acción no disponible.', ToastAndroid.SHORT);
  };

  return { 
    Screen,
    none,
    Link,
    Live,
    isLoadingAd: isLoading 
  };
};

export default openActions;
