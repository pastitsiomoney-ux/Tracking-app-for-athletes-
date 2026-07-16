// screens/PremiumDashboard.js
//
// Premium Analytics Dashboard — gated behind AppContext.isPremium.
// If the athlete hasn't unlocked the $15 lifetime pass yet, this screen
// renders a paywall instead of the locked content. Once unlocked, it
// shows: split-curve graph, stroke rate analysis, heart rate zones,
// an integrations toggle panel, and an AI Coach insight box.

import React, { useState } from "react";
import { View, Text, ScrollView, Switch, SafeAreaView } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import BackButton from "../components/BackButton";
import GlassCard from "../components/GlassCard";
import FrostedButton from "../components/FrostedButton";
import { useApp } from "../AppContext";

// Mock split-curve data: split time (seconds per 500m) across a 2k piece
const MOCK_SPLIT_CURVE = [112, 109, 107, 106, 105, 106, 108, 111];
// Mock heart-rate zone distribution, minutes per zone (Z1–Z5)
const MOCK_HR_ZONES = [
  { zone: "Z1", minutes: 4, color: "#D4D4D8" },
  { zone: "Z2", minutes: 9, color: "#A1A1AA" },
  { zone: "Z3", minutes: 14, color: "#71717A" },
  { zone: "Z4", minutes: 8, color: "#3F3F46" },
  { zone: "Z5", minutes: 2, color: "#1C1C1F" },
];

function SplitCurveGraph() {
  const width = 280;
  const height = 90;
  const max = Math.max(...MOCK_SPLIT_CURVE);
  const min = Math.min(...MOCK_SPLIT_CURVE);
  const range = max - min || 1;

  // Faster splits (lower seconds) should read higher on the graph.
  const points = MOCK_SPLIT_CURVE.map((val, i) => {
    const x = (i / (MOCK_SPLIT_CURVE.length - 1)) * width;
    const y = ((val - min) / range) * height; // inverted: fast = low y later
    return { x, y: height - y };
  });

  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <Svg width={width} height={height + 8}>
      <Path d={path} fill="none" stroke="#1C1C1F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
      {points.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 4 : 2.5} fill="#1C1C1F" opacity={i === points.length - 1 ? 1 : 0.5} />
      ))}
    </Svg>
  );
}

function HeartRateZoneBars() {
  const width = 280;
  const height = 60;
  const total = MOCK_HR_ZONES.reduce((sum, z) => sum + z.minutes, 0);
  let cursorX = 0;

  return (
    <View>
      <Svg width={width} height={16}>
        {MOCK_HR_ZONES.map((z) => {
          const w = (z.minutes / total) * width;
          const rect = <Rect key={z.zone} x={cursorX} y={0} width={w} height={16} rx={4} fill={z.color} />;
          cursorX += w;
          return rect;
        })}
      </Svg>
      <View className="flex-row flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {MOCK_HR_ZONES.map((z) => (
          <View key={z.zone} className="flex-row items-center gap-1.5">
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: z.color }} />
            <Text className="text-ink/55 text-[12px] font-medium">{z.zone} · {z.minutes}m</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PaywallView({ navigation, onUnlock }) {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <View className="flex-1 px-7 py-6">
        <BackButton onPress={() => navigation.goBack()} />

        <View className="flex-1 items-center justify-center">
          <GlassCard className="w-full">
            <Text className="text-ink/40 text-[11px] font-semibold tracking-widest text-center mb-3">
              LIFETIME PASS
            </Text>
            <Text className="text-ink text-[40px] font-extrabold text-center tracking-tight mb-1">
              $15
            </Text>
            <Text className="text-ink/45 text-[13px] text-center mb-6">
              one-time — not a subscription
            </Text>

            <View className="gap-2.5 mb-6">
              {[
                "Split-curve & stroke rate analysis",
                "Heart rate zone breakdown",
                "Garmin, Strava & BLE sync",
                "AI Coach insights",
              ].map((line) => (
                <View key={line} className="flex-row items-center gap-2.5">
                  <View className="w-1.5 h-1.5 rounded-full bg-ink/50" />
                  <Text className="text-ink/70 text-[13.5px]">{line}</Text>
                </View>
              ))}
            </View>

            <FrostedButton label="Unlock Lifetime Access" variant="solid" onPress={onUnlock} />
          </GlassCard>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function PremiumDashboard({ navigation }) {
  const { isPremium, unlockPremium } = useApp();
  const [garminOn, setGarminOn] = useState(true);
  const [stravaOn, setStravaOn] = useState(false);
  const [bleOn, setBleOn] = useState(true);

  if (!isPremium) {
    // TODO: replace with real IAP purchase flow before calling unlockPremium().
    return <PaywallView navigation={navigation} onUnlock={unlockPremium} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>

        <View className="flex-row items-center gap-3 mb-6 mt-2">
          <BackButton onPress={() => navigation.goBack()} />
          <Text className="text-ink text-[22px] font-extrabold tracking-tight">
            Premium Analytics
          </Text>
        </View>

        {/* Split-curve simulator */}
        <GlassCard className="mb-4">
          <Text className="text-ink text-[15px] font-bold mb-3">Split Curve · Last 2K</Text>
          <SplitCurveGraph />
          <Text className="text-ink/40 text-[12px] mt-2">
            Faster splits render higher on the curve
          </Text>
        </GlassCard>

        {/* Heart rate zones */}
        <GlassCard className="mb-4">
          <Text className="text-ink text-[15px] font-bold mb-3">Heart Rate Zones</Text>
          <HeartRateZoneBars />
        </GlassCard>

        {/* Integrations toggle panel */}
        <GlassCard className="mb-4">
          <Text className="text-ink text-[15px] font-bold mb-4">Integrations</Text>

          <View className="flex-row items-center justify-between py-2.5">
            <Text className="text-ink/75 text-[14px] font-medium">Garmin Connect</Text>
            <Switch value={garminOn} onValueChange={setGarminOn} trackColor={{ true: "#1C1C1F", false: "#E4E4E7" }} />
          </View>
          <View className="h-[1px] bg-ink/5" />

          <View className="flex-row items-center justify-between py-2.5">
            <Text className="text-ink/75 text-[14px] font-medium">Strava</Text>
            <Switch value={stravaOn} onValueChange={setStravaOn} trackColor={{ true: "#1C1C1F", false: "#E4E4E7" }} />
          </View>
          <View className="h-[1px] bg-ink/5" />

          <View className="flex-row items-center justify-between py-2.5">
            <Text className="text-ink/75 text-[14px] font-medium">BLE Heart Rate Monitor</Text>
            <Switch value={bleOn} onValueChange={setBleOn} trackColor={{ true: "#1C1C1F", false: "#E4E4E7" }} />
          </View>
        </GlassCard>

        {/* AI Coach insight box */}
        <GlassCard>
          <View className="flex-row items-center gap-2 mb-2.5">
            <Text className="text-[15px]">🧠</Text>
            <Text className="text-ink text-[15px] font-bold">AI Coach</Text>
          </View>
          <Text className="text-ink/65 text-[14px] leading-relaxed">
            Your split times tighten up in the middle 1000m but fade in the
            final 250m. Try adding one 4x500m interval session this week,
            with the last rep at target race pace, to build late-piece
            speed endurance.
          </Text>
          <Text className="text-ink/30 text-[11px] mt-3">
            Generated locally from your training log · open-source model
          </Text>
        </GlassCard>

      </ScrollView>
    </SafeAreaView>
  );
}
