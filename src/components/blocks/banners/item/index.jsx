import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import openActions from '@utils/openActions';
import BannerImage from './img';
import BannerFooter from './footer';

const CountdownBanner = ({item, showNext, showPrev, onNext, onPrev}) => {
  const goToScreen = openActions();
  const {image: imageUrl, hour: date, icon, action, styled} = item;

  if (!imageUrl) return null;

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => goToScreen[action.type]?.(action.value)}
          activeOpacity={0.9}>
          <BannerImage imageUrl={imageUrl} onLoad={() => {}} />
        </TouchableOpacity>
        <BannerFooter
          date={date}
          styled={styled}
          icon={icon}
          isLoadingAd={goToScreen.isLoadingAd}
          showNext={showNext}
          showPrev={showPrev}
          onNext={onNext}
          onPrev={onPrev}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
});

export default CountdownBanner;
