import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { typography, colors } from "@/styles/theme";

interface GameHeaderProps {
  title: string;
  description: string;
  date: Date;
}

export default function GameHeader({ title, description, date }: GameHeaderProps) {
  // Format date as "Month Day, Year"
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    ...typography.title,
    marginBottom: 8,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
});