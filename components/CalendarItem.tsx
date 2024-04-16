import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useColorScheme } from "@/components/useColorScheme";

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";

const currentDayIndex = (new Date().getDay() + 6) % 7;
const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const TimelineItem = ({
  code,
  name,
  startTime,
  endTime,
  color,
  isLast,
  ...props
}) => {

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
    },
    itemBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors[colorScheme as keyof typeof Colors].border,
    },
    itemColor: {
      width: 3,
      height: "100%",
      marginRight: 15,
      borderRadius: 5,
    },
    itemContent: {
      flex: 1,
    },
    itemCode: {
      fontSize: 16,
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
    itemName: {
      fontSize: 14,
      fontFamily: fonts?.regular,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
    itemTime: {
      fontSize: 14,
      fontFamily: fonts?.medium,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
  });

  return (
    <View style={[styles.item, !isLast && styles.itemBorder]}>
      <View style={[styles.itemColor, { backgroundColor: color }]} />
      <View style={styles.itemContent}>
        <Text style={styles.itemCode}>{code}</Text>
        <Text style={styles.itemName}>{name}</Text>
      </View>
      <View>
        <Text style={styles.itemTime}>{`${startTime}`}</Text>
        <Text
          style={[styles.itemTime, { color: Colors[colorScheme as keyof typeof Colors].secondaryText }]}
        >{`${endTime}`}</Text>
      </View>
    </View>
  );
};

const Timeline = ({ timelineData, date }) => {
  const colorScheme = useColorScheme();

  const style = StyleSheet.create({
    container: {
      paddingVertical: 80,
      paddingHorizontal: 10,
    },
    date: {
      fontSize: 24,
      fontFamily: fonts?.bold,
      marginBottom: 10,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.date}>{date}</Text>
      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          code={item.code}
          name={item.name}
          startTime={item.startTime}
          endTime={item.endTime}
          color={item.color}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </View>
  );
};

const TimelineSwiper = () => {
  const colorScheme = useColorScheme();

  const timelineData = [
    {
      date: "Lundi",
      items: [
        {
          code: "IGI-2203:TPS",
          name: "5101+",
          startTime: "08:00",
          endTime: "10:00",
          color: "#4CAF50",
        },
        {
          code: "IGE-2203:COURS 5",
          name: "0210",
          startTime: "10:00",
          endTime: "12:00",
          color: "#2196F3",
        },
        {
          code: "SFP-2207 : COURS 14",
          name: "0160",
          startTime: "13:00",
          endTime: "15:00",
          color: "#FF9800",
        },
        {
          code: "ECH-2202:TDR",
          name: "2201+",
          startTime: "17:00",
          endTime: "19:00",
          color: "#9C27B0",
        },
      ],
    },
    {
      date: "Mardi",
      items: [
        {
          code: "ABC-1234:XYZ",
          name: "9876",
          startTime: "09:00",
          endTime: "11:00",
          color: "#E91E63",
        },
        {
          code: "DEF-5678:LMN",
          name: "5432",
          startTime: "14:00",
          endTime: "16:00",
          color: "#FFC107",
        },
      ],
    },
    {
      date: "Mercredi",
      items: [
        {
          code: "IGI-2203:TPS",
          name: "5101+",
          startTime: "08:00",
          endTime: "10:00",
          color: "#4CAF50",
        },
        {
          code: "IGE-2203:COURS 5",
          name: "0210",
          startTime: "10:00",
          endTime: "12:00",
          color: "#2196F3",
        },
        {
          code: "SFP-2207 : COURS 14",
          name: "0160",
          startTime: "13:00",
          endTime: "15:00",
          color: "#FF9800",
        },
        {
          code: "ECH-2202:TDR",
          name: "2201+",
          startTime: "17:00",
          endTime: "19:00",
          color: "#9C27B0",
        },
      ],
    },
    {
      date: "Jeudi",
      items: [
        {
          code: "ABC-1234:XYZ",
          name: "9876",
          startTime: "09:00",
          endTime: "11:00",
          color: "#E91E63",
        },
        {
          code: "DEF-5678:LMN",
          name: "5432",
          startTime: "14:00",
          endTime: "16:00",
          color: "#FFC107",
        },
      ],
    },
    {
      date: "Vendredi",
      items: [
        {
          code: "IGI-2203:TPS",
          name: "5101+",
          startTime: "08:00",
          endTime: "10:00",
          color: "#4CAF50",
        },
        {
          code: "IGE-2203:COURS 5",
          name: "0210",
          startTime: "10:00",
          endTime: "12:00",
          color: "#2196F3",
        },
        {
          code: "SFP-2207 : COURS 14",
          name: "0160",
          startTime: "13:00",
          endTime: "15:00",
          color: "#FF9800",
        },
        {
          code: "ECH-2202:TDR",
          name: "2201+",
          startTime: "17:00",
          endTime: "19:00",
          color: "#9C27B0",
        },
      ],
    },
    {
      date: "Samedi",
      items: [
        {
          code: "ABC-1234:XYZ",
          name: "9876",
          startTime: "09:00",
          endTime: "11:00",
          color: "#E91E63",
        },
        {
          code: "DEF-5678:LMN",
          name: "5432",
          startTime: "14:00",
          endTime: "16:00",
          color: "#FFC107",
        },
      ],
    },
    {
      date: "Dimanche",
      items: [
        {
          code: "IGI-2203:TPS",
          name: "5101+",
          startTime: "08:00",
          endTime: "10:00",
          color: "#4CAF50",
        },
        {
          code: "IGE-2203:COURS 5",
          name: "0210",
          startTime: "10:00",
          endTime: "12:00",
          color: "#2196F3",
        },
        {
          code: "SFP-2207 : COURS 14",
          name: "0160",
          startTime: "13:00",
          endTime: "15:00",
          color: "#FF9800",
        },
        {
          code: "ECH-2202:TDR",
          name: "2201+",
          startTime: "17:00",
          endTime: "19:00",
          color: "#9C27B0",
        },
        {
          code: "ECH-2202:TDR",
          name: "2201+",
          startTime: "17:00",
          endTime: "19:00",
          color: "#9C27B0",
        },
        {
          code: "SFP-2207 : COURS 14",
          name: "0160",
          startTime: "13:00",
          endTime: "15:00",
          color: "#FF9800",
        },
      ],
    },
  ];

  const initialIndex = timelineData.findIndex(
    (timeline) => timeline.date === days[currentDayIndex]
  );

  const renderPagination = (index, total, context) => {
    const style = StyleSheet.create({
      buttonText: {
        fontSize: 13,
        color: Colors[colorScheme as keyof typeof Colors].text,
        fontWeight: "bold",
      },
      paginationContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
      },
      paginationDot: {
        width: 35,
        height: 35,
        borderRadius: 30,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      paginationDotActiveToday: {
        backgroundColor: Colors[colorScheme as keyof typeof Colors].accent,
      },
      paginationDotToday: {
        color: Colors[colorScheme as keyof typeof Colors].accent,
      },
      paginationDotActive: {
        backgroundColor: Colors[colorScheme as keyof typeof Colors].inactiveTab,
        color: Colors[colorScheme as keyof typeof Colors].background,
      },
    });
    return (
      <View style={style.paginationContainer}>
        {timelineData.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              style.paginationDot,
              index === i && style.paginationDotActive,
              index === i &&
                i === initialIndex &&
                style.paginationDotActiveToday,
            ]}
            onPress={() => context.scrollTo(i)} // Add this line
          >
            <Text
              style={[
                style.buttonText,
                index === i && i != initialIndex && style.paginationDotActive,
                index === i &&
                  i === initialIndex &&
                  style.paginationDotActiveToday,
                i === initialIndex && index !== i && style.paginationDotToday,
              ]}
            >
              {days[i].slice(0, 1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const changeTimeLineDateTitle = (date: string) => {
    if (date === days[currentDayIndex]) {
      return "Aujourd'hui ☀️";
    } else {
      return date;
    }
  };

  return (
    <Swiper
      loop={false}
      renderPagination={renderPagination}
      showsButtons={false}
      bounces={true}
      height={550}
      index={initialIndex}
    >
      {timelineData.map((timeline, index) => (
        <Timeline
          key={index}
          timelineData={timeline.items}
          date={changeTimeLineDateTitle(timeline.date)}
        />
      ))}
    </Swiper>
  );
};


export default TimelineSwiper;
