import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MoodTile = ({mood, onDelete, onPress}) => {
  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleTimeString(
      'en-IN',
      {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      },
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress && onPress(mood)}
      style={[
        styles.tile,
        {
          backgroundColor: mood.color,
        },
      ]}>

      {/* Top Row */}

      <View style={styles.topRow}>

        <Text style={styles.emoji}>
          {mood.emoji}
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={event => {
            event.stopPropagation();
            onDelete(mood.id);
          }}>

          <Text style={styles.deleteIcon}>
            ×
          </Text>

        </TouchableOpacity>

      </View>

      {/* Phrase */}

      <Text
        style={styles.phrase}
        numberOfLines={2}>

        {mood.phrase}

      </Text>

      {/* Time */}

      <Text style={styles.time}>
        {formatTime(mood.timestamp)}
      </Text>

    </TouchableOpacity>
  );
};

export default MoodTile;

const styles = StyleSheet.create({

  tile: {
    width: '48%',
    minHeight: 155,

    borderRadius: 20,

    padding: 16,

    marginBottom: 14,

    justifyContent: 'space-between',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.12,

    shadowRadius: 6,

    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  emoji: {
    fontSize: 40,
  },

  deleteButton: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: 'rgba(255,255,255,0.3)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 23,
  },

  phrase: {
    marginTop: 12,

    fontSize: 16,

    lineHeight: 21,

    fontWeight: '800',

    color: '#FFFFFF',
  },

  time: {
    marginTop: 10,

    fontSize: 11,

    fontWeight: '600',

    color: 'rgba(255,255,255,0.85)',
  },

});