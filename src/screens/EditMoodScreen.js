import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {updateMood} from '../redux/moodSlice';

// =====================================================
// OPTIONS
// =====================================================

const EMOJIS = [
  '😊',
  '😄',
  '😌',
  '😍',
  '😎',
  '🤩',
  '🥳',
  '😐',
  '🤔',
  '😴',
  '😢',
  '😔',
  '😡',
];

const COLORS = [
  '#FFD166',
  '#06D6A0',
  '#118AB2',
  '#EF476F',
  '#8338EC',
  '#FF9F1C',
  '#2EC4B6',
  '#FF6B6B',
];

// =====================================================
// SCREEN
// =====================================================

const EditMoodScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {mood} = route.params;

  const [selectedEmoji, setSelectedEmoji] =
    useState(mood.emoji);

  const [selectedColor, setSelectedColor] =
    useState(mood.color);

  const [phrase, setPhrase] =
    useState(mood.phrase);

  // =====================================================
  // WORD COUNT
  // =====================================================

  const getWordCount = text => {
    const trimmed = text.trim();

    if (!trimmed) {
      return 0;
    }

    return trimmed
      .split(/\s+/)
      .filter(Boolean).length;
  };

  const wordCount = getWordCount(phrase);

  const isValidPhrase = wordCount === 3;

  // =====================================================
  // PHRASE CHANGE
  // =====================================================

  const handlePhraseChange = text => {
    setPhrase(text);
  };

  // =====================================================
  // UPDATE MOOD
  // =====================================================

  const handleUpdate = () => {
    const cleanPhrase = phrase.trim();

    const words = cleanPhrase
      .split(/\s+/)
      .filter(Boolean);

    if (words.length !== 3) {
      Alert.alert(
        'Invalid Phrase',
        'Please enter exactly 3 words.',
      );
      return;
    }

    const updatedMood = {
      id: mood.id,

      emoji: selectedEmoji,

      color: selectedColor,

      phrase: words.join(' '),

      // Keep original timestamp
      timestamp: mood.timestamp,
    };

    dispatch(updateMood(updatedMood));

    Alert.alert(
      'Vibe Updated',
      'Your mood check-in has been updated successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    navigation.goBack();
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>

          <Text style={styles.title}>
            Edit Your Vibe
          </Text>

          <Text style={styles.subtitle}>
            Update your mood check-in
          </Text>

        </View>

        {/* ================================================= */}
        {/* PREVIEW */}
        {/* ================================================= */}

        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: selectedColor,
            },
          ]}>

          <View style={styles.previewTop}>

            <Text style={styles.previewEmoji}>
              {selectedEmoji}
            </Text>

            <View style={styles.previewBadge}>
              <Text style={styles.previewBadgeText}>
                PREVIEW
              </Text>
            </View>

          </View>

          <Text style={styles.previewPhrase}>
            {phrase.trim() || 'Your three words'}
          </Text>

          <Text style={styles.previewTime}>
            🕐 Original check-in time
          </Text>

        </View>

        {/* ================================================= */}
        {/* EMOJI */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            How are you feeling?
          </Text>

          <View style={styles.emojiGrid}>

            {EMOJIS.map(emoji => {

              const selected =
                selectedEmoji === emoji;

              return (
                <TouchableOpacity
                  key={emoji}
                  activeOpacity={0.7}
                  onPress={() =>
                    setSelectedEmoji(emoji)
                  }
                  style={[
                    styles.emojiButton,
                    selected &&
                      styles.selectedEmojiButton,
                  ]}>

                  <Text style={styles.emoji}>
                    {emoji}
                  </Text>

                </TouchableOpacity>
              );
            })}

          </View>

        </View>

        {/* ================================================= */}
        {/* COLOR */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Pick your vibe color
          </Text>

          <View style={styles.colorGrid}>

            {COLORS.map(color => {

              const selected =
                selectedColor === color;

              return (
                <TouchableOpacity
                  key={color}
                  activeOpacity={0.7}
                  onPress={() =>
                    setSelectedColor(color)
                  }
                  style={[
                    styles.colorButton,
                    {
                      backgroundColor: color,
                    },
                    selected &&
                      styles.selectedColorButton,
                  ]}>

                  {selected && (
                    <Text style={styles.check}>
                      ✓
                    </Text>
                  )}

                </TouchableOpacity>
              );
            })}

          </View>

        </View>

        {/* ================================================= */}
        {/* PHRASE */}
        {/* ================================================= */}

        <View style={styles.section}>

          <View style={styles.phraseHeader}>

            <Text style={styles.sectionTitle}>
              Describe your vibe
            </Text>

            <Text
              style={[
                styles.wordCount,
                isValidPhrase &&
                  styles.validWordCount,
              ]}>

              {wordCount}/3

            </Text>

          </View>

          <TextInput
            style={styles.input}
            value={phrase}
            onChangeText={handlePhraseChange}
            placeholder="e.g. Feeling really good"
            placeholderTextColor="#94A3B8"
            maxLength={60}
            autoCapitalize="sentences"
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.helperText}>
            Your vibe must contain exactly 3 words.
          </Text>

        </View>

        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isValidPhrase}
          style={[
            styles.updateButton,
            !isValidPhrase &&
              styles.disabledButton,
          ]}
          onPress={handleUpdate}>

          <Text style={styles.updateButtonText}>
            ✓ Update Vibe
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cancelButton}
          onPress={handleCancel}>

          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default EditMoodScreen;

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },

  // ===================================================
  // PREVIEW
  // ===================================================

  previewCard: {
    minHeight: 190,
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,

    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 4,
  },

  previewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  previewEmoji: {
    fontSize: 52,
  },

  previewBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  previewBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  previewPhrase: {
    marginTop: 15,
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  previewTime: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ===================================================
  // SECTION
  // ===================================================

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 13,
  },

  // ===================================================
  // EMOJI
  // ===================================================

  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  emojiButton: {
    width: '15%',
    aspectRatio: 1,
    marginBottom: 10,

    borderRadius: 15,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  selectedEmojiButton: {
    borderWidth: 2,
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  emoji: {
    fontSize: 26,
  },

  // ===================================================
  // COLORS
  // ===================================================

  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },

  colorButton: {
    width: 52,
    height: 52,

    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'transparent',
  },

  selectedColorButton: {
    borderColor: '#0F172A',
    transform: [
      {
        scale: 1.08,
      },
    ],
  },

  check: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ===================================================
  // PHRASE
  // ===================================================

  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wordCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },

  validWordCount: {
    color: '#16A34A',
  },

  input: {
    minHeight: 110,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#CBD5E1',

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 15,

    fontSize: 16,
    color: '#0F172A',

    textAlignVertical: 'top',
  },

  helperText: {
    marginTop: 7,
    fontSize: 12,
    color: '#64748B',
  },

  // ===================================================
  // UPDATE BUTTON
  // ===================================================

  updateButton: {
    height: 56,

    borderRadius: 17,

    backgroundColor: '#2563EB',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 5,
  },

  disabledButton: {
    opacity: 0.45,
  },

  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  // ===================================================
  // CANCEL
  // ===================================================

  cancelButton: {
    height: 56,

    borderRadius: 17,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 12,

    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  cancelButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '700',
  },

});