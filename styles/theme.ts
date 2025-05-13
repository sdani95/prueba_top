import { StyleSheet } from "react-native";

// Color palette
export const colors = {
  primary: "#6366f1", // Indigo
  primaryLight: "#818cf8",
  secondary: "#f472b6", // Pink
  secondaryLight: "#f9a8d4",
  background: "#ffffff",
  card: "#f9fafb",
  text: "#1f2937",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
};

// Typography
export const typography = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: 0.3,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  small: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});