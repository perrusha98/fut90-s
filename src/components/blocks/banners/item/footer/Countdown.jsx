import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LiveStatus from './LiveStatus';

const MatchCountdown = ({timeRemaining, isFutureDate, textColor}) => {
  if (!isFutureDate) {
    return <LiveStatus />;
  }

  return (
    <View style={[styles.countdownContainer, {color: textColor}]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="clock-o" size={25} color={textColor} />
      </View>
      <Text style={[styles.time, {color: textColor}]}>{timeRemaining.days}d</Text>
      <Text style={[styles.time, {color: textColor}]}>{timeRemaining.hours}h</Text>
      <Text style={[styles.time, {color: textColor}]}>{timeRemaining.minutes}m</Text>
      <Text style={[styles.time, {color: textColor}]}>{timeRemaining.seconds}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default MatchCountdown;
