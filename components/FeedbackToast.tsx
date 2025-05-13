import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Platform,
  Dimensions
} from "react-native";
import { colors, typography } from "@/styles/theme";
import { Check, X, AlertTriangle } from "lucide-react-native";

interface FeedbackToastProps {
  message: string | null;
  type: "success" | "warning" | "error" | null;
  onDismiss: () => void;
}

export default function FeedbackToast({ 
  message, 
  type, 
  onDismiss 
}: FeedbackToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
    if (message) {
      // Show toast
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
      
      // Auto-dismiss after 2.5 seconds
      const timer = setTimeout(() => {
        hideToast();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const hideToast = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      onDismiss();
    });
  };
  
  if (!message || !type) return null;
  
  let backgroundColor, borderColor, textColor, Icon;
  
  switch (type) {
    case "success":
      backgroundColor = colors.success + "20";
      borderColor = colors.success;
      textColor = colors.success;
      Icon = () => <Check size={20} color={colors.success} />;
      break;
    case "warning":
      backgroundColor = colors.warning + "20";
      borderColor = colors.warning;
      textColor = colors.warning;
      Icon = () => <AlertTriangle size={20} color={colors.warning} />;
      break;
    case "error":
    default:
      backgroundColor = colors.error + "20";
      borderColor = colors.error;
      textColor = colors.error;
      Icon = () => <X size={20} color={colors.error} />;
      break;
  }
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.toast,
          { 
            backgroundColor,
            borderColor,
            opacity,
            transform: [{ translateY }]
          }
        ]}
      >
        <View style={styles.iconContainer}>
          <Icon />
        </View>
        <Text style={[styles.message, { color: textColor }]}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    pointerEvents: "none", // Allow interaction with elements below
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: Math.min(width - 40, 400),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    ...typography.body,
    fontWeight: "600",
    flex: 1,
  },
});