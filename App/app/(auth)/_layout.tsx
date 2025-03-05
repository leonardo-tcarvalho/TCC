import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
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
          width: "80%", // Largura reduzida para não ocupar toda a tela
          height: 60, // Altura do menu
          bottom: 20, // Distância do rodapé para dar o efeito flutuante]
          transform: [{ translateX: "10%" }], // Centraliza o menu
          borderRadius: 25,
          backgroundColor: "#27272a",
          borderColor: "#27272a",
          elevation: 50, // Sombra no Android
          shadowOpacity: 0.9, // Sombra no iOS
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="login" color={color} size={size} />
            </View>
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
