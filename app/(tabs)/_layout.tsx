import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="patrol"
        options={{
          title: "Patrol",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="walk" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="alert"
        options={{
          title: "Alert",
          tabBarIcon: ({ size }) => (
            <View style={styles.alertIconContainer}>
              <Ionicons name="alert-circle" color={Colors.danger} size={size} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 4,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  alertIconContainer: {
    position: "relative",
  },
});
