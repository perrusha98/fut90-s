import React from 'react';
import {FlatList} from 'react-native';
import EventItem from '../item';
import EventListSkeleton from './Skeleton';

const EventList = ({events, loading}) => {
  if (loading) {
    return <EventListSkeleton />;
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <EventItem item={item} />}
      horizontal={events.length !== 1}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={4} // Renderizar inicialmente 4 elementos
      maxToRenderPerBatch={4} // Máximo de elementos a renderizar por lote
      windowSize={5} // Precargar elementos cercanos (2 antes y 2 después)
    />
  );
};

export default EventList;
