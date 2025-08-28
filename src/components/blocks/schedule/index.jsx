import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventList from './List';

const ScheduleList = ({settings}) => {
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Array de country_flags que queremos ignorar
  const flagsToIgnore = settings.blocks.schedule.exclude; 
  const apiSchedule = settings.blocks.schedule.api; 
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiSchedule);
        const data = await response.json();
        const filteredEvents = data.acf.lista_de_eventos.filter(
          event => !event.is_replay && !flagsToIgnore.includes(event.country_flag)
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(true);
      } finally {
        setLoading(false)
      }
    };

    fetchEvents();
  }, []);

  if (error || (!loading && events.length === 0)) {
    return null;
  }

  return (
    <View style={styles.AgendaWrap}>
      <View style={styles.CalendarWrap}>
        <Text style={styles.CalendarText}>
          <Icon name="calendar" />
        </Text>
      </View>
      <EventList events={events} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  AgendaWrap: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 16,
  },
  CalendarWrap: {
    backgroundColor: '#540000',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  CalendarText: {
    color: '#fff',
  },
});

export default ScheduleList;
