import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import ScreenLoading from '@screens/Loading/Screen';

const leagues = [
  { id: 743, name: 'Liga MX' },
  { id: 8, name: 'Premier League' },
  { id: 82, name: 'Bundesliga' },
  { id: 2, name: 'Champions' },
  { id: 564, name: 'LaLiga' },
  { id: 384, name: 'Serie A' },
  { id: 301, name: 'Ligue 1' },
  { id: 746, name: 'Copa MX' },
  { id: 779, name: 'MLS' },
];

// 🔹 Componente memoizado para evitar re-render
const LeagueOption = memo(({ league, onSelect, selectedLeague }) => {
  const isActive = league.id === selectedLeague.id;
  return (
    <Pressable
      style={[styles.option, isActive && { backgroundColor: '#00316922' }]}
      disabled={isActive}
      onPress={() => onSelect(league)}
    >
      <Text
        style={[
          styles.optionText,
          isActive && { style: 'italic', fontWeight: 'bold', color: '#ffbf00ff' },
        ]}
      >
        {league.name}
        {isActive && ' *'}
      </Text>
    </Pressable>
  );
});

const WebViewStats = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(leagues[0]);

  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  const getWebViewUrl = useCallback(
    leagueId =>
      `https://www.scoreaxis.com/widget/standings-widget/${leagueId}?borderColor=%23ca1300&removeBorders=1&widgetHomeAwayTabs=0&teamsLogo=1&header=0&widgetRows=1,1,1,1,1,1,1,1,1,1&bodyBackground=%23320500&textColor=%23fff&lang=es&links=0&font=10&fontSize=18&inst=8405f`,
    [],
  );

  const handleLeagueSelect = useCallback(
    league => {
      if (league.id === selectedLeague.id) {
        // Si se selecciona la misma liga, no hacer nada
        setShowModal(false);
        return;
      }
      setSelectedLeague(league);
      setShowModal(false);
      setLoading(true);
      fadeAnim.setValue(0);
    },
    [selectedLeague, fadeAnim],
  );

  const handleModalToggle = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const handleWebViewLoad = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setLoading(false);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Loader a pantalla completa */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ScreenLoading />
        </View>
      )}

      {/* Dropdown con diseño mejorado */}
      <Pressable style={styles.dropdown} onPress={handleModalToggle}>
        <Text style={styles.dropdownText}>{selectedLeague.name}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </Pressable>

      {/* Modal con estilo y animación */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={handleModalToggle}
      >
        <Pressable style={styles.modalBackdrop} onPress={handleModalToggle}>
          <View style={styles.modalContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 30 }}
            >
              {leagues.map(league => (
                <LeagueOption
                  key={league.id}
                  league={league}
                  selectedLeague={selectedLeague}
                  onSelect={handleLeagueSelect}
                />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* WebView con animación de fade */}
      <Animated.View style={[styles.webviewContainer, { opacity: fadeAnim }]}>
        <WebView
          style={styles.webview}
          source={{ uri: getWebViewUrl(selectedLeague.id) }}
          onLoad={handleWebViewLoad}
          startInLoadingState={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2d0000ff' },

  dropdown: {
    backgroundColor: '#000000ff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#690000ff',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dropdownIcon: {
    color: '#bd3333ff',
    fontSize: 16,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#6a0000ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#9f0000ff',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
    color: '#c2dfffff',
  },

  webviewContainer: { flex: 1 },
  webview: { flex: 1, backgroundColor: '#000' },

  loadingOverlay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default WebViewStats;
