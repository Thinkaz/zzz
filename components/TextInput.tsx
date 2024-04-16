import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useColorScheme } from "./useColorScheme";

import Colors from "@/utils/Colors";
import fonts from "@/utils/fonts";

interface TextImputProps {
  id: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  isNumber?: boolean;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCompleteType?: "off" | "username" | "password" | "email" | "name";
}

export default function AppleStyleTextInput({
  id,
  placeholder,
  onChangeText,
  value,
  isNumber = false,
  autoCapitalize = "none",
  autoCompleteType = "off",
  ...rest
}: TextImputProps) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].secondaryBg,
      borderColor: Colors[colorScheme as keyof typeof Colors].border,
      width: "80%",
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      shadowColor: "#000000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },
    input: {
      fontSize: 16,
      fontFamily: fonts?.regular,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        id={id}
        style={styles.input}
        placeholder={placeholder || "Placeholder"}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={isNumber ? "numeric" : "default"}
        returnKeyType="done"
        clearButtonMode="while-editing"
        {...rest}
      />
    </View>
  );
}
