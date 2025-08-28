import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const ScreenLoading = () => {
  const animation = useRef(null);

  return (
    <View style={styles.container}>
      <LinearGradient
       colors={["#390000", "#000", "#390000"]}
        style={styles.background}
        locations={[0.25, 0.5, 0.8]}
      />
      <LottieView
        source={require('@assets/lottie/loading.json')}
        style={{ pointerEvents: 'none', width: 200, height: 150 }}
        autoPlay={true}
        loop={true}
        ref={animation}
        resizeMode="cover"
      />
      <Text style={styles.text}> Cargando... </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#390000',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default ScreenLoading;
