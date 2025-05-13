import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useGameStore } from "@/store/gameStore";
import { colors, typography, commonStyles } from "@/styles/theme";
import GameStats from "@/components/GameStats";

export default function HistoryScreen() {
  const { 
    totalPlayed, 
    totalWins, 
    streak, 
    bestStreak,
    currentCategory,
    guessedItems,
    attempts
  } = useGameStore();

  return (
    <ScrollView style={commonStyles.container}>
      <Stack.Screen 
        options={{
          title: "Your History",
          headerTitleStyle: {
            color: colors.text,
            fontWeight: "700",
          },
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Your Game History</Text>
        <Text style={styles.subtitle}>
          Track your progress and see your stats
        </Text>
      </View>
      
      <GameStats 
        totalPlayed={totalPlayed}
        totalWins={totalWins}
        streak={streak}
        bestStreak={bestStreak}
      />
      
      {currentCategory && (
        <View style={styles.currentGameCard}>
          <Text style={styles.cardTitle}>Today's Challenge</Text>
          <Text style={styles.categoryTitle}>{currentCategory.title}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{guessedItems.length}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{attempts.length}</Text>
              <Text style={styles.statLabel}>Guesses</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {attempts.length > 0 
                  ? Math.round((guessedItems.length / attempts.length) * 100) 
                  : 0}%
              </Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>
      )}
      
      <View style={styles.comingSoonCard}>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          We're working on a full history view that will show all your past games and detailed statistics.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    ...typography.title,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  currentGameCard: {
    ...commonStyles.card,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  cardTitle: {
    ...typography.subtitle,
    marginBottom: 8,
  },
  categoryTitle: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    ...typography.title,
    fontSize: 24,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  comingSoonCard: {
    ...commonStyles.card,
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: colors.secondaryLight + "20", // 20% opacity
    borderColor: colors.secondaryLight,
    borderWidth: 1,
  },
  comingSoonTitle: {
    ...typography.subtitle,
    color: colors.secondary,
    marginBottom: 8,
  },
  comingSoonText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});