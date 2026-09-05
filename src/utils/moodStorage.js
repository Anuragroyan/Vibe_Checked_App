import AsyncStorage from '@react-native-async-storage/async-storage';

const MOODS_KEY = '@vibecheck_moods';


export const saveMoods = async moods => {
  try {
    if (!Array.isArray(moods)) {
      throw new Error('Moods must be an array');
    }

    await AsyncStorage.setItem(
      MOODS_KEY,
      JSON.stringify(moods),
    );
  } catch (error) {
    console.log(
      'Save moods error:',
      error,
    );
  }
};

export const loadMoods = async () => {
  try {
    const storedMoods =
      await AsyncStorage.getItem(
        MOODS_KEY,
      );

    if (!storedMoods) {
      return [];
    }

    const parsedMoods =
      JSON.parse(storedMoods);

    if (!Array.isArray(parsedMoods)) {
      console.log(
        'Stored moods data is invalid.',
      );

      return [];
    }

    return parsedMoods;
  } catch (error) {
    console.log(
      'Load moods error:',
      error,
    );

    return [];
  }
};

export const clearStoredMoods =
  async () => {
    try {
      await AsyncStorage.removeItem(
        MOODS_KEY,
      );
    } catch (error) {
      console.log(
        'Clear stored moods error:',
        error,
      );
    }
  };

export const hasStoredMoods =
  async () => {
    try {
      const storedMoods =
        await AsyncStorage.getItem(
          MOODS_KEY,
        );

      return storedMoods !== null;
    } catch (error) {
      console.log(
        'Check stored moods error:',
        error,
      );

      return false;
    }
  };