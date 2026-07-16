// App.js
//
// Root entry point. Sets up the navigation stack:
//   Onboarding: Welcome -> SportSelect -> TierSelect -> Metrics
//   Main:       HomeDashboard <-> PremiumDashboard (locked behind $15)
//
// AppProvider wraps everything so onboarding answers and the premium
// unlock flag are available from any screen without prop-drilling.

import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider } from "./AppContext";

import OnboardingWelcome from "./screens/OnboardingWelcome";
import OnboardingSportSelect from "./screens/OnboardingSportSelect";
import OnboardingTierSelect from "./screens/OnboardingTierSelect";
import OnboardingMetrics from "./screens/OnboardingMetrics";
import HomeDashboard from "./screens/HomeDashboard";
import PremiumDashboard from "./screens/PremiumDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="dark" backgroundColor="#FAFAFA" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnboardingWelcome"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#FAFAFA" },
            animation: "slide_from_right",
          }}
        >
          {/* Onboarding flow (Screens A–D) */}
          <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcome} />
          <Stack.Screen name="OnboardingSportSelect" component={OnboardingSportSelect} />
          <Stack.Screen name="OnboardingTierSelect" component={OnboardingTierSelect} />
          <Stack.Screen name="OnboardingMetrics" component={OnboardingMetrics} />

          {/* Main app */}
          <Stack.Screen name="HomeDashboard" component={HomeDashboard} />
          <Stack.Screen name="PremiumDashboard" component={PremiumDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
