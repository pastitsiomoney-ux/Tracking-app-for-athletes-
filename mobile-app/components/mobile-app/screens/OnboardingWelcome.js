// screens/OnboardingWelcome.js
//
// Onboarding Screen A — first thing an athlete sees. Clean typography,
// minimal chrome, one clear next step.

import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import FrostedButton from "../components/FrostedButton";

export default function OnboardingWelcome({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <View className="flex-1 px-7 justify-between py-10">

        {/* Top mark */}
        <View className="flex-row items-center gap-2 mt-2">
          <View className="w-7 h-7 rounded-lg border border-ink items-center justify-center">
            <Text className="text-ink text-[13px] font-extrabold">S</Text>
          </View>
          <Text className="text-ink text-[15px] font-extrabold tracking-tight">Splitline</Text>
        </View>

        {/* Center copy */}
        <View>
          <Text className="text-ink/40 text-[12px] font-semibold tracking-widest mb-4">
            WELCOME
          </Text>
          <Text className="text-ink text-[38px] font-extrabold leading-[1.05] tracking-tight mb-4">
            Every split,{"\n"}zero subscription.
          </Text>
          <Text className="text-ink/55 text-[15.5px] leading-relaxed max-w-[280px]">
            Splitline reads your erg screen, tracks your progress, and never
            asks for a monthly fee.
          </Text>
        </View>

        {/* CTA */}
        <View>
          <FrostedButton
            label="Get Started"
            variant="solid"
            onPress={() => navigation.navigate("OnboardingSportSelect")}
          />
          <Text className="text-center text-ink/35 text-[12px] mt-4">
            Takes about a minute
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
