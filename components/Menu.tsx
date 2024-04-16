import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Link } from "expo-router";

import { useColorScheme } from "@/components/useColorScheme";

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";

const TodaysMenu = () => {
  const todaysMenu = [
    {
      dish: "Salade César",
      emoji: "🥗",
      description:
        "Une salade fraîche et croquante, avec des croutons et du poulet grillé.",
    },
    {
      dish: "Burger Végétarien",
      emoji: "🍔",
      description:
        "Un burger végétarien avec un steak de lentilles, des tomates et de la salade.",
    },
    {
      dish: "Frites Maison",
      emoji: "🍟",
      description:
        "Des frites croustillantes, dorées à point et faites maison.",
    },
    {
      dish: "Tarte aux Pommes",
      emoji: "🥧",
      description:
        "Une tarte aux pommes caramélisées, avec une pâte feuilletée.",
    },
  ];

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    menuContainer: {
      marginTop: 30,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "600",
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].text,
      marginBottom: 15,
    },
    menuItemsContainer: {
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: Colors[colorScheme as keyof typeof Colors].secondaryBg,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    menuItemContainer: {
      paddingVertical: 12,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuEmoji: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].thirdBg,
      borderRadius: 8,
      padding: 8,
      marginRight: 12,
    },
    emojiText: {
      fontSize: 24,
    },
    menuDish: {
      fontSize: 17,
      color: Colors[colorScheme as keyof typeof Colors].text,
      fontFamily: fonts?.medium,
      flex: 1,
    },
    menuArrow: {
      fontSize: 20,
      color: Colors[colorScheme as keyof typeof Colors].inactiveTab,
      marginLeft: "auto",
    },
  });  

  return (
    <View style={[styles.menuContainer]}>
      <Text style={styles.sectionTitle}>Menu du jour</Text>
      <View style={styles.menuItemsContainer}>
        {todaysMenu.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: "/foodmodal",
              params: { dish: JSON.stringify(item) },
            }}
            asChild
          >
            <TouchableOpacity style={styles.menuItemContainer}>
              <View style={styles.menuItem}>
                <View style={styles.menuEmoji}>
                  <Text style={styles.emojiText}>{item.emoji}</Text>
                </View>
                <Text style={styles.menuDish}>{item.dish}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default TodaysMenu;
