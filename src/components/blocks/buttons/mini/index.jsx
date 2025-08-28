import React from 'react';
import {Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import openActions from '@utils/openActions';

const MiniButtons = ({buttons}) => {
  if (!buttons || !buttons.length) {
    return null;
  }

  const goToScreen = openActions();

  const renderButton = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={styles.button}
      onPress={() => goToScreen[item.action.type]?.(item.action.value)}
      activeOpacity={0.8}>
      {item.icon && <Icon name={item.icon} size={16} style={styles.icon} />}
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.flatList}
      data={buttons}
      renderItem={renderButton}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#a60000',
    borderBottomColor: '#a60000',
    borderBottomWidth: 5,
    borderTopColor: '#a60000',
    borderTopWidth: 3,
    flex: 1,
  },
  container: {
    // Puedes agregar estilos aquí si es necesario
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    marginRight: 3,
    paddingVertical: 3,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
    color: '#fff',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default MiniButtons;
