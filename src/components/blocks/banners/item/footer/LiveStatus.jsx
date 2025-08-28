import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LiveStatus = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.containerPasado}>
      <Animated.View style={[styles.iconContainer, {transform: [{translateX: bounceAnim}]}]}>
        <Icon name="play-circle" size={25} color="#f00F" />
      </Animated.View>
      <Text style={styles.titleLive}>EN DIRECTO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLive: {
    color: '#f00',
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 10,
  },
  containerPasado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    marginRight: 5,
  },
});

export default LiveStatus;
