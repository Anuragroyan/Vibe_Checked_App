import React, {useMemo, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {deleteMood} from '../redux/moodSlice';

const HistoryScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const moods = useSelector(state => state.moods.moods);

  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Today',
    'Yesterday',
    'This Week',
  ];

  // =====================================================
  // DATE HELPERS
  // =====================================================

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = timestamp => {
    return isSameDay(
      new Date(timestamp),
      new Date(),
    );
  };

  const isYesterday = timestamp => {
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    return isSameDay(
      new Date(timestamp),
      yesterday,
    );
  };

  const isThisWeek = timestamp => {
    const date = new Date(timestamp);
    const today = new Date();

    // Monday = first day of week
    const day = today.getDay();

    const difference = day === 0 ? 6 : day - 1;

    const startOfWeek = new Date(today);

    startOfWeek.setDate(
      today.getDate() - difference,
    );

    startOfWeek.setHours(0, 0, 0, 0);

    return date >= startOfWeek;
  };

  // =====================================================
  // FILTER MOODS
  // =====================================================

  const filteredMoods = useMemo(() => {
    let result = [];

    switch (selectedFilter) {
      case 'Today':
        result = moods.filter(mood =>
          isToday(mood.timestamp),
        );
        break;

      case 'Yesterday':
        result = moods.filter(mood =>
          isYesterday(mood.timestamp),
        );
        break;

      case 'This Week':
        result = moods.filter(mood =>
          isThisWeek(mood.timestamp),
        );
        break;

      default:
        result = [...moods];
    }

    // Newest first
    return result.sort(
      (a, b) => b.timestamp - a.timestamp,
    );
  }, [moods, selectedFilter]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = timestamp => {
    return new Date(timestamp).toLocaleDateString(
      'en-IN',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

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

  // =====================================================
  // DELETE MOOD
  // =====================================================

  const handleDelete = id => {
    Alert.alert(
      'Delete Check-in',
      'Are you sure you want to delete this mood?',
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
  // GROUP MOODS BY DATE
  // =====================================================

  const groupedMoods = useMemo(() => {
    return filteredMoods.reduce((groups, mood) => {
      const dateKey = new Date(
        mood.timestamp,
      ).toDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(mood);

      return groups;
    }, {});
  }, [filteredMoods]);

  // =====================================================
  // SORT DATE GROUPS
  // =====================================================

  const sortedDateGroups = useMemo(() => {
    return Object.entries(groupedMoods).sort(
      ([, moodsA], [, moodsB]) => {
        return (
          moodsB[0].timestamp -
          moodsA[0].timestamp
        );
      },
    );
  }, [groupedMoods]);

  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>
          <Text style={styles.headerEmoji}>
            📖
          </Text>

          <Text style={styles.title}>
            Mood History
          </Text>

          <Text style={styles.subtitle}>
            Look back at your emotional moments
          </Text>
        </View>

        {/* ================================================= */}
        {/* FILTERS */}
        {/* ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.filterContainer
          }>

          {filters.map(filter => {
            const isSelected =
              selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedFilter(filter)
                }
                style={[
                  styles.filterButton,
                  isSelected &&
                    styles.activeFilterButton,
                ]}>

                <Text
                  style={[
                    styles.filterText,
                    isSelected &&
                      styles.activeFilterText,
                  ]}>
                  {filter}
                </Text>

              </TouchableOpacity>
            );
          })}

        </ScrollView>

        {/* ================================================= */}
        {/* RESULT SUMMARY */}
        {/* ================================================= */}

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryTitle}>
              {selectedFilter}
            </Text>

            <Text style={styles.summaryText}>
              {filteredMoods.length}{' '}
              {filteredMoods.length === 1
                ? 'check-in'
                : 'check-ins'}
            </Text>
          </View>

          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeText}>
              {filteredMoods.length}
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {filteredMoods.length === 0 ? (
          <View style={styles.emptyContainer}>

            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyEmoji}>
                🌈
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No moods found
            </Text>

            <Text style={styles.emptyText}>
              You don't have any check-ins for
              this time period.
            </Text>

            {selectedFilter !== 'All' && (
              <TouchableOpacity
                style={styles.showAllButton}
                onPress={() =>
                  setSelectedFilter('All')
                }>

                <Text style={styles.showAllText}>
                  Show All Moods
                </Text>

              </TouchableOpacity>
            )}

            {moods.length === 0 && (
              <TouchableOpacity
                style={styles.checkInButton}
                onPress={() =>
                  navigation.navigate('CheckIn')
                }>

                <Text
                  style={styles.checkInButtonText}>
                  + Create Your First Vibe
                </Text>

              </TouchableOpacity>
            )}

          </View>
        ) : (

          /* ================================================= */
          /* HISTORY */
          /* ================================================= */

          sortedDateGroups.map(
            ([dateKey, dateMoods]) => (
              <View
                key={dateKey}
                style={styles.dateSection}>

                {/* DATE HEADER */}

                <View style={styles.dateHeader}>

                  <View>
                    <Text style={styles.dateText}>
                      {formatDate(
                        dateMoods[0].timestamp,
                      )}
                    </Text>

                    <Text style={styles.dateCount}>
                      {dateMoods.length}{' '}
                      {dateMoods.length === 1
                        ? 'check-in'
                        : 'check-ins'}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.dateDot,
                      {
                        backgroundColor:
                          dateMoods[0].color,
                      },
                    ]}
                  />

                </View>

                {/* MOOD CARDS */}

                {dateMoods.map(mood => (
                  <View
                    key={mood.id}
                    style={styles.moodCard}>

                    {/* COLOR STRIP */}

                    <View
                      style={[
                        styles.colorIndicator,
                        {
                          backgroundColor:
                            mood.color,
                        },
                      ]}
                    />

                    {/* EMOJI */}

                    <View style={styles.emojiContainer}>

                      <Text style={styles.emoji}>
                        {mood.emoji}
                      </Text>

                    </View>

                    {/* CONTENT */}

                    <View style={styles.moodContent}>

                      <Text style={styles.phrase}>
                        {mood.phrase}
                      </Text>

                      <Text style={styles.time}>
                        🕐 {formatTime(
                          mood.timestamp,
                        )}
                      </Text>

                    </View>

                    {/* ACTIONS */}

                    <View
                      style={styles.actionContainer}>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.editButton}
                        onPress={() =>
                          navigation.navigate(
                            'EditMood',
                            {
                              mood,
                            },
                          )
                        }>

                        <Text style={styles.actionIcon}>
                          ✏️
                        </Text>

                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.deleteButton}
                        onPress={() =>
                          handleDelete(mood.id)
                        }>

                        <Text style={styles.actionIcon}>
                          🗑️
                        </Text>

                      </TouchableOpacity>

                    </View>

                  </View>
                ))}

              </View>
            ),
          )

        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

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
    marginBottom: 20,
  },

  headerEmoji: {
    fontSize: 34,
    marginBottom: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },

  // ===================================================
  // FILTER
  // ===================================================

  filterContainer: {
    paddingVertical: 5,
    paddingRight: 10,
  },

  filterButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  activeFilterButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  // ===================================================
  // SUMMARY
  // ===================================================

  summaryRow: {
    marginTop: 20,
    marginBottom: 18,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },

  summaryText: {
    marginTop: 3,
    fontSize: 12,
    color: '#64748B',
  },

  summaryBadge: {
    minWidth: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  summaryBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },

  // ===================================================
  // DATE
  // ===================================================

  dateSection: {
    marginBottom: 24,
  },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  dateText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },

  dateCount: {
    marginTop: 3,
    fontSize: 12,
    color: '#64748B',
  },

  dateDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // ===================================================
  // MOOD CARD
  // ===================================================

  moodCard: {
    minHeight: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },

  colorIndicator: {
    width: 6,
    alignSelf: 'stretch',
    marginRight: 12,
  },

  emojiContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  emoji: {
    fontSize: 28,
  },

  moodContent: {
    flex: 1,
    marginRight: 8,
  },

  phrase: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },

  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748B',
  },

  // ===================================================
  // ACTIONS
  // ===================================================

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editButton: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 17,
  },

  // ===================================================
  // EMPTY
  // ===================================================

  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyEmoji: {
    fontSize: 42,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
  },

  showAllButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
  },

  showAllText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
  },

  checkInButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#2563EB',
  },

  checkInButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});