// screens/OnboardingMetrics.js
//
// Onboarding Screen D — captures a starting weight (used for the weight
// tracker graph on the Home Dashboard) plus optional height, seeding the
// athlete's very first data point.

import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import BackButton from "../components/BackButton";
import FrostedButton from "../components/FrostedButton";
import { useApp } from "../AppContext";

export default function OnboardingMetrics({ navigation }) {
  const { logWeight } = useApp();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleFinish = () => {
    const parsedWeight = parseFloat(weight);
    if (!Number.isNaN(parsedWeight) && parsedWeight > 0) {
      logWeight(parsedWeight);
    }
    navigation.reset({ index: 0, routes: [{ name: "HomeDashboard" }] });
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="flex-1 px-7 py-6">
          <BackButton onPress={() => navigation.goBack()} />

          <Text className="text-ink/40 text-[12px] font-semibold tracking-widest mt-8 mb-3">
            STEP 3 OF 3
          </Text>
          <Text className="text-ink text-[28px] font-extrabold tracking-tight mb-2">
            A starting point.
          </Text>
          <Text className="text-ink/50 text-[14.5px] mb-8 leading-relaxed">
            Used to chart your weight trend over time. You can update this any
            time in Settings.
          </Text>

          <View className="mb-4">
            <Text className="text-ink/45 text-[12px] font-semibold mb-2">WEIGHT (KG)</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              placeholder="72.5"
              keyboardType="decimal-pad"
              className="border border-zinc-200 bg-white/50 rounded-2xl px-5 py-4 text-ink text-[16px]"
            />
          </View>

          <View>
            <Text className="text-ink/45 text-[12px] font-semibold mb-2">HEIGHT (CM) · OPTIONAL</Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              placeholder="180"
              keyboardType="decimal-pad"
              className="border border-zinc-200 bg-white/50 rounded-2xl px-5 py-4 text-ink text-[16px]"
            />
          </View>

          <View className="flex-1" />

          <FrostedButton
            label="Finish Setup"
            variant="solid"
            disabled={!weight}
            onPress={handleFinish}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
