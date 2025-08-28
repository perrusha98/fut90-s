import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ApiDataContext from '@api/StartUp/context';

import Notifications from '@hooks/notifications';
import AdMobBanner from '@components/admob/banner';
import FeatEvent from '@components/blocks/banners/Carousel';
import DayEvents from '@components/blocks/schedule/';
import ShareButtons from '@components/blocks/buttons/share';
import LargeButton from '@components/blocks/buttons';
import MiniButtons from '@components/blocks/buttons/mini';

import LinearGradient from 'react-native-linear-gradient';

import AdConsent from '@hooks/admob/adConsent';

const HomeScreen = ({}) => {

  const {apiData} = useContext(ApiDataContext);
  const {
    screen_settings: {home: homeScreen},
  } = apiData; // Desestructurar y renombrar
  const {
    ads: {banner: adSettings},
  } = homeScreen; // Desestructurar y renombrar

  return (
    <>
      <LinearGradient
        colors={['#000', 'transparent']}
        style={styles.background}
        locations={[0.5, 9]}>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{marginBottom: 16}}>
          {adSettings.top !== 'none' && (
            <AdMobBanner bannerType={adSettings.top} />
          )}
          <FeatEvent />
          <DayEvents settings={homeScreen} />
          <LargeButton buttons={homeScreen.buttons} />
          {adSettings.bottom !== 'none' && (
            <AdMobBanner bannerType={adSettings.bottom} />
          )}
          <ShareButtons />
        </ScrollView>
        <View style={styles.miniButtonsContainer}>
          <MiniButtons buttons={homeScreen.footerButtons} />
        </View>
      </LinearGradient>
      {/* COMPONENTES EXTERNOS */}
      <AdConsent />
      <Notifications />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#b70000',
  },
  miniButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
