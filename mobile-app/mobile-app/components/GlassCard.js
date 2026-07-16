// components/GlassCard.js
//
// Reusable frosted-glass container. Uses expo-blur's BlurView for a true
// native blur (NativeWind/Tailwind alone can't do backdrop-filter on
// iOS/Android), then layers a subtle white tint + hairline border on top
// to match the site's glassmorphism language.

import React from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function GlassCard({ children, className = "", style, tint = "light", intensity = 40 }) {
  return (
    <View className={`rounded-3xl overflow-hidden ${className}`} style={[styles.shadow, style]}>
      <BlurView intensity={intensity} tint={tint} style={styles.blur}>
        <View className="p-5 bg-white/40 border border-white/60 rounded-3xl">
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 24,
  },
  shadow: {
    shadowColor: "#1C1C1F",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4, // Android fallback since elevation can't do soft shadows
  },
});
