import React, { useRef } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "@/app/_layout";

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";
import { View } from "./Themed";

export default function ({
  timestamp,
  salle,
  content,
}: {
  timestamp: EpochTimeStamp;
  salle: string;
  content: string;
}) {
  const colorScheme = useColorScheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const betterDates = (dateString: EpochTimeStamp) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("fr-FR", { month: "long" });
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month}, ${hours}:${minutes}`;
  };

  const toggleContent = () => {
    setIsOpen(!isOpen);
    Animated.timing(animatedValue, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const contentHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      paddingVertical: 16,
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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 3,
    },
    headerText: {
      fontSize: 16,
      fontFamily: fonts?.medium,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
    content: {
      fontSize: 14,
      fontFamily: fonts?.regular,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      marginTop: 8,
    },
    secondaryText: {
      fontSize: 14,
      fontFamily: fonts?.regular,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
    },
    icon: {
      marginLeft: "auto",
    },
    contentContainer: {
      overflow: "hidden",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleContent}>
        <Text style={styles.headerText}>Salle : {salle}</Text>
        <View style={styles.icon}>
          <Entypo
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color={Colors[colorScheme as keyof typeof Colors].secondaryText}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.secondaryText}>{betterDates(timestamp)}</Text>
      <Animated.View
        style={[styles.contentContainer, { height: contentHeight }]}
      >
        <Text style={styles.content}>{content}</Text>
      </Animated.View>
    </View>
  );
}
