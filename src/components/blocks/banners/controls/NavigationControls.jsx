import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavigationControls = ({
  onPress,
  direction = 'right',
  show = true,
  textColor = '#fff',
  iconSize = 20,
}) => {
  const iconName =
    direction === 'left' ? 'chevron-circle-left' : 'chevron-circle-right';

  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={show ? onPress : undefined}
        style={[styles.arrowButton, !show && styles.disabledButton]}
        disabled={!show}>
        <Text style={[styles.arrowText, {color: textColor}]}>
          {show && <Icon name={iconName} size={iconSize} />}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default NavigationControls;
