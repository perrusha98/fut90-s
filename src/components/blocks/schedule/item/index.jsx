import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocalDate from '@components/localDate';

const EventItem = ({item}) => (
  <View style={[styles.button, item.length === 1 && styles.singleButton]}>
    <View style={styles.buttonWrap}>
      <Text style={styles.TitleText}>{item.match_title}</Text>
      <View style={styles.LeagueWrap}>
        <Image
          source={{uri: `https://i.imgur.com/${item.country_flag}.png`}}
          style={styles.flagIcon}
        />
        <Text style={styles.DetailsText}> {item.match_league}</Text>
      </View>
      <Text style={styles.DetailsText}>
        <Icon name="clock-o" />
        <LocalDate eventTime={item.match_hour} />
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  button: {
    marginRight: 8,
    padding: 10,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: '#210000',
    borderColor: '#4d0000',
    borderWidth: 1,
  },
  buttonWrap: {
    flexDirection: 'column',
  },
  flagIcon: {
    width: 10,
    height: 8,
    resizeMode: 'contain',
  },
  DetailsText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  TitleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  LeagueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleButton: {
    flex: 1,
  },
});

export default EventItem;
