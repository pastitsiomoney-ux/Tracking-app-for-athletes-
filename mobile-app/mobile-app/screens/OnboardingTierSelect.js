// screens/OnboardingTierSelect.js
//
// Onboarding Screen C — experience tier drives which metrics the home and
// premium dashboards surface first (e.g. an "Elite" athlete sees stroke
// rate and split-curve detail up front; "Recreational" sees simpler
// trends).

import React, { useState } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import BackButton from "../components/BackButton";
import FrostedButton from "../components/FrostedButton";
import { useApp } from "../AppContext";

const TIERS = [
  {
    id: "recreational",
    label: "Recreational",
    sub: "Training for fitness and consistency",
  },
  {
    id: "club",
    label: "Club",
    sub: "Racing locally, chasing PBs",
  },
  {
    id: "elite",
    label: "Elite",
    sub: "National / collegiate level competition",
  },
];

export default function OnboardingTierSelect({ navigation }) {
  const { setTier } = useApp();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    setTier(selected);
    navigation.navigate("OnboardingMetrics");
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <View className="flex-1 px-7 py-6">
        <BackButton onPress={() => navigation.goBack()} />

        <Text className="text-ink/40 text-[12px] font-semibold tracking-widest mt-8 mb-3">
          STEP 2 OF 3
        </Text>
        <Text className="text-ink text-[28px] font-extrabold tracking-tight mb-8">
          What's your level?
        </Text>

        <View className="gap-3">
          {TIERS.map((tier) => {
            const isSelected = selected === tier.id;
            return (
              <Pressable
                key={tier.id}
                onPress={() => setSelected(tier.id)}
                className={`rounded-2xl border px-5 py-4 ${
                  isSelected ? "border-ink bg-white/70" : "border-zinc-200 bg-white/40"
                }`}
              >
                <Text className="text-ink text-[16px] font-bold mb-0.5">{tier.label}</Text>
                <Text className="text-ink/45 text-[13px]">{tier.sub}</Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-1" />

        <FrostedButton
          label="Continue"
          variant="solid"
          disabled={!selected}
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
