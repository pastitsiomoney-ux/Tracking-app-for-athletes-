// AppContext.js
//
// Global app state: athlete profile, sport/tier, team membership, and
// training stats used to power the team leaderboard.
//
// unlockPremium mirrors a real IAP flow in production (see TODO below).

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

// Mock teammates seeded in so the leaderboard has something to compare
// against during development. Replace with a real backend call once you
// have one — see joinTeam()'s TODO.
const MOCK_TEAMMATES = [
  { id: "t1", name: "Jordan P.", meters: 182400 },
  { id: "t2", name: "Alex R.", meters: 164200 },
  { id: "t3", name: "Sam T.", meters: 149800 },
  { id: "t4", name: "Casey M.", meters: 121300 },
];

export function AppProvider({ children }) {
  const [athleteName, setAthleteName] = useState("");
  const [sport, setSport] = useState(null); // "rowing" | "skierg" | "bikeerg"
  const [tier, setTier] = useState(null); // "recreational" | "club" | "elite"
  const [weightLog, setWeightLog] = useState([]); // [{ date, kg }]
  const [distanceLog, setDistanceLog] = useState([
    { date: new Date().toISOString(), meters: 96000 },
  ]);
  const [isPremium, setIsPremium] = useState(false);
  const [team, setTeam] = useState(null); // { id, name, code }

  const logWeight = (kg) => {
    setWeightLog((prev) => [...prev, { date: new Date().toISOString(), kg }]);
  };

  const logDistance = (meters) => {
    setDistanceLog((prev) => [...prev, { date: new Date().toISOString(), meters }]);
  };

  const totalMeters = distanceLog.reduce((sum, entry) => sum + entry.meters, 0);

  const generateInviteCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const createTeam = (name) => {
    const newTeam = { id: `team_${Date.now()}`, name, code: generateInviteCode() };
    setTeam(newTeam);
    return newTeam;
  };

  const joinTeam = (code) => {
    // TODO: replace with a real API call that validates the code against a
    // backend and returns the actual team record (name, roster, etc). For
    // now, any non-empty code creates a placeholder team so the flow can
    // be tested end-to-end before a backend exists.
    const newTeam = { id: `team_${code}`, name: "Riverside Rowing Club", code: code.toUpperCase() };
    setTeam(newTeam);
    return newTeam;
  };

  const unlockPremium = () => {
    // TODO: verify IAP receipt here before trusting this flag.
    setIsPremium(true);
  };

  const leaderboard = [
    ...MOCK_TEAMMATES,
    { id: "me", name: athleteName || "You", meters: totalMeters, isMe: true },
  ].sort((a, b) => b.meters - a.meters);

  const value = {
    athleteName,
    setAthleteName,
    sport,
    setSport,
    tier,
    setTier,
    weightLog,
    logWeight,
    distanceLog,
    logDistance,
    totalMeters,
    isPremium,
    unlockPremium,
    team,
    createTeam,
    joinTeam,
    leaderboard,
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
