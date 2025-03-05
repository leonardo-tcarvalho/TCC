import { Tabs } from "expo-router";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#333333",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          width: "auto",
          height: 60,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 25,
          backgroundColor: "#27272a",
          borderColor: "#27272a",
          elevation: 50,
          shadowOpacity: 0.9,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        },
        tabBarIconStyle: {
          height: "100%",
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
