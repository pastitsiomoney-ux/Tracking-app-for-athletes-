// screens/HomeDashboard.js
//
// Main Home Dashboard — the athlete's default landing screen after
// onboarding. Shows a mock weight trend graph and weekly training volume,
// plus the two primary actions: scan an erg screen, or unlock the
// premium analytics dashboard.
//
// Charts are drawn with react-native-svg directly (no charting library)
// to keep the dependency footprint small for a single-file-style build.

import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Svg, { Polyline, Circle, Rect } from "react-native-svg";
import GlassCard from "../components/GlassCard";
import FrostedButton from "../components/FrostedButton";
import { useApp } from "../AppContext";

// Mock weight data (kg) — replace with real values from AppContext.weightLog
const MOCK_WEIGHT_TREND = [74.2, 73.9, 74.5, 73.6, 73.1, 72.8, 72.5];
// Mock weekly training volume (meters, in thousands) for the last 7 weeks
const MOCK_WEEKLY_VOLUME = [18, 22, 20, 26, 24, 30, 27];

function WeightGraph() {
  const width = 280;
  const height = 90;
  const max = Math.max(...MOCK_WEIGHT_TREND);
  const min = Math.min(...MOCK_WEIGHT_TREND);
  const range = max - min || 1;

  const points = MOCK_WEIGHT_TREND.map((val, i) => {
    const x = (i / (MOCK_WEIGHT_TREND.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const lastX = width;
  const lastY = height - ((MOCK_WEIGHT_TREND.at(-1) - min) / range) * height;

  return (
    <Svg width={width} height={height + 10}>
      <Polyline points={points} fill="none" stroke="#1C1C1F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.75} />
      <Circle cx={lastX} cy={lastY} r={4} fill="#1C1C1F" />
    </Svg>
  );
}

function VolumeBars() {
  const width = 280;
  const height = 70;
  const max = Math.max(...MOCK_WEEKLY_VOLUME);
  const barWidth = width / MOCK_WEEKLY_VOLUME.length - 8;

  return (
    <Svg width={width} height={height}>
      {MOCK_WEEKLY_VOLUME.map((val, i) => {
        const barHeight = (val / max) * height;
        const x = i * (barWidth + 8);
        const y = height - barHeight;
        const isLast = i === MOCK_WEEKLY_VOLUME.length - 1;
        return (
          <Rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={4}
            fill="#1C1C1F"
            opacity={isLast ? 1 : 0.25 + (i / MOCK_WEEKLY_VOLUME.length) * 0.35}
          />
        );
      })}
    </Svg>
  );
}

export default function HomeDashboard({ navigation }) {
  const { sport, tier, isPremium } = useApp();

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <View>
            <Text className="text-ink/40 text-[12px] font-semibold tracking-widest">
              {(tier || "ATHLETE").toUpperCase()} · {(sport || "ROWING").toUpperCase()}
            </Text>
            <Text className="text-ink text-[24px] font-extrabold tracking-tight mt-1">
              Welcome back
            </Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-white/60 border border-white/80 items-center justify-center">
            <Text className="text-ink text-[13px] font-bold">
              {(sport || "R")[0].toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Weight tracker card */}
        <GlassCard className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-ink text-[15px] font-bold">Weight Trend</Text>
            <Text className="text-ink/40 text-[12px] font-medium">7 sessions</Text>
          </View>
          <WeightGraph />
          <View className="flex-row items-baseline gap-1 mt-2">
            <Text className="text-ink text-[20px] font-extrabold">
              {MOCK_WEIGHT_TREND.at(-1)}
            </Text>
            <Text className="text-ink/40 text-[13px] font-medium">kg · latest</Text>
          </View>
        </GlassCard>

        {/* Weekly training volume card */}
        <GlassCard className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-ink text-[15px] font-bold">Weekly Training Volume</Text>
            <Text className="text-ink/40 text-[12px] font-medium">7 weeks</Text>
          </View>
          <VolumeBars />
          <View className="flex-row items-baseline gap-1 mt-2">
            <Text className="text-ink text-[20px] font-extrabold">
              {MOCK_WEEKLY_VOLUME.at(-1)}k
            </Text>
            <Text className="text-ink/40 text-[13px] font-medium">meters · this week</Text>
          </View>
        </GlassCard>

        {/* Primary actions */}
        <View className="gap-3">
          <FrostedButton
            label="Scan Erg Screen"
            icon="📷"
            variant="glass"
            onPress={() => {
              // TODO: hook up expo-camera + OCR pipeline here.
              console.log("Open camera OCR scan flow");
            }}
          />
          <FrostedButton
            label={isPremium ? "Open Premium Dashboard" : "Unlock Lifetime Dashboard ($15)"}
            variant="solid"
            onPress={() => navigation.navigate("PremiumDashboard")}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
