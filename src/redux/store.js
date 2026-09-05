import {configureStore} from '@reduxjs/toolkit';

import moodReducer from './moodSlice';
import {persistMoods} from './moodListener';

const store = configureStore({
  reducer: {
    moods: moodReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: true,
    }).concat(persistMoods),
});

export default store;