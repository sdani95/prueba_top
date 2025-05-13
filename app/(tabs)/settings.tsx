import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Alert,
  Linking
} from "react-native";
import { Stack } from "expo-router";
import { 
  RefreshCw, 
  Info, 
  Mail, 
  Star, 
  Share2,
  ChevronRight
} from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { colors, typography, commonStyles } from "@/styles/theme";

export default function SettingsScreen() {
  const { 
    showHints, 
    toggleHints, 
    resetGame 
  } = useGameStore();

  const handleResetGame = () => {
    Alert.alert(
      "Reset Game",
      "Are you sure you want to reset today's game? This will clear all your progress for today.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: () => resetGame()
        }
      ]
    );
  };

  const handleContact = () => {
    Linking.openURL("mailto:support@top10challenge.com");
  };

  const handleRateApp = () => {
    // This would normally open the app store, but we'll just show an alert for now
    Alert.alert(
      "Rate the App",
      "Thanks for wanting to rate our app! This feature will be available soon."
    );
  };

  return (
    <ScrollView style={commonStyles.container}>
      <Stack.Screen 
        options={{
          title: "Settings",
          headerTitleStyle: {
            color: colors.text,
            fontWeight: "700",
          },
        }} 
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Text style={styles.settingLabel}>Show Hints</Text>
            <Text style={styles.settingDescription}>
              Display hints for items you haven't guessed yet
            </Text>
          </View>
          <Switch
            value={showHints}
            onValueChange={toggleHints}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={showHints ? colors.primary : "#f4f3f4"}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleResetGame}>
          <RefreshCw size={20} color={colors.error} />
          <Text style={[styles.buttonText, { color: colors.error }]}>
            Reset Today's Game
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemIcon}>
            <Info size={20} color={colors.primary} />
          </View>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTitle}>About Top 10 Challenge</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem} onPress={handleContact}>
          <View style={styles.listItemIcon}>
            <Mail size={20} color={colors.primary} />
          </View>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTitle}>Contact Us</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem} onPress={handleRateApp}>
          <View style={styles.listItemIcon}>
            <Star size={20} color={colors.primary} />
          </View>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTitle}>Rate the App</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemIcon}>
            <Share2 size={20} color={colors.primary} />
          </View>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTitle}>Share with Friends</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.copyright}>© 2023 Top 10 Challenge</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.subtitle,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    ...typography.body,
    fontWeight: "600",
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.error,
  },
  buttonText: {
    ...typography.body,
    fontWeight: "600",
    marginLeft: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemIcon: {
    width: 40,
    alignItems: "center",
  },
  listItemContent: {
    flex: 1,
    marginLeft: 8,
  },
  listItemTitle: {
    ...typography.body,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 16,
  },
  version: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  copyright: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 4,
  },
});