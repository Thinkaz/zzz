import { StyleSheet, ScrollView } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../_layout";

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";

import { Text, View } from "@/components/Themed";
const { useColorScheme } = require("@/components/useColorScheme");
import TimelineSwiper from "@/components/CalendarItem";
import TodaysMenu from "@/components/Menu";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  const { user } = useContext(AuthContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: "20%",
      paddingBottom: "30%",
      alignItems: "center",
    },
    containerBis: {
      width: "90%",
      flex: 1,
      flexDirection: "column",
    },
    containerTier: {
      flexDirection: "row",
      alignContent: "center",
      alignItems: "flex-start",
    },
    title: {
      fontSize: 34,
      fontWeight: "600",
      letterSpacing: 0.7,
      fontFamily: fonts?.bold,
    },
    colored: {
      fontSize: 34,
      fontWeight: "600",
      letterSpacing: 0.7,
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].accent,
    },

    subtitle: {
      fontSize: 20,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      fontWeight: "800",
      fontFamily: fonts?.medium,
    },
    subtiertitle: {
      marginTop: 30,
      fontSize: 22,
      color: Colors[colorScheme as keyof typeof Colors].text,
      fontFamily: fonts?.bold,
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerBis}>
          <Text style={styles.containerTier}>
            <Text style={styles.title}>Salut{user ? " " : ""}</Text>
            <Text style={styles.colored}>{user?.user_metadata.name.split(" ")[0]}</Text>
            <Text style={styles.title}> 👋</Text>
          </Text>
          <Text style={styles.subtitle}>
            {user
              ? "Re bébé, comment va ?"
              : "Pense à te connecter pour récolter tes points"}
          </Text>
          <TodaysMenu />
          <View>
            <View>
              <Text style={styles.subtiertitle}>Planning de la semaine</Text>
            </View>
            <View>
              <TimelineSwiper />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}