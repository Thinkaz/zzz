import React from "react";
import { StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { Link } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../_layout";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import OldCommand from "@/components/ItemDropdown";

import { supabase } from "@/utils/supabase";
import Colors from "@/utils/Colors";
import fonts from "@/utils/fonts";

async function getOldOrders(userid : string) {
  return await supabase.from("orders").select("*").eq("finished", true).eq("customer_id", userid);
}

async function betterContentShow(content: string[], theme: any) {
  const betterContent = content.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const style = StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantity: {
      fontFamily: fonts?.bold,
      color: Colors[theme as keyof typeof Colors].text,
      fontSize: 13,
    },
    quantityBg: {
      backgroundColor: Colors[theme as keyof typeof Colors].thirdBg,
      borderRadius: 8,
      padding: 8,
      marginRight: 12,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
      fontFamily: fonts?.medium,
      color: Colors[theme as keyof typeof Colors].text,
      fontSize: 15,
    },
  });

  return Object.entries(betterContent).map(([key, value]) => (
    <View key={key} style={style.itemContainer}>
      <View style={style.quantityBg}>
        <Text style={style.quantity}>{value}</Text>
      </View>
      <Text style={style.item}>
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </Text>
    </View>
  ));
}

function contentShow(content: string[]) {
  return Object.entries(
    content.reduce((acc: { [key: string]: number }, item: string) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([item, count]) => `${count}x ${item}`)
    .join(", ");
}

export default function CommandScreen() {
  const [inProgress, setInProgress] = useState(false);
  const [oldOrders, setOldOrders] = useState<any[]>([]);
  const [commande, setCommande] = useState<any | null>(null);
  const [content, setContent] = useState<any | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const colorScheme = useColorScheme();
  const { user } = React.useContext(AuthContext);

  const fetchData = async () => {
    if (user?.id) {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user?.id)
        .eq("finished", false)
        .single();

      if (data) {
        setInProgress(true);
        setCommande(data);
        setContent(await betterContentShow(data.content, colorScheme));
      } else {
        setInProgress(false);
        setCommande(null);
        setContent(null);
      }

      const oldOrder = await getOldOrders(user?.id);
      setOldOrders(oldOrder?.data ?? []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();

      const subscribeToCommandeChanges = async () => {
        if (user?.id) {
          const sub = supabase
            .channel("orders")
            .on(
              "postgres_changes",
              {
                event: "UPDATE",
                schema: "public",
                table: "orders",
                filter: `customer_id=eq.${user?.id}`,
              },
              (payload) => {
                fetchData();
              }
            )
            .subscribe();

          setSubscription(sub);
        }
      };

      subscribeToCommandeChanges();

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, [colorScheme])
  );

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme as keyof typeof Colors].background,
      paddingHorizontal: 16,
      paddingTop: "20%",
    },
    title: {
      fontSize: 34,
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].text,
      marginBottom: 8,
    },
    subTitle: {
      fontSize: 17,
      fontFamily: fonts?.medium,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      marginBottom: 24,
    },
    contentTitle: {
      fontSize: 22,
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].text,
      marginBottom: 16,
    },
    emptyContent: {
      fontFamily: fonts?.regular,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      fontSize: 17,
    },
    contentContainer: {
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
      gap: 16,
    },
    spacing: {
      height: "3.5%",
    },
    oldorders: {
      flexDirection: "column",
      gap: 16,
    },
  });

  return (
    <View style={style.container}>
      {inProgress ? (
        <>
          <Text style={style.title}>En cours 🌭</Text>
          <Text style={style.subTitle}>
            Commande #{commande?.id} - Salle {commande?.salle}
          </Text>
          <Text style={style.contentTitle}>Contenu</Text>
          {content?.length ? (
            <View style={style.contentContainer}>{content}</View>
          ) : (
            <Text style={style.emptyContent}>Aucun contenu</Text>
          )}
        </>
      ) : (
        <>
          <Text style={style.title}>Commander 🥤</Text>
          <Text style={style.subTitle}>
            Vous n'avez pas de commande en cours
          </Text>
          <Link href="/modal">
            <View style={style.contentContainer}>
              <Text style={style.emptyContent}>Commander</Text>
            </View>
          </Link>
        </>
      )}
      <View style={style.spacing}></View>
      <Text style={style.contentTitle}>Anciennes commandes 🕙</Text>
      <View style={style.oldorders}>
        {oldOrders.map((order) => (
          <OldCommand key={order.id} timestamp={order.created_at} salle={order.salle} content={contentShow(order.content)} />
        ))}
      </View>
    </View>
  );
}
