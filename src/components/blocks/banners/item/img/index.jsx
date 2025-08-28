import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingImage = ({imageUrl, onLoad}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      )}
      <Image
        style={styles.banner}
        source={{uri: imageUrl}}
        resizeMode="contain"
        onLoad={() => {
          setLoading(false);
          onLoad();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    aspectRatio: 16 / 6,
    width: '100%',
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoadingImage;
