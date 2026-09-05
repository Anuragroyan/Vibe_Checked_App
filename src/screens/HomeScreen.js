import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteMood,
  clearMoods,
} from '../redux/moodSlice';

import {
  selectMoodCount,
  selectTodayMoodCount,
  selectMoodDistribution,
  selectMostCommonMood,
  selectMostCommonColor,
} from '../selectors/moodSelectors';

import MoodTile from '../components/MoodTile';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX MOODS
  // =====================================================

  const moods = useSelector(
    state => state.moods.moods,
  );

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalMoods = useSelector(
    selectMoodCount,
  );

  const todayMoods = useSelector(
    selectTodayMoodCount,
  );

  const distribution = useSelector(
    selectMoodDistribution,
  );

  const mostCommonMood = useSelector(
    selectMostCommonMood,
  );

  const mostCommonColor = useSelector(
    selectMostCommonColor,
  );

  // =====================================================
  // DELETE MOOD
  // =====================================================

  const handleDeleteMood = id => {
    Alert.alert(
      'Delete Mood',
      'Do you want to remove this mood?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',
          style: 'destructive',

          onPress: () => {
            dispatch(deleteMood(id));
          },
        },
      ],
    );
  };

  // =====================================================
  // CLEAR ALL
  // =====================================================

  const handleClearAll = () => {
    if (moods.length === 0) {
      return;
    }

    Alert.alert(
      'Clear Mood Mosaic',
      'Are you sure you want to delete all your moods?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Clear All',
          style: 'destructive',

          onPress: () => {
            dispatch(clearMoods());
          },
        },
      ],
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContainer
        }>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>

          <Text style={styles.headerEmoji}>
            🌈
          </Text>

          <Text style={styles.title}>
            VibeCheck
          </Text>

          <Text style={styles.subtitle}>
            Your mood, one moment at a time.
          </Text>

        </View>

        {/* ================================================= */}
        {/* STATISTICS */}
        {/* ================================================= */}

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>

            <Text style={styles.statEmoji}>
              🧠
            </Text>

            <Text style={styles.statNumber}>
              {totalMoods}
            </Text>

            <Text style={styles.statLabel}>
              Total Vibes
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statEmoji}>
              📅
            </Text>

            <Text style={styles.statNumber}>
              {todayMoods}
            </Text>

            <Text style={styles.statLabel}>
              Today
            </Text>

          </View>

        </View>

        {/* ================================================= */}
        {/* CHECK IN */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.checkInButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CheckIn')
          }>

          <Text style={styles.checkInIcon}>
            ✨
          </Text>

          <Text style={styles.checkInText}>
            Check In My Vibe
          </Text>

        </TouchableOpacity>

        {/* ================================================= */}
        {/* MOSAIC HEADER */}
        {/* ================================================= */}

        <View style={styles.mosaicHeader}>

          <View>

            <Text style={styles.mosaicTitle}>
              Mood Mosaic
            </Text>

            <Text style={styles.mosaicSubtitle}>
              {moods.length > 0
                ? `${moods.length} moments captured`
                : 'Your emotional moments'}
            </Text>

          </View>

          {moods.length > 0 && (
            <TouchableOpacity
              onPress={handleClearAll}
              activeOpacity={0.7}>

              <Text style={styles.clearText}>
                Clear All
              </Text>

            </TouchableOpacity>
          )}

        </View>

        {/* ================================================= */}
        {/* MOSAIC */}
        {/* ================================================= */}

        {moods.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyEmoji}>
              🌈
            </Text>

            <Text style={styles.emptyTitle}>
              Your mosaic is empty
            </Text>

            <Text style={styles.emptyText}>
              Check in your first vibe and start
              building your emotional mosaic.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('CheckIn')
              }>

              <Text style={styles.emptyButtonText}>
                + Create First Vibe
              </Text>

            </TouchableOpacity>

          </View>

        ) : (

          <View style={styles.mosaic}>

            {moods.map(mood => (

              <MoodTile
                key={mood.id}
                mood={mood}
                onDelete={handleDeleteMood}
              />

            ))}

          </View>
        )}

        {/* ================================================= */}
        {/* DISTRIBUTION */}
        {/* ================================================= */}

        {totalMoods > 0 && (

          <View style={styles.distributionCard}>

            <Text style={styles.sectionTitle}>
              Mood Distribution
            </Text>

            {Object.entries(distribution).map(
              ([emoji, count]) => {

                const percentage =
                  (count / totalMoods) * 100;

                return (

                  <View
                    key={emoji}
                    style={styles.distributionRow}>

                    <Text
                      style={
                        styles.distributionEmoji
                      }>
                      {emoji}
                    </Text>

                    <View
                      style={
                        styles.progressBackground
                      }>

                      <View
                        style={[
                          styles.progress,
                          {
                            width: `${percentage}%`,
                          },
                        ]}
                      />

                    </View>

                    <Text style={styles.count}>
                      {count}
                    </Text>

                  </View>
                );
              },
            )}

          </View>
        )}

        {/* ================================================= */}
        {/* INSIGHTS */}
        {/* ================================================= */}

        {totalMoods > 0 && (

          <View style={styles.insightsCard}>

            <Text style={styles.sectionTitle}>
              Your Vibe Insights
            </Text>

            {mostCommonMood && (

              <View style={styles.insightRow}>

                <View style={styles.insightIcon}>

                  <Text
                    style={styles.insightEmoji}>
                    {mostCommonMood.emoji}
                  </Text>

                </View>

                <View style={styles.insightContent}>

                  <Text style={styles.insightLabel}>
                    Most common vibe
                  </Text>

                  <Text style={styles.insightValue}>
                    {mostCommonMood.emoji} appeared{' '}
                    {mostCommonMood.count}{' '}
                    {mostCommonMood.count === 1
                      ? 'time'
                      : 'times'}
                  </Text>

                </View>

              </View>
            )}

            {mostCommonColor && (

              <View style={styles.insightRow}>

                <View
                  style={[
                    styles.colorInsight,
                    {
                      backgroundColor:
                        mostCommonColor.color,
                    },
                  ]}
                />

                <View style={styles.insightContent}>

                  <Text style={styles.insightLabel}>
                    Dominant color
                  </Text>

                  <Text style={styles.insightValue}>
                    {mostCommonColor.count}{' '}
                    {mostCommonColor.count === 1
                      ? 'check-in'
                      : 'check-ins'}
                  </Text>

                </View>

              </View>
            )}

          </View>
        )}

        {/* ================================================= */}
        {/* HISTORY */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.historyButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('History')
          }>

          <Text style={styles.historyIcon}>
            📖
          </Text>

          <Text style={styles.historyButtonText}>
            View Mood History
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;

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
    marginBottom: 24,
  },

  headerEmoji: {
    fontSize: 34,
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2563EB',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },

  // ===================================================
  // STATISTICS
  // ===================================================

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  statEmoji: {
    fontSize: 22,
    marginBottom: 5,
  },

  statNumber: {
    fontSize: 27,
    fontWeight: '800',
    color: '#2563EB',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },

  // ===================================================
  // CHECK IN
  // ===================================================

  checkInButton: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },

  checkInIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  checkInText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  // ===================================================
  // MOSAIC HEADER
  // ===================================================

  mosaicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  mosaicTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },

  mosaicSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },

  clearText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },

  // ===================================================
  // MOSAIC
  // ===================================================

  mosaic: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // ===================================================
  // EMPTY
  // ===================================================

  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  emptyEmoji: {
    fontSize: 50,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
  },

  emptyButton: {
    marginTop: 18,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  emptyButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
  },

  // ===================================================
  // DISTRIBUTION
  // ===================================================

  distributionCard: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 18,
  },

  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  distributionEmoji: {
    width: 35,
    fontSize: 22,
  },

  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },

  count: {
    width: 30,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },

  // ===================================================
  // INSIGHTS
  // ===================================================

  insightsCard: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  insightIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  insightEmoji: {
    fontSize: 25,
  },

  colorInsight: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },

  insightContent: {
    flex: 1,
    marginLeft: 14,
  },

  insightLabel: {
    fontSize: 13,
    color: '#64748B',
  },

  insightValue: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },

  // ===================================================
  // HISTORY
  // ===================================================

  historyButton: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2563EB',
  },

  historyIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  historyButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '700',
  },

});