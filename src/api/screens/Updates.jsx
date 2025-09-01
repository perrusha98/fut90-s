import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const UpdateScreen = ({settings}) => {
  const openLink = url => {
    Linking.openURL(url);
  };

  const settingsUpdate = settings.screen_settings.update;
  const style = settingsUpdate.style || {};
  
  const logoSource = style.logo?.useExternal && style.logo?.imageUrl
    ? { uri: style.logo.imageUrl }
    : require('@assets/icon.png');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={style.colors.background.gradient}
        style={styles.background}
        locations={style.colors.background.locations}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
      />
      <View style={styles.content}>
        <Image 
          source={logoSource} 
          style={[
            styles.logo,
            {
              borderColor: style.logo.borderColor,
              borderWidth: style.logo.borderWidth,
            }
          ]} 
        />

        <>
          <Text style={[styles.title, { color: style.colors.title }]}>
            {settingsUpdate.title}
          </Text>
          <Text style={[styles.message, { color: style.colors.description }]}>
            {settingsUpdate.description}
          </Text>
          {settingsUpdate.button_text !== '' ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: style.colors.button.background }]}
              onPress={() => openLink(settingsUpdate.button_url)}>
              <Text style={[styles.buttonText, { color: style.colors.button.text }]}>
                {settingsUpdate.button_text}
              </Text>
            </TouchableOpacity>
          ) : null}
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 100,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playstore: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default UpdateScreen;
