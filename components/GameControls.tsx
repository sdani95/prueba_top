import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Lightbulb, Share2, RefreshCw, Flag } from "lucide-react-native";
import { colors, typography } from "@/styles/theme";

interface GameControlsProps {
  onToggleHints: () => void;
  onShare: () => void;
  onReset?: () => void;
  onGiveUp: () => void;
  showHints: boolean;
  isCompleted: boolean;
  guessCount: number;
}

export default function GameControls({ 
  onToggleHints, 
  onShare, 
  onReset,
  onGiveUp,
  showHints, 
  isCompleted,
  guessCount
}: GameControlsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, showHints && styles.activeButton]} 
        onPress={onToggleHints}
      >
        <Lightbulb size={20} color={showHints ? colors.background : colors.primary} />
        <Text style={[styles.buttonText, showHints && styles.activeButtonText]}>
          {showHints ? "Hide Hints" : "Show Hints"}
        </Text>
      </TouchableOpacity>

      {!isCompleted && (
        <TouchableOpacity 
          style={[styles.button, styles.giveUpButton]} 
          onPress={onGiveUp}
          accessibilityLabel="Give Up Button"
          accessibilityHint="Reveals all answers and ends the game"
        >
          <Flag size={20} color={colors.error} />
          <Text style={[styles.buttonText, styles.giveUpText]}>
            Give Up
          </Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <Share2 size={20} color={colors.primary} />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      )}

      {onReset && (
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <RefreshCw size={20} color={colors.primary} />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      )}

      <View style={styles.guessCounter}>
        <Text style={styles.guessText}>
          Guesses: <Text style={styles.guessCount}>{guessCount}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  giveUpButton: {
    borderColor: colors.error,
  },
  buttonText: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: 6,
  },
  activeButtonText: {
    color: colors.background,
  },
  giveUpText: {
    color: colors.error,
  },
  guessCounter: {
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  guessText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  guessCount: {
    fontWeight: "700",
    color: colors.text,
  },
});