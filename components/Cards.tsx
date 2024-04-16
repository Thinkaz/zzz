import React from "react";
import { View, Text, StyleSheet } from "react-native";

import fonts from "@/utils/fonts";

const timeHandle = (hour: number) => {
    const oneHour = 20; //let's put the hour height at 20px
    return hour * oneHour;
};


export default function CalendarCard({
  title,
  description,
  color,
  time,
}: {
  title: string;
  description: string;
  color: string;
  time: number;
}) {
  return (
    <View style={[style.cardBg, { backgroundColor: color }, {paddingVertical: timeHandle(time)}]}>
      <Text style={style.cardTitle}>{title}</Text>
      <Text style={style.cardDescription}>{description}</Text>
      <Text style={style.cardDescription}>{time}</Text>
    </View>
  );
}

let style = StyleSheet.create({
  cardBg: {
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: fonts?.bold,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts?.regular,
  },
});
