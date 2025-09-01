import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Image, View, Text, StyleSheet, } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import analytics from '@react-native-firebase/analytics';

// Screens
import HomeScreen from '@screens/_main/home';
import LiveScreen from '@screens/_main/live';
import ChatScreen from '@screens/_main/chat';
import NewsScreen from '@screens/_main/news';
import DetailScreen from '@screens/_main/news/PostDetail';

import StatsScreen from '@screens/_main/stats';

import aboutScreen from '@screens/misc/about-us';
import contactScreen from '@screens/misc/contact-us';
import dmcaScreen from '@screens/misc/dmca';
import privacyScreen from '@screens/misc/privacy';

import Orientation from 'react-native-orientation-locker';


const HomeStack = createNativeStackNavigator();
const NewsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStacked() {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
    >
      <HomeStack.Screen name="Home-Stack" component={HomeScreen} />
      <HomeStack.Screen name="Live-Stack" component={LiveScreen} />
      <HomeStack.Screen name="Stats-Stack" component={StatsScreen} />
      <HomeStack.Screen name="About-Stack" component={aboutScreen} />
      <HomeStack.Screen name="Contact-Stack" component={contactScreen} />
      <HomeStack.Screen name="DMCA-Stack" component={dmcaScreen} />
      <HomeStack.Screen name="Privacy-Stack" component={privacyScreen} />
    </HomeStack.Navigator>
  );
}

const NewsStacked = () => {
  return (
    <NewsStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
    >
      <NewsStack.Screen name="News-Stack" component={NewsScreen} />
      <NewsStack.Screen name="Details-Stack" component={DetailScreen} />
    </NewsStack.Navigator>
  );
};


function BottomTabs({currentRouteName}) {

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home-Tab"
      screenOptions={{
        tabBarBackground: () => (
          <LinearGradient
            colors={['#bc0000', '#560000']}
            style={{
              height: '100%',
              opacity: 0.9,
            }}
          />
        ),
        tabBarActiveBackgroundColor: 'rgba(0,0,0,.2)',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: true, // Mostrar etiquetas por defecto

        tabBarStyle: [
          {
            display: currentRouteName === 'Live-Stack' ? 'none' : 'flex',
            backgroundColor: '#000',
            borderColor: '#000000',
            border: 1,
            height: 50,
          },
        ],
      }}
    >
      <Tab.Screen
        name="News-Tab"
        component={NewsStacked}
        options={{
          tabBarLabel: 'NOTICIAS',
          unmountOnBlur: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@assets/icons/cancha.png')}
              style={{
                width: 35,
                height: 35,
                tintColor: color,
                resizeMode: 'contain',
              }}
            />
          ),
          tabBarLabelStyle: { fontSize: 10, margin: -2, fontWeight: 'bold' },
        }}
      />

      <Tab.Screen
        name="Home-Tab"
        component={HomeStacked}
        options={{
          tabBarLabel: '',
          unmountOnBlur: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <>
              <Image
                source={require('@assets/logo/ball-white.png')}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                  marginBottom: -8,
                }}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Chat-Tab"
        component={ChatScreen}
        options={{
          tabBarLabel: 'CHAT',
          unmountOnBlur: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ width: 35, height: 35, alignItems: 'center' }}>
              <Icon name="comments" size={30} color={color} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>7</Text>
                </View>
            </View>
          ),
          tabBarLabelStyle: { fontSize: 10, margin: -2, fontWeight: 'bold' },
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const [currentRouteName, setCurrentRouteName] = useState();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const name = navigationRef.current?.getCurrentRoute()?.name;
        routeNameRef.current = name;
        setCurrentRouteName(name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const name = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== name) {
          await analytics().logScreenView({
            screen_name: name,
            screen_class: name,
          });
        }
        routeNameRef.current = name;
        setCurrentRouteName(name);
      }}>
      <BottomTabs currentRouteName={currentRouteName} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -3,
    top: -0,
    backgroundColor: '#007c15',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
