import {View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const AdMobBanner = ({bannerType}) => {
  const BannerId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-4765178500146658/6562743535';

  const getBannerSize = type => {
    switch (type) {
      case 'LargeBanner':
        return BannerAdSize.LARGE_BANNER;
      case 'FullBanner':
        return BannerAdSize.FULL_BANNER;
      case 'AnchorBanner':
        return BannerAdSize.ANCHORED_ADAPTIVE_BANNER;
      case 'MediumRectangle':
        return BannerAdSize.MEDIUM_RECTANGLE;
      case 'InlineAdaptative':
        return BannerAdSize.INLINE_ADAPTIVE_BANNER;
      case 'WideSkyscrapeer':
        return BannerAdSize.WIDE_SKYSCRAPER;
      // Agrega más casos según tus necesidades
      default:
        return BannerAdSize.FULL_BANNER;
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BannerAd unitId={BannerId} size={getBannerSize(bannerType)} />
    </View>
  );
};

export default AdMobBanner;
