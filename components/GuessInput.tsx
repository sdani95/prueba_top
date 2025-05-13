import React, { useState, useRef } from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text,
  Keyboard,
  Platform
} from "react-native";
import { Send } from "lucide-react-native";
import { colors } from "@/styles/theme";

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
}

export default function GuessInput({ onSubmit, disabled = false }: GuessInputProps) {
  const [guess, setGuess] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (guess.trim().length === 0) return;
    
    onSubmit(guess);
    setGuess("");
    
    // Keep focus on mobile, but not on web (better UX)
    if (Platform.OS !== "web") {
      inputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter your guess..."
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
      />
      <TouchableOpacity 
        style={[
          styles.button,
          { opacity: guess.trim().length === 0 || disabled ? 0.5 : 1 }
        ]}
        onPress={handleSubmit}
        disabled={guess.trim().length === 0 || disabled}
      >
        <Send size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.card,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});