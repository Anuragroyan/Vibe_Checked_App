import {createSelector} from '@reduxjs/toolkit';


export const selectMoods = state =>
  state.moods.moods;

export const selectMoodCount = createSelector(
  [selectMoods],
  moods => moods.length,
);

export const selectTodayMoodCount =
  createSelector(
    [selectMoods],
    moods => {
      const today = new Date();

      return moods.filter(mood => {
        const moodDate = new Date(
          mood.timestamp,
        );

        return (
          moodDate.getDate() === today.getDate() &&
          moodDate.getMonth() === today.getMonth() &&
          moodDate.getFullYear() ===
            today.getFullYear()
        );
      }).length;
    },
  );


export const selectMoodDistribution =
  createSelector(
    [selectMoods],
    moods => {
      const distribution = {};

      moods.forEach(mood => {
        if (distribution[mood.emoji]) {
          distribution[mood.emoji] += 1;
        } else {
          distribution[mood.emoji] = 1;
        }
      });

      return distribution;
    },
  );


export const selectMostCommonMood =
  createSelector(
    [selectMoodDistribution],
    distribution => {
      const entries =
        Object.entries(distribution);

      if (entries.length === 0) {
        return null;
      }

      entries.sort(
        (a, b) => b[1] - a[1],
      );

      return {
        emoji: entries[0][0],
        count: entries[0][1],
      };
    },
  );


export const selectColorDistribution =
  createSelector(
    [selectMoods],
    moods => {
      const distribution = {};

      moods.forEach(mood => {
        if (distribution[mood.color]) {
          distribution[mood.color] += 1;
        } else {
          distribution[mood.color] = 1;
        }
      });

      return distribution;
    },
  );

export const selectMostCommonColor =
  createSelector(
    [selectColorDistribution],
    distribution => {
      const entries =
        Object.entries(distribution);

      if (entries.length === 0) {
        return null;
      }

      entries.sort(
        (a, b) => b[1] - a[1],
      );

      return {
        color: entries[0][0],
        count: entries[0][1],
      };
    },
  );