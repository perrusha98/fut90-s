import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import NumbersAnimation from './utils/NumbersAnimation';
import LogoImage from './logo';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';

const ScreenLoading = () => {

  useEffect(() => {
    // Reproducir el primer sonido al iniciar
    try {
      SoundPlayer.playSoundFile('binary5', 'mp3');
    } catch (error) {
      console.log('Error al reproducir sonido inicial:', error);
    }
  }, []);
 
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#520000', '#000']}
        style={styles.background}
        locations={[0, 1]}
      >
        <NumbersAnimation opacity={0.3} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 200,
            width: '100%',
          }}
        >
          <LogoImage />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenLoading;
