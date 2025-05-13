import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, commonStyles } from "@/styles/theme";

interface GameStatsProps {
  totalPlayed: number;
  totalWins: number;
  streak: number;
  bestStreak: number;
}

export default function GameStats({ 
  totalPlayed, 
  totalWins, 
  streak, 
  bestStreak 
}: GameStatsProps) {
  const winPercentage = totalPlayed > 0 
    ? Math.round((totalWins / totalPlayed) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Stats</Text>
      
      <View style={styles.statsGrid}>
        <StatItem value={totalPlayed} label="Played" />
        <StatItem value={winPercentage} label="Win %" suffix="%" />
        <StatItem value={streak} label="Current Streak" />
        <StatItem value={bestStreak} label="Best Streak" />
      </View>
    </View>
  );
}

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
}

function StatItem({ value, label, suffix = "" }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}{suffix}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  title: {
    ...typography.subtitle,
    textAlign: "center",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    ...typography.title,
    fontSize: 24,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    marginTop: 4,
  },
});