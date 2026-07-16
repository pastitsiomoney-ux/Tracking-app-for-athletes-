// components/BackButton.js
//
// Consistent back-arrow control used across onboarding and the two
// dashboards so athletes always have an obvious way to retrace a step.

import React from "react";
import { Pressable, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function BackButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      className="w-10 h-10 rounded-full bg-white/50 border border-white/70 items-center justify-center"
    >
      <View>
        <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
          <Path
            d="M10 13L5 8L10 3"
            stroke="#1C1C1F"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </Pressable>
  );
}
