import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import openActions from '@utils/openActions';

const FooterSocialLinks = ({socialLinks}) => {
  if (!socialLinks || !Array.isArray(socialLinks)) return null;

  const goToScreen = openActions();

  return (
    <>
      <View style={styles.SocialButtonContainer}>
        {socialLinks.map((link, index) => {
          const {title, styled, action} = link;
          const {icon, iconType, bgColor, textColor} = styled;

          return (
            <TouchableOpacity
              key={index}
              style={{width: `${100 / socialLinks.length}%`}}
              onPress={() => goToScreen[action.type]?.(action.value)}>
              <Text
                style={[
                  {backgroundColor: bgColor || '#001e39', color: textColor || '#fff'},
                  styles.SocialButtonText,
                ]}>
                {iconType === 'image' ? (
                  <Image
                    source={{uri: icon}}
                    style={{width: 15, height: 15}}
                    resizeMode="contain"
                  />
                ) : (
                  <Icon name={icon} />
                )}{' '}
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text
        style={[
          {textAlign: 'center', backgroundColor: '#001e39'},
          styles.versionText,
        ]}>
        <Icon name="chevron-up" /> Únete a la conversación{' '}
        <Icon name="chevron-up" />
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  SocialButtonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  SocialButtonText: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#001e39',
  },
  versionText: {
    fontStyle: 'italic',
    color: '#fff',
    opacity: 0.7,
    padding: 16,
  },
});

export default FooterSocialLinks;
