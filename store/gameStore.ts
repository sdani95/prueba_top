import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCategoryForDate, TopTenCategory } from "@/constants/categories";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
import * as stringSimilarity from "string-similarity";

interface GameState {
  currentCategory: TopTenCategory | null;
  guessedItems: number[];
  attempts: string[];
  lastPlayed: string | null;
  streak: number;
  bestStreak: number;
  totalPlayed: number;
  totalWins: number;
  showHints: boolean;
  surrendered: boolean;
  
  // Actions
  initializeGame: () => void;
  makeGuess: (guess: string) => { correct: boolean; position?: number; closeMatch?: boolean; matchedWith?: string };
  toggleHints: () => void;
  resetGame: () => void;
  completeGame: () => void;
  isGameCompleted: () => boolean;
  giveUp: () => void;
}

// Helper to normalize strings for comparison (lowercase, trim, remove accents)
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Similarity threshold for close matches (50%)
const SIMILARITY_THRESHOLD = 0.5;

// Create the store with persistence
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentCategory: null,
      guessedItems: [],
      attempts: [],
      lastPlayed: null,
      streak: 0,
      bestStreak: 0,
      totalPlayed: 0,
      totalWins: 0,
      showHints: false,
      surrendered: false,

      initializeGame: () => {
        const today = new Date().toISOString().split("T")[0];
        const { lastPlayed } = get();
        
        // If it's a new day, reset the game state
        if (lastPlayed !== today) {
          const newCategory = getCategoryForDate();
          set({
            currentCategory: newCategory,
            guessedItems: [],
            attempts: [],
            lastPlayed: today,
            surrendered: false,
          });
        }
      },

      makeGuess: (guess: string) => {
        const { currentCategory, guessedItems, attempts, surrendered } = get();
        
        if (!currentCategory || surrendered) {
          return { correct: false };
        }

        // Normalize the guess
        const normalizedGuess = normalizeString(guess);
        
        // Check if already guessed
        if (attempts.some(attempt => normalizeString(attempt) === normalizedGuess)) {
          return { correct: false };
        }

        // Add to attempts
        set({ attempts: [...attempts, guess] });

        // Check if the guess is correct
        for (let i = 0; i < currentCategory.items.length; i++) {
          const item = currentCategory.items[i];
          if (normalizeString(item.name) === normalizedGuess) {
            // If not already guessed this position
            if (!guessedItems.includes(i)) {
              set({ guessedItems: [...guessedItems, i].sort((a, b) => a - b) });
              
              // Provide haptic feedback on correct guess (mobile only)
              if (Platform.OS !== "web") {
                try {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                } catch (err) {
                  console.log("Haptics not available", err);
                }
              }
              
              return { correct: true, position: i + 1 };
            }
          }
        }

        // If not an exact match, check for close matches using string similarity
        try {
          const itemNames = currentCategory.items.map(item => normalizeString(item.name));
          const { bestMatch } = stringSimilarity.findBestMatch(normalizedGuess, itemNames);
          
          if (bestMatch && bestMatch.rating >= SIMILARITY_THRESHOLD) {
            // Make sure the item exists and get the original name
            const targetIndex = bestMatch.targetIndex !== undefined ? bestMatch.targetIndex : -1;
            
            if (targetIndex >= 0 && targetIndex < currentCategory.items.length) {
              const originalItemName = currentCategory.items[targetIndex].name;
              return { 
                correct: false, 
                closeMatch: true,
                matchedWith: originalItemName
              };
            }
          }
        } catch (error) {
          console.error("Error in string similarity check:", error);
        }

        return { correct: false };
      },

      toggleHints: () => {
        set(state => ({ showHints: !state.showHints }));
      },

      resetGame: () => {
        set({
          guessedItems: [],
          attempts: [],
          surrendered: false,
        });
      },

      completeGame: () => {
        const { totalPlayed, totalWins, streak, bestStreak, guessedItems, currentCategory, surrendered } = get();
        
        if (!currentCategory) return;
        
        const isWin = guessedItems.length === currentCategory.items.length && !surrendered;
        const newStreak = isWin ? streak + 1 : 0;
        
        set({
          totalPlayed: totalPlayed + 1,
          totalWins: isWin ? totalWins + 1 : totalWins,
          streak: newStreak,
          bestStreak: Math.max(bestStreak, newStreak),
        });
      },

      isGameCompleted: () => {
        const { guessedItems, currentCategory, surrendered } = get();
        return currentCategory ? 
          (guessedItems.length === currentCategory.items.length || surrendered) : 
          false;
      },

      giveUp: () => {
        // Simplificamos esta función para asegurar que funcione correctamente
        set({ surrendered: true });
        
        // Llamamos a completeGame para actualizar las estadísticas
        setTimeout(() => {
          const state = get();
          if (state.surrendered) {
            state.completeGame();
          }
        }, 100);
      },
    }),
    {
      name: "top10-game-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);