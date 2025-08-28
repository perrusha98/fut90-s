import React, {useRef} from 'react';
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
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#390000', '#000', '#390000']}
        style={styles.background}
        locations={[0.25, 0.5, 0.8]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
      />
      <View style={styles.content}>
        <Image source={require('@assets/icon.png')} style={styles.logo} />

        <>
          <Text style={styles.title}>{settingsUpdate.title}</Text>
          <Text style={styles.message}>{settingsUpdate.description}</Text>
          {settingsUpdate.button_text !== '' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => openLink(settingsUpdate.button_url)}>
              <Text style={styles.buttonText}>
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
    backgroundColor: '#000',
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
    borderWidth: 3,
    borderColor: '#e30000',
  },
  button: {
    backgroundColor: '#e30000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
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
    color: '#e30000',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default UpdateScreen;
