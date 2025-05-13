import React, { useEffect, useState } from "react";
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  Platform, 
  Share,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Stack } from "expo-router";
import { useGameStore } from "@/store/gameStore";
import { colors, commonStyles } from "@/styles/theme";

// Components
import GuessInput from "@/components/GuessInput";
import TopTenList from "@/components/TopTenList";
import GameHeader from "@/components/GameHeader";
import GameControls from "@/components/GameControls";
import CompletionModal from "@/components/CompletionModal";
import FeedbackToast from "@/components/FeedbackToast";

export default function GameScreen() {
  const { 
    currentCategory,
    guessedItems,
    attempts,
    showHints,
    surrendered,
    initializeGame,
    makeGuess,
    toggleHints,
    resetGame,
    isGameCompleted,
    giveUp
  } = useGameStore();
  
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "warning" | "error" | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  // Initialize the game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Show completion modal when game is completed
  useEffect(() => {
    if (isGameCompleted() && currentCategory) {
      setShowCompletionModal(true);
    }
  }, [guessedItems, currentCategory, surrendered]);

  const handleGuess = (guess: string) => {
    if (!currentCategory) return;
    
    const result = makeGuess(guess);
    
    if (result.correct) {
      setFeedbackMessage(`Correct! ${guess} is #${result.position}`);
      setFeedbackType("success");
    } else if (result.closeMatch) {
      setFeedbackMessage(`Close! Did you mean "${result.matchedWith}"`);
      setFeedbackType("warning");
    } else {
      setFeedbackMessage(`"${guess}" is not in the Top 10`);
      setFeedbackType("error");
    }
  };

  const handleShare = async () => {
    if (!currentCategory) return;
    
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    
    const correctCount = guessedItems.length;
    const totalCount = currentCategory.items.length;
    const accuracy = attempts.length > 0 
      ? Math.round((correctCount / attempts.length) * 100) 
      : 0;
    
    const message = 
      `🎮 Top 10 Daily Challenge - ${date}
` +
      `📊 ${currentCategory.title}
` +
      `✅ ${correctCount}/${totalCount} correct
` +
      `🎯 ${accuracy}% accuracy
` +
      `🔢 ${attempts.length} guesses
` +
      (surrendered ? `🏳️ Gave up
` : ``) +
      `
Play Top 10 Daily Challenge!`;
    
    try {
      if (Platform.OS === "web") {
        // Web fallback
        await navigator.clipboard.writeText(message);
        Alert.alert("Copied to clipboard!", "Share your results with friends.");
      } else {
        // Native sharing
        await Share.share({
          message,
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleGiveUp = () => {
    Alert.alert(
      "Give Up",
      "Are you sure you want to give up? All remaining items will be revealed.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Give Up", 
          style: "destructive",
          onPress: () => {
            // Llamamos directamente a giveUp y forzamos la actualización del estado
            giveUp();
            // Forzamos la apertura del modal de finalización
            setShowCompletionModal(true);
          }
        }
      ]
    );
  };

  const handlePlayAgain = () => {
    setShowCompletionModal(false);
    resetGame();
  };

  const clearFeedback = () => {
    setFeedbackMessage(null);
    setFeedbackType(null);
  };

  // If no category is loaded yet, show loading
  if (!currentCategory) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text>Loading today's challenge...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={commonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <Stack.Screen 
        options={{
          title: "Top 10 Challenge",
          headerTitleStyle: {
            color: colors.text,
            fontWeight: "700",
          },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <GameHeader 
          title={currentCategory.title}
          description={currentCategory.description}
          date={new Date()}
        />
        
        <TopTenList 
          category={currentCategory}
          guessedItems={guessedItems}
          showHints={showHints}
          showAll={surrendered}
        />
      </ScrollView>
      
      <View style={styles.bottomContainer}>
        <GameControls 
          onToggleHints={toggleHints}
          onShare={handleShare}
          onGiveUp={handleGiveUp}
          showHints={showHints}
          isCompleted={isGameCompleted()}
          guessCount={attempts.length}
        />
        
        <GuessInput 
          onSubmit={handleGuess}
          disabled={isGameCompleted()}
        />
      </View>
      
      <FeedbackToast 
        message={feedbackMessage}
        type={feedbackType}
        onDismiss={clearFeedback}
      />
      
      <CompletionModal 
        visible={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        category={currentCategory}
        guessedItems={guessedItems}
        attempts={attempts}
        onShare={handleShare}
        onPlayAgain={handlePlayAgain}
        surrendered={surrendered}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});