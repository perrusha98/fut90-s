import React, { useState, useRef, useContext, useEffect } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";

import Banner from "./item";
import ApiDataContext from "@api/StartUp/context";

const NextEvents = () => {
  // Usar estado para el ancho de la pantalla
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const flatListRef = useRef(null);
  const { apiData } = useContext(ApiDataContext);
  const settings = apiData.screen_settings;
  const banners = settings?.home?.blocks?.banners;
  const autoscroll = settings?.home?.blocks?.banners?.autoscroll || false;
  const autoscrollTime = settings?.home?.blocks?.banners?.autoscroll_time || 3000;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleNext = () => {
    if (flatListRef.current) {        
      if (currentIndex < banners.items.length - 1) {
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current.scrollToIndex({ index: 0 });
        setCurrentIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (flatListRef.current && currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Listener para cambios de dimensiones (orientación)
  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenWidth(window.width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (subscription?.remove) {
        subscription.remove();
      } else {
        // Para compatibilidad con versiones antiguas de RN
        Dimensions.removeEventListener("change", onChange);
      }
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { width: screenWidth }]}>
      <Banner 
        item={item} 
        showNext={currentIndex < banners.items.length - 1}
        showPrev={currentIndex > 0}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </View>
  );

  useEffect(() => {
    if (autoscroll) {
      const interval = setInterval(() => {
        handleNext();
      }, autoscrollTime);

      return () => clearInterval(interval);
    }
  }, [currentIndex, autoscroll]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners.items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      {/* Los controles ahora estarán en el footer */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  itemContainer: {
    // width se asigna dinámicamente en renderItem
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default NextEvents;