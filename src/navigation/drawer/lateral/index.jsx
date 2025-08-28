import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';
import ShareHook from '@hooks/share';

import {getVersion} from 'react-native-device-info';
const appVersion = getVersion();

import FooterSocialLinks from './footer';

const ItemDrawer = ({label, onPress, iconName, type, ext}) => (
  <DrawerItem
    label={() => (
      <View
        style={[
          {
            marginVertical: type ? 0 : -8,
          },
          styles.ItemStyle,
        ]}>
        <Icon name={iconName} size={type ? 20 : 12} color="#fff" />
        <Text
          style={[
            {
              fontWeight: type ? '900' : '600',
              fontSize: type ? 14 : 12,
            },
            styles.ItemLabel,
          ]}>
          {label}
        </Text>
      </View>
    )}
    onPress={onPress}
  />
);

const CustomDrawerContent = ({settings, navigation, ...props}) => {
  const {onShare} = ShareHook();

  const socialLinks = settings.general_settings.social_links;

  return (
    <View style={styles.DrawerWrapper}>
      <ImageBackground
        source={require('@assets/images/splash.png')}
        resizeMode="cover"
        style={styles.imageBackground}
      />
      <LinearGradient
        colors={['#000', 'transparent']}
        style={styles.backgroundGradient}
      />
      <DrawerContentScrollView>
        <ItemDrawer
          label="Inicio"
          onPress={() => navigation.navigate('Home-Drawer')}
          iconName="home"
          type="main"
        />
        <ItemDrawer
          label="Noticias"
          onPress={() => navigation.navigate('News-Drawer')}
          iconName="newspaper-o"
          type="main"
        />
        <ItemDrawer
          label="Estadísticas"
          onPress={() => navigation.navigate('Stats-Drawer')}
          iconName="pie-chart"
          type="main"
        />
        <View>
          <View style={styles.divider} />
          <ItemDrawer
            label="Compartir"
            onPress={onShare}
            iconName="share-alt"
          />
          <View style={styles.divider} />
          <ItemDrawer
            label="Nosotros"
            onPress={() => navigation.navigate('About-Drawer')}
            iconName="users"
          />
          <ItemDrawer
            label="Contacto"
            onPress={() => navigation.navigate('Contact-Drawer')}
            iconName="at"
          />
          <ItemDrawer
            label="Privacidad"
            onPress={() => navigation.navigate('Privacy-Drawer')}
            iconName="shield"
          />
          <ItemDrawer
            label="Aviso Legal"
            onPress={() => navigation.navigate('DMCA-Drawer')}
            iconName="legal"
          />
        </View>
      </DrawerContentScrollView>

      <Text style={[{textAlign: 'right'}, styles.versionText]}>
        v{appVersion}
      </Text>

      <FooterSocialLinks socialLinks={socialLinks} />

    </View>
  );
};

const styles = StyleSheet.create({
  DrawerWrapper: {
    flex: 1,
    backgroundColor: '#001e39',
  },
  ItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ItemLabel: {
    color: '#fff',
    marginLeft: 10,
    textTransform: 'uppercase',
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.1,
    marginBottom: 10,
    marginTop: 10,
  },
  versionText: {
    fontStyle: 'italic',
    color: '#fff',
    opacity: 0.7,
    padding: 16,
  },
  backgroundGradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  SocialButtonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  SocialButtonText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#001e39',
  },
  imageBackground: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
});

export default CustomDrawerContent;
