import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";

import { AuthContext } from "@/app/_layout";

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";
import { supabase } from "@/utils/supabase";
import { getPoints, getMostOrderedItems } from "@/utils/supabaseHandler";

import { Text, View } from "@/components/Themed";
import Auth from "@/components/Auth";
import { useColorScheme } from "@/components/useColorScheme";

async function getAllOrders(userid : string) {
  return await supabase.from("orders").select("*").eq("customer_id", userid);
}

export default function AccountScreen() {
  const { user } = React.useContext(AuthContext);
  const [points, setPoints] = React.useState(0);
  const [mostSelected, setMostSelected] = React.useState("Crêpes");
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (user) {
      getPoints(user?.id).then((data) => {
        setPoints(data);
      });
      getMostOrderedItems(user?.id).then((data) => {
        setMostSelected(data as string);
      });
    }
  }, [user]);

  const styles = StyleSheet.create({
    container: {
      marginTop: "20%",
      alignItems: "center",
    },
    constainerBis: {
      width: "90%",
      flexDirection: "column",
    },
    constainerTier: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 20,
    },
    title: {
      fontSize: 34,
      fontFamily: fonts?.bold,
      color: Colors[colorScheme as keyof typeof Colors].text,
    },
    subTitle: {
      fontSize: 17,
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      fontFamily: fonts?.medium,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      color: Colors[colorScheme as keyof typeof Colors].text,
      fontFamily: fonts?.bold,
      marginVertical: 10,
    },
    text: {
      color: Colors[colorScheme as keyof typeof Colors].text,
      fontSize: 16,
      fontFamily: fonts?.regular,
    },
    button: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].accent,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 40,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontFamily: fonts?.bold,
    },
    benefit: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 8,
    },
    benefitEmoji: {
      marginRight: 10,
      fontSize: 18,
    },
    settingsButton: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    settingsButtonText: {
      color: Colors[colorScheme as keyof typeof Colors].accent,
      fontSize: 16,
      fontFamily: fonts?.medium,
      marginLeft: 5,
    },
    card: {
      backgroundColor: Colors[colorScheme as keyof typeof Colors].secondaryBg,
      borderRadius: 8,
      padding: 20,
      marginVertical: 10,
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
    },
    cardContent: {
      flexDirection: "column",
    },
    minInfoContainer : {
      marginVertical: 20,
    },
    minInfo: {
      color: Colors[colorScheme as keyof typeof Colors].secondaryText,
      fontSize: 14,
      fontFamily: fonts?.medium,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.constainerBis}>
        {user ? (
          <View style={styles.constainerTier}>
            <Image
              source={{ uri: user?.user_metadata.avatar_url }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
            <View>
              <Text style={styles.title}>Toi ✨</Text>
              <Text style={styles.subTitle}>
                On est contents de te revoir !
              </Text>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Connecte toi ✨</Text>
            <Text style={styles.subTitle}>Tu verras, ça vaut le coup !</Text>
          </>
        )}

        {user ? (
          <>
            <Text style={styles.sectionTitle}>A propos de toi</Text>
            <View style={styles.card}>
              <FontAwesome6
                name="coins"
                size={30}
                color={Colors[colorScheme as keyof typeof Colors].accent}
              />
              <View style={styles.cardContent}>
                <Text style={styles.text}>
                  Tu as{" "}
                  <Text
                    style={{
                      color: Colors[colorScheme as keyof typeof Colors].text,
                      fontFamily: fonts?.bold,
                      fontSize: 18,
                    }}
                  >
                    {points}
                  </Text>{" "}
                  points
                </Text>
                <Text style={styles.text}>Le premier est à 1600 pts.</Text>
              </View>
            </View>

            <View style={styles.card}>
              <FontAwesome6
                name="cake-candles"
                size={30}
                color={Colors[colorScheme as keyof typeof Colors].accent}
              />
              <View style={styles.cardContent}>
                <Text style={styles.text}>
                  Tu as commandé{"\n"}
                  le plus souvent des {mostSelected}
                </Text>
              </View>
            </View>

            <View style={styles.minInfoContainer}>
              <Text style={styles.minInfo}>
                Tkt on garde tes informations bien au chaud 🔒
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => supabase.auth.signOut()}
            >
              <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Pourquoi se connecter ?</Text>
            <Text style={styles.subTitle}>On sort les violons 🎻</Text>
            <View style={styles.benefit}>
              <Text style={styles.benefitEmoji}>🏆</Text>
              <Text style={styles.text}>Pour récolter des points</Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitEmoji}>🛒</Text>
              <Text style={styles.text}>Pour pouvoir commander</Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitEmoji}>🎁</Text>
              <Text style={styles.text}>Pour avoir des surprises</Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitEmoji}>📣</Text>
              <Text style={styles.text}>
                Pour avoir les infos en avant-première
              </Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitEmoji}>📈</Text>
              <Text style={styles.text}>Pour qu'on récolte tes données</Text>
            </View>

            <Auth />
          </>
        )}
      </View>
    </View>
  );
}
