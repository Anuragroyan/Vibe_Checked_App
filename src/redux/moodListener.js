import {saveMoods} from '../utils/moodStorage';

export const persistMoods = store => next => action => {
  const result = next(action);

  const moodActions = [
    'moods/addMood',
    'moods/updateMood',
    'moods/deleteMood',
    'moods/setMoods',
    'moods/clearMoods',
  ];

  if (moodActions.includes(action.type)) {
    const moods = store.getState().moods.moods;

    saveMoods(moods).catch(error => {
      console.log('Mood persistence error:', error);
    });
  }

  return result;
};