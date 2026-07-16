// AppContext.js
//
// Lightweight global state shared across the onboarding flow and the two
// dashboards. Holds the athlete's sport, experience tier, weight/metrics,
// and whether the $15 lifetime pass has been unlocked.
//
// In production, `unlockPremium` would follow a successful App Store /
// Play Store IAP receipt validation before flipping `isPremium` to true.

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [sport, setSport] = useState(null); // "rowing" | "skierg"
  const [tier, setTier] = useState(null); // "recreational" | "club" | "elite"
  const [weightLog, setWeightLog] = useState([]); // [{ date, kg }]
  const [isPremium, setIsPremium] = useState(false);

  const logWeight = (kg) => {
    setWeightLog((prev) => [...prev, { date: new Date().toISOString(), kg }]);
  };

  const unlockPremium = () => {
    // TODO: verify IAP receipt here before trusting this flag.
    setIsPremium(true);
  };

  const value = {
    sport,
    setSport,
    tier,
    setTier,
    weightLog,
    logWeight,
    isPremium,
    unlockPremium,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}
