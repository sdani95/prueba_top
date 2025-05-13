import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView
} from "react-native";
import { X, Share2, RefreshCw } from "lucide-react-native";
import { colors, typography, commonStyles } from "@/styles/theme";
import { TopTenCategory } from "@/constants/categories";

interface CompletionModalProps {
  visible: boolean;
  onClose: () => void;
  category: TopTenCategory;
  guessedItems: number[];
  attempts: string[];
  onShare: () => void;
  onPlayAgain: () => void;
  surrendered: boolean;
}

export default function CompletionModal({ 
  visible, 
  onClose, 
  category,
  guessedItems,
  attempts,
  onShare,
  onPlayAgain,
  surrendered
}: CompletionModalProps) {
  const isComplete = guessedItems.length === category.items.length;
  const correctCount = guessedItems.length;
  const totalCount = category.items.length;
  const accuracy = attempts.length > 0 
    ? Math.round((correctCount / attempts.length) * 100) 
    : 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isComplete && !surrendered ? "Congratulations! 🎉" : 
               surrendered ? "Game Over" : "Game Summary"}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              You got <Text style={styles.highlight}>{correctCount}</Text> out of <Text style={styles.highlight}>{totalCount}</Text> items
            </Text>
            
            <Text style={styles.accuracyText}>
              Accuracy: <Text style={styles.highlight}>{accuracy}%</Text>
            </Text>
            
            <Text style={styles.attemptsText}>
              Total guesses: <Text style={styles.highlight}>{attempts.length}</Text>
            </Text>
            
            {surrendered && (
              <Text style={styles.surrenderedText}>
                You gave up on this challenge
              </Text>
            )}
          </View>

          <View style={styles.divider} />

          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.listTitle}>{category.title}</Text>
            {category.items.map((item, index) => {
              const isGuessed = guessedItems.includes(index);
              const itemStyle = isGuessed ? styles.guessedItem : 
                                surrendered ? styles.revealedItem : styles.missedItem;
              
              return (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listItemRank}>{index + 1}.</Text>
                  <Text style={[styles.listItemName, itemStyle]}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Share2 size={20} color="#fff" />
              <Text style={styles.shareButtonText}>Share Results</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
              <RefreshCw size={20} color={colors.primary} />
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    ...typography.subtitle,
    fontSize: 20,
  },
  closeButton: {
    padding: 4,
  },
  resultContainer: {
    marginBottom: 16,
  },
  resultText: {
    ...typography.body,
    fontSize: 18,
    marginBottom: 8,
  },
  highlight: {
    fontWeight: "700",
    color: colors.primary,
  },
  accuracyText: {
    ...typography.body,
    marginBottom: 4,
  },
  attemptsText: {
    ...typography.body,
  },
  surrenderedText: {
    ...typography.body,
    color: colors.error,
    marginTop: 8,
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  listContainer: {
    marginBottom: 16,
    maxHeight: 300,
  },
  listTitle: {
    ...typography.subtitle,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  listItemRank: {
    width: 30,
    ...typography.body,
    fontWeight: "700",
  },
  listItemName: {
    ...typography.body,
    flex: 1,
  },
  guessedItem: {
    color: colors.success,
    fontWeight: "600",
  },
  missedItem: {
    color: colors.error,
  },
  revealedItem: {
    color: colors.warning,
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  playAgainButton: {
    flexDirection: "row",
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
    marginLeft: 8,
  },
  playAgainText: {
    color: colors.primary,
    fontWeight: "600",
    marginLeft: 8,
  },
});