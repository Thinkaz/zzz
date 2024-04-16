import { StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";

import Colors from "@/utils/Colors";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { Feather } from '@expo/vector-icons';

export default function ModalBase(props: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const isIOS = Platform.OS === "ios";

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
    modalCloseButton: {
      position: "absolute",
      right: 20,
    },
    modalCloseButtonText: {
      fontSize: 18,
      fontWeight: "400",
      color: "#000",
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme as keyof typeof Colors].background,
        alignItems: "center",
        paddingTop: isIOS ? 0 : 30,
      }}
    >
      {isIOS && <View style={styles.modalTop} />}
      {!isIOS && (
        <Link 
            href={"../"}
            style={{
                position: "absolute",
                left: 20,
                top: 40,
            }}
        >
          <View style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>
                <Feather name="x" size={24} color={Colors[colorScheme as keyof typeof Colors].inactiveTab}/>
            </Text>
          </View>
        </Link>
      )}
      <View style={styles.container}>{props.children}</View>
    </View>
  );
}
