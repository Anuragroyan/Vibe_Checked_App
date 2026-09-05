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

import {addMood} from '../redux/moodSlice';

const EMOJIS = [
  '😊',
  '😄',
  '😌',
  '😍',
  '😎',
  '🤩',
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

const CheckInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [selectedColor, setSelectedColor] = useState('#FFD166');
  const [phrase, setPhrase] = useState('');

  // =====================================================
  // WORD COUNT
  // =====================================================

  const words = phrase
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const wordCount =
    phrase.trim() === '' ? 0 : words.length;

  const isValid = wordCount === 3;

  // =====================================================
  // HANDLE PHRASE
  // =====================================================

  const handlePhraseChange = text => {
    // Remove leading spaces
    const cleanedText = text.replace(/^\s+/, '');

    if (cleanedText === '') {
      setPhrase('');
      return;
    }

    const currentWords = cleanedText
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    // Do not allow more than 3 words
    if (currentWords.length > 3) {
      return;
    }

    setPhrase(cleanedText);
  };

  // =====================================================
  // SAVE MOOD
  // =====================================================

  const handleCheckIn = () => {
    const cleanPhrase = phrase.trim();

    const finalWords = cleanPhrase
      .split(/\s+/)
      .filter(Boolean);

    // Validate exactly 3 words
    if (finalWords.length !== 3) {
      Alert.alert(
        'Exactly 3 Words',
        'Please describe your vibe using exactly 3 words.',
      );

      return;
    }

    const mood = {
      id: Date.now().toString(),
      emoji: selectedEmoji,
      color: selectedColor,
      phrase: finalWords.join(' '),
      timestamp: Date.now(),
    };

    // Add mood to Redux
    dispatch(addMood(mood));

    // Go back to Home
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>

          <Text style={styles.headerEmoji}>
            ✨
          </Text>

          <Text style={styles.title}>
            Check In Your Vibe
          </Text>

          <Text style={styles.subtitle}>
            Take a moment and capture how you feel.
          </Text>

        </View>

        {/* ================================================= */}
        {/* EMOJI */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            How are you feeling?
          </Text>

          <View style={styles.emojiContainer}>

            {EMOJIS.map(emoji => {

              const isSelected =
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
                    isSelected &&
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

          <View style={styles.colorContainer}>

            {COLORS.map(color => {

              const isSelected =
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
                    isSelected &&
                      styles.selectedColorButton,
                  ]}>

                  {isSelected && (
                    <Text style={styles.checkMark}>
                      ✓
                    </Text>
                  )}

                </TouchableOpacity>
              );
            })}

          </View>

        </View>

        {/* ================================================= */}
        {/* THREE WORD PHRASE */}
        {/* ================================================= */}

        <View style={styles.section}>

          <View style={styles.phraseHeader}>

            <Text style={styles.sectionTitle}>
              Describe it in 3 words
            </Text>

            <View
              style={[
                styles.wordCountContainer,
                isValid &&
                  styles.validWordCountContainer,
              ]}>

              <Text
                style={[
                  styles.wordCount,
                  isValid &&
                    styles.validWordCount,
                ]}>

                {wordCount}/3

              </Text>

            </View>

          </View>

          <TextInput
            style={[
              styles.phraseInput,
              isValid &&
                styles.validPhraseInput,
            ]}
            placeholder="e.g. Feeling really good"
            placeholderTextColor="#94A3B8"
            value={phrase}
            onChangeText={handlePhraseChange}
            multiline
            maxLength={60}
            autoCapitalize="sentences"
            textAlignVertical="top"
          />

          <Text
            style={[
              styles.helperText,
              isValid &&
                styles.validHelperText,
            ]}>

            {isValid
              ? '✓ Perfect! Your vibe is ready.'
              : 'Enter exactly three words.'}

          </Text>

        </View>

        {/* ================================================= */}
        {/* PREVIEW */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Preview
          </Text>

          <View
            style={[
              styles.previewCard,
              {
                backgroundColor:
                  selectedColor,
              },
            ]}>

            <View style={styles.previewTop}>

              <Text style={styles.previewEmoji}>
                {selectedEmoji}
              </Text>

              <View style={styles.previewBadge}>

                <Text style={styles.previewBadgeText}>
                  YOUR VIBE
                </Text>

              </View>

            </View>

            <Text style={styles.previewPhrase}>
              {phrase.trim() || 'Your three words'}
            </Text>

            <Text style={styles.previewTime}>
              🕐 Just now
            </Text>

          </View>

        </View>

        {/* ================================================= */}
        {/* SAVE BUTTON */}
        {/* ================================================= */}

        <TouchableOpacity
          style={[
            styles.checkInButton,
            !isValid &&
              styles.disabledButton,
          ]}
          activeOpacity={0.8}
          disabled={!isValid}
          onPress={handleCheckIn}>

          <Text style={styles.checkInButtonText}>
            ✓ Save My Vibe
          </Text>

        </TouchableOpacity>

        {/* ================================================= */}
        {/* CANCEL */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>

          <Text style={styles.cancelText}>
            Cancel
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default CheckInScreen;

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  headerEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },

  // ===================================================
  // SECTION
  // ===================================================

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },

  // ===================================================
  // EMOJI
  // ===================================================

  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  emojiButton: {
    width: '15%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  selectedEmojiButton: {
    borderWidth: 3,
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  emoji: {
    fontSize: 27,
  },

  // ===================================================
  // COLORS
  // ===================================================

  colorContainer: {
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

  checkMark: {
    fontSize: 22,
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

  wordCountContainer: {
    minWidth: 45,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },

  validWordCountContainer: {
    backgroundColor: '#DCFCE7',
  },

  wordCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  validWordCount: {
    color: '#16A34A',
  },

  phraseInput: {
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

  validPhraseInput: {
    borderColor: '#22C55E',
    borderWidth: 2,
  },

  helperText: {
    marginTop: 7,
    fontSize: 12,
    color: '#64748B',
  },

  validHelperText: {
    color: '#16A34A',
    fontWeight: '600',
  },

  // ===================================================
  // PREVIEW
  // ===================================================

  previewCard: {
    minHeight: 190,
    borderRadius: 22,
    padding: 22,
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
    alignItems: 'center',
  },

  previewEmoji: {
    fontSize: 48,
  },

  previewBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  previewBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  previewPhrase: {
    marginTop: 20,
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  previewTime: {
    marginTop: 15,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ===================================================
  // SAVE BUTTON
  // ===================================================

  checkInButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 5,
  },

  disabledButton: {
    backgroundColor: '#CBD5E1',
  },

  checkInButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  // ===================================================
  // CANCEL
  // ===================================================

  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 5,
  },

  cancelText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
  },

});