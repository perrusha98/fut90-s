import {useEffect, useState, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {
  TestIds,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import ApiDataContext from '@api/StartUp/context';

const useRewardedAd = ({title, description}, onRewardEarned = () => {}) => {
  
  const {apiData} = useContext(ApiDataContext);
  const adsKeyWords = apiData.general_settings.screens.global.ads.keywords; 

  const rewardedAdUnitId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-4765178500146658/6881758990';

  const [showAlert, setshowAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const rewardedAd = RewardedAd.createForAdRequest(rewardedAdUnitId, {
    keywords: adsKeyWords, // Usar las keywords importadas del JSON
  });

  // Función para mostrar un mensaje con ToastAndroid
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const setupRewardedAd = () => {
    setshowAlert(() => {
      return () => {
        Alert.alert(
          title,
          description,
          [
            {text: 'NO', onPress: () => {}},
            {
              text: 'VER VIDEO',
              onPress: () => {
                rewardedAd.load();
                setIsLoading(true);
                showToast('Buscando anuncio...'); // Mostrar mensaje al buscar anuncio
              },
            },
          ],
          {cancelable: true},
        );
      };
    });

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsLoading(false); // Cerrar alerta cuando se carga el anuncio
        rewardedAd.show();
      },
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        setIsLoading(false);
        showToast('Recompensa obtenida.');
        onRewardEarned();
      },
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setIsLoading(false);
      },
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setIsLoading(false); // Cerrar alerta si hay un error
        setshowAlert(() => {
          return () => {};
        });
        console.log(
          'ERROR de AdMob, probablemente no hay anuncios disponibles. Se otorga recompensa igualmente.',
        );
        onRewardEarned(); // Ejecutamos la función callback aunque haya un error
      },
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
    };
  };

  useEffect(() => {
    const unsubscribeRewardedEvents = setupRewardedAd();
    return () => {
      unsubscribeRewardedEvents();
      setIsLoading(false); // Cerrar alerta si el componente se desmonta
    };
  }, []);

  return {showAlert, isLoading};
};

export default useRewardedAd;
