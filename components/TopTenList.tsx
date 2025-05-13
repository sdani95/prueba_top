import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TopTenCategory } from "@/constants/categories";
import { colors, typography } from "@/styles/theme";

interface TopTenListProps {
  category: TopTenCategory;
  guessedItems: number[];
  showHints?: boolean;
  showAll?: boolean;
}

export default function TopTenList({ 
  category, 
  guessedItems, 
  showHints = false,
  showAll = false 
}: TopTenListProps) {
  return (
    <View style={styles.container}>
      {category.items.map((item, index) => {
        const isGuessed = guessedItems.includes(index);
        const shouldShow = isGuessed || showAll;
        
        return (
          <View 
            key={index} 
            style={[
              styles.itemContainer,
              shouldShow ? 
                isGuessed ? styles.guessedItem : styles.revealedItem 
                : styles.unguessedItem
            ]}
          >
            <Text style={styles.rank}>{index + 1}</Text>
            <View style={styles.itemContent}>
              {shouldShow ? (
                <Text 
                  style={[
                    styles.itemName,
                    !isGuessed && showAll ? styles.revealedText : null
                  ]}
                >
                  {item.name}
                </Text>
              ) : (
                <>
                  <View style={styles.placeholder} />
                  {showHints && item.hint && (
                    <Text style={styles.hint}>Hint: {item.hint}</Text>
                  )}
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    borderRadius: 12,
    padding: 12,
  },
  guessedItem: {
    backgroundColor: colors.primaryLight + "20", // 20% opacity
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  unguessedItem: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  revealedItem: {
    backgroundColor: colors.warning + "15", // 15% opacity
    borderWidth: 1,
    borderColor: colors.warning,
  },
  rank: {
    width: 30,
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },
  itemContent: {
    flex: 1,
    marginLeft: 8,
  },
  itemName: {
    ...typography.body,
    fontWeight: "600",
  },
  revealedText: {
    color: colors.warning,
    fontStyle: "italic",
  },
  placeholder: {
    height: 16,
    backgroundColor: colors.border,
    width: "70%",
    borderRadius: 4,
  },
  hint: {
    ...typography.small,
    fontStyle: "italic",
    marginTop: 4,
    color: colors.textSecondary,
  },
});