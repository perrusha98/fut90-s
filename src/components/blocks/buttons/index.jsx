import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import openActions from '@utils/openActions';
import DropShadow from 'react-native-drop-shadow';

const AnimatedDropShadow = Animated.createAnimatedComponent(DropShadow);

const RadarAnimated = () => (
  <LottieView
    source={require('@assets/lottie/radar.json')}
    style={styles.radarAnimation}
    autoPlay
    loop
    resizeMode="cover"
  />
);

const renderIcon = (iconName, textColor) => {
  if (iconName === 'radar') {
    return <RadarAnimated />;
  }
  return <Icon name={iconName} size={30} color={textColor} />;
};

const AnimatedShadow = ({children, shadowColor, shadowRadius}) => (
  <AnimatedDropShadow
    style={{
      shadowColor,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius,
      width: '48%',
    }}>
    {children}
  </AnimatedDropShadow>
);

const Button = ({button}) => {
  const {
    style: {glow, bgColor, bgColor2, textColor, borderColor,},
    icon,
    title,
    action,
  } = button;

  const shadowRadius = useRef(new Animated.Value(glow.enabled ? 3 : 0)).current;

  useEffect(() => {
    if (glow.enabled && glow.animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shadowRadius, {
            toValue: 8,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(shadowRadius, {
            toValue: 3,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [glow.enabled, glow.animated]);

  const goToScreen = openActions();
  
  return (
    <AnimatedShadow shadowColor={glow.color} shadowRadius={shadowRadius}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.buttonContainer, {borderColor}]}
        onPress={() => goToScreen[action.type]?.(action.value)}>
        <LinearGradient
          colors={[bgColor, bgColor2]}
          style={styles.background}
          locations={[0.3, 9]}
        />
        <View style={styles.textContainer}>
          {renderIcon(icon, textColor)}
          <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </AnimatedShadow>
  );
};

const Buttons = ({buttons}) => {
        
  return (
    <View style={styles.buttonRow}>
      {buttons.map((button, index) => (
        <Button key={index} button={button} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#212121',
    borderRadius: 4,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  buttonText: {
    // Renombrado desde buttonTextLive
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  radarAnimation: {
    height: 25,
    pointerEvents: 'none',
    width: 25,
  },
  textContainer: {
    // Renombrado desde TextWrapped
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
});

export default Buttons;
