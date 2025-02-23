import { Tabs } from "expo-router";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#505057",
        tabBarStyle: {
          backgroundColor: "#27272a",
          borderColor: "#18181b",
          borderTopWidth: 1,
          elevation: 50, // Sombra no Android
          shadowOpacity: 0.9, // Sombra no iOS
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
