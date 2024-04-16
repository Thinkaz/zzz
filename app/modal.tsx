import { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import { ExpoPushToken } from 'expo-notifications';
import { useRouter } from 'expo-router';

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";
import { supabase, retriveName } from "@/utils/supabase";
import isConnected from "@/utils/connected";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import TextImput from "@/components/TextInput";
import ModalBase from "@/components/ModalBase";

async function sendNotificationToAdmins() {
  try {
    // Retrieve the list of admin users from your Supabase database
    const { data: adminUsers, error } = await supabase
      .from('users')
      .select('expo_push_token')
      .eq('admin', true);

    if (error) {
      console.error('Error retrieving admin users:', error);
      return;
    }

    // Send a notification to each admin user
    await Promise.all(
      adminUsers.map(async (admin) => {
        if (admin.expo_push_token) {
          try {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'New Order',
                body: 'A new order has been placed.',
              },
              trigger: null,
              identifier: admin.expo_push_token,
            });
          } catch (error) {
            console.error('Error sending notification:', error);
          }
        }
      })
    );
  } catch (error) {
    console.error('Error sending notification to admin users:', error);
  }
}

async function retrieveIdfromName(name: string) {
  const { data, error } = await supabase.from("users").select("id").eq("name", name).single();
  if (error) {
    console.error("Error while retrieving user id", error);
  } else {
    const id = data?.id;
    return id;
  }
}

async function createOrder(customer: string, salle: string, items: string[]) {
  const customer_id = await retrieveIdfromName(customer);
  const { data, error } = await supabase.from("orders").insert({
    customer_id: customer_id,
    salle: salle,
    content: items,
  });
  if (error) {
    console.error("Error while creating order", error);
  }
}

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [connected, setConnected] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const [customer, setCustomer] = useState("");
  const [salle, setSalle] = useState("");

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelectionChange = (items: string[]) => {
    setSelectedItems(items);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const isUserConnected = await isConnected();
      setConnected(isUserConnected);

      if (isUserConnected) {
        const userName = await retriveName();
        setName(userName);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    setCustomer(name);
  }, [name]);

  const styles = StyleSheet.create({
    modalTop: {
      width: 38,
      height: 4,
      backgroundColor: Colors[colorScheme as keyof typeof Colors].inactiveTab,
      borderRadius: 8,
      position: "absolute",
      top: "2%",
    },
    container: {
      flex: 1,
      width: "85%",
      paddingTop: 40,
      flexDirection: "column",
      alignItems: "baseline",
      height: "100%",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].accent,
    },
    subtitle: {
      fontSize: 17,
      fontWeight: "600",
      paddingBottom: 10,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
    },
    content: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 30,
    },
    separator: {
      marginVertical: 15,
      height: 1,
      width: "80%",
    },
    modalCloseButton: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].button,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      position: "absolute",
      bottom: 10,
    },
    modalCloseButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
    },
  });

  return (
    <ModalBase>
      <Text style={styles.title}>Commander 🥤</Text>
      <Text style={styles.subtitle}>Promis on ne te posera pas de lapin</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0)"
      />
      <View style={styles.content}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ alignSelf: "baseline", paddingLeft: "10%" }}>
            <Text style={styles.subtitle}>Nom</Text>
          </View>
          <TextImput
            id="customer"
            placeholder="Nom de la commande"
            onChangeText={setCustomer} // Update customer state
            value={customer}
            isNumber={false}
            autoCapitalize="words"
            autoCompleteType="name"
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ alignSelf: "baseline", paddingLeft: "10%" }}>
            <Text style={styles.subtitle}>Salle</Text>
          </View>
          <TextImput
            id="salle"
            placeholder="Numéro de salle"
            onChangeText={setSalle}
            value={salle}
            isNumber={true}
            maxLength={4}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ alignSelf: "baseline", paddingLeft: "10%" }}>
            <Text style={styles.subtitle}>Kestuveux ? (max 4)</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center", position: "absolute", bottom:"7%" }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 4,
            paddingHorizontal: 15,
            minWidth: 44,
            backgroundColor: Colors[colorScheme as keyof typeof Colors].accent,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={async () => {
            if (
              customer.length === 0 ||
              salle.length === 0 ||
              selectedItems.length === 0
            ) {
              Alert.alert("Erreur", "Veuillez remplir tous les champs");
            } else {
              Alert.alert(
                "C'est fait",
                "Merci pour ta commande " + customer + " ! 🥤"
              );
              await createOrder(customer, salle, selectedItems);
              await sendNotificationToAdmins();
              router.back();
            }
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontFamily: fonts?.bold,
            }}
          >
            Commander
          </Text>
        </TouchableOpacity>
      </View>
    </ModalBase>
  );
}
