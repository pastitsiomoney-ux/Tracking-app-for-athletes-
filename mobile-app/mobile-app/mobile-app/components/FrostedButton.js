// components/FrostedButton.js
//
// The app's primary action button: frosted-glass by default, or a solid
// ink-colored variant ("solid") for the highest-priority CTA on a screen
// (e.g. "Unlock Lifetime Dashboard").

import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function FrostedButton({ label, onPress, variant = "glass", disabled = false, icon = null }) {
  const isSolid = variant === "solid";

  if (isSolid) {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={disabled ? styles.disabled : null}>
        <View className="rounded-full py-4 px-6 items-center justify-center" style={styles.solidBg}>
          <Text className="text-paper text-[15px] font-bold">
            {icon ? `${icon}  ` : ""}{label}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={disabled} style={disabled ? styles.disabled : null}>
      <BlurView intensity={35} tint="light" style={styles.glassWrap}>
        <View className="py-4 px-6 bg-white/50 border border-white/70 rounded-full items-center justify-center">
          <Text className="text-ink text-[15px] font-semibold">
            {icon ? `${icon}  ` : ""}{label}
          </Text>
        </View>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  glassWrap: {
    borderRadius: 999,
    overflow: "hidden",
  },
  solidBg: {
    backgroundColor: "#1C1C1F",
    shadowColor: "#1C1C1F",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  disabled: {
    opacity: 0.4,
  },
});
