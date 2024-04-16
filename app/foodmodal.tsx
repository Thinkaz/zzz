import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useColorScheme } from "@/components/useColorScheme";
import ModalBase from "@/components/ModalBase";

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";

const ModalFoodScreen = () => {
  const { dish: dishString } = useLocalSearchParams();
  const dish = JSON.parse(
    Array.isArray(dishString) ? dishString[0] : dishString
  );
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    modalTitle: {
      fontSize: 28,
      fontWeight: "bold",
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].accent,
      width: "45%",
    },
    mainInfoCont: {
      flexDirection: "row",
      marginBottom: 20,
      width: "100%",
      gap: 20,
      alignItems: "center",
    },
    emojiContainer: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].thirdBg,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 100,
    },
    modalEmoji: {
      fontSize: 60,
    },
    modalSubtitle: {
      fontSize: 20,
      marginBottom: 10,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      fontFamily: fonts?.bold,
    },
    modalDescription: {
      fontSize: 16,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      width: "45%",
      fontFamily: fonts?.regular,
    },
    modalCloseButton: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].button,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      position: "absolute",
      bottom: 20,
    },
    modalCloseButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
  });

  return (
    <ModalBase>
      <View style={styles.mainInfoCont}>
        <View style={styles.emojiContainer}>
          <Text style={styles.modalEmoji}>{dish.emoji}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={styles.modalTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {dish.dish}
          </Text>
          <Text
            style={styles.modalDescription}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {dish.description}
          </Text>
        </View>
      </View>

      <Text style={styles.modalSubtitle}>Description:</Text>
    </ModalBase>
  );
};

export default ModalFoodScreen;
