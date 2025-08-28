import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryFlag from 'react-native-country-flag';
import { useNavigation } from '@react-navigation/native';

const LeaguesList = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={{ width: '100%', paddingLeft: 5 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginBottom: 16 }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate('news')}
          >
            <LinearGradient
              colors={['#00371b', '#000']}
              style={styles.background}
            />
            <View style={styles.buttonWrap}>
              <CountryFlag isoCode={item.isoCode} size={35} />
              <View style={{ marginLeft: 5 }}>
                <Text style={{ color: '#00a751' }}>{item.leagueType}</Text>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {item.leagueName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  button: {
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00cc63',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
};

export default LeaguesList;
