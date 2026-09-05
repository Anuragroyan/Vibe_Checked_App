import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CheckInScreen from '../screens/CheckInScreen';
import HistoryScreen from '../screens/HistoryScreen';
import EditMoodScreen from '../screens/EditMoodScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },

          headerTintColor: '#0F172A',

          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '700',
          },

          headerShadowVisible: false,

          contentStyle: {
            backgroundColor: '#F8FAFC',
          },

          gestureEnabled: true,
        }}>

        {/* ============================================= */}
        {/* HOME */}
        {/* ============================================= */}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* ============================================= */}
        {/* CHECK IN */}
        {/* ============================================= */}

        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{
            title: 'Check In',
          }}
        />

        {/* ============================================= */}
        {/* HISTORY */}
        {/* ============================================= */}

        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'Mood History',
          }}
        />

        {/* ============================================= */}
        {/* EDIT MOOD */}
        {/* ============================================= */}

        <Stack.Screen
          name="EditMood"
          component={EditMoodScreen}
          options={{
            title: 'Edit Vibe',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;