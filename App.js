import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  LogBox
} from 'react-native';

LogBox.ignoreAllLogs.apply(); 

import {Provider, useDispatch} from 'react-redux';
import store from './src/redux/store';
import {setMoods} from './src/redux/moodSlice';
import {loadMoods} from './src/utils/moodStorage';
import AppNavigator from './src/navigation/AppNavigator';

const AppInitializer = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedMoods = await loadMoods();

        dispatch(
          setMoods(
            Array.isArray(storedMoods)
              ? storedMoods
              : [],
          ),
        );
      } catch (error) {
        console.log(
          'App initialization error:',
          error,
        );

        dispatch(setMoods([]));
      } finally {
        setIsReady(true);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (!isReady) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.logo}>
          🌈
        </Text>

        <Text style={styles.title}>
          VibeCheck
        </Text>

        <ActivityIndicator
          size="small"
          color="#2563EB"
          style={styles.loader}
        />

        <Text style={styles.loadingText}>
          Loading your vibes...
        </Text>
      </SafeAreaView>
    );
  }

  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
};

export default App;


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 50,
  },

  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#2563EB',
  },

  loader: {
    marginTop: 25,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#64748B',
  },
});