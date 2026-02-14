import { Stack } from "expo-router";
import React from "react";

export default function MoreLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="roster" />
    </Stack>
  );
}
