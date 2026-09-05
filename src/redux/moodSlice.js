import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  moods: [],
};

const moodSlice = createSlice({
  name: 'moods',

  initialState,

  reducers: {
    
    addMood: (state, action) => {
      state.moods.unshift(action.payload);
    },

  
    updateMood: (state, action) => {
      const index = state.moods.findIndex(
        mood => mood.id === action.payload.id,
      );

      if (index !== -1) {
        state.moods[index] = {
          ...state.moods[index],
          ...action.payload,
        };
      }
    },

    // Delete mood
    deleteMood: (state, action) => {
      state.moods = state.moods.filter(
        mood => mood.id !== action.payload,
      );
    },

   
    setMoods: (state, action) => {
      state.moods = Array.isArray(action.payload)
        ? action.payload
        : [];
    },


    clearMoods: state => {
      state.moods = [];
    },
  },
});

export const {
  addMood,
  updateMood,
  deleteMood,
  setMoods,
  clearMoods,
} = moodSlice.actions;

export default moodSlice.reducer;