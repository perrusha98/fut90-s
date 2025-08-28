import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

const EventListSkeleton = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={item => item.toString()}
      renderItem={() => (
        <View style={styles.button}>
          <View style={styles.buttonWrap}>
            <View style={styles.placeholderTitle} />
            <View style={styles.placeholderText} />
            <View style={styles.placeholderText} />
          </View>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 8,
    padding: 10,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: '#212121',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  buttonWrap: {
    flexDirection: 'column',
  },
  placeholderTitle: {
    width: '100%',
    minWidth: 100,
    height: 10,
    backgroundColor: '#414141',
    marginBottom: 5,
  },
  placeholderText: {
    maxWidth: '80%',
    height: 10,
    backgroundColor: '#414141',
    marginTop: 5,
  },
});

export default EventListSkeleton;
