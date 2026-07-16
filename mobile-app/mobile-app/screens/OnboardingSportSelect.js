// screens/OnboardingSportSelect.js
//
// Onboarding Screen B — athlete picks their primary sport. Stored in
// AppContext and later used to weight which metrics the dashboards show
// (e.g. rowing splits vs. SkiErg-specific pacing).

import React, { useState } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import BackButton from "../components/BackButton";
import FrostedButton from "../components/FrostedButton";
import { useApp } from "../AppContext";

const SPORTS = [
  { id: "rowing", label: "Rowing", sub: "Concept2 RowErg / on-water" },
  { id: "skierg", label: "SkiErg", sub: "Concept2 SkiErg" },
  { id: "bikeerg", label: "BikeErg", sub: "Concept2 BikeErg" },
];

export default function OnboardingSportSelect({ navigation }) {
  const { setSport } = useApp();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    setSport(selected);
    navigation.navigate("OnboardingTierSelect");
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <View className="flex-1 px-7 py-6">
        <BackButton onPress={() => navigation.goBack()} />

        <Text className="text-ink/40 text-[12px] font-semibold tracking-widest mt-8 mb-3">
          STEP 1 OF 3
        </Text>
        <Text className="text-ink text-[28px] font-extrabold tracking-tight mb-8">
          What's your sport?
        </Text>

        <View className="gap-3">
          {SPORTS.map((sport) => {
            const isSelected = selected === sport.id;
            return (
              <Pressable
                key={sport.id}
                onPress={() => setSelected(sport.id)}
                className={`rounded-2xl border px-5 py-4 ${
                  isSelected ? "border-ink bg-white/70" : "border-zinc-200 bg-white/40"
                }`}
              >
                <Text className="text-ink text-[16px] font-bold mb-0.5">{sport.label}</Text>
                <Text className="text-ink/45 text-[13px]">{sport.sub}</Text>
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
