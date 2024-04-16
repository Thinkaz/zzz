import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import fonts from "@/utils/fonts";
import Colors from "@/utils/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function () {
  const colorScheme = useColorScheme();

  GoogleSignin.configure({
    webClientId:
      "664102814145-ctj73gjbjg4ma0p7k3lom6td81fn870m.apps.googleusercontent.com",
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
        if (error) {
          console.error("Supabase sign-in error:", error);
        }
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
    }
  };

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors[colorScheme as keyof typeof Colors].thirdBg,
      paddingVertical: 12,
      paddingHorizontal: 36,
      marginTop: "30%",
      gap: 10,
    },
    buttonText: {
      color: Colors[colorScheme as keyof typeof Colors].text,
      fontSize: 15,
      fontFamily: fonts?.medium,
      textAlign: "center",
    },
    icon: {
      color: Colors[colorScheme as keyof typeof Colors].accent,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
      <AntDesign style={styles.icon} name="google" size={24} />
      <Text style={styles.buttonText}>Connection avec Google</Text>
    </TouchableOpacity>
  );
}
