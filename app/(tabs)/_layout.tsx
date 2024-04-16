import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { StyleSheet, Platform } from "react-native";
import { AuthContext } from "../_layout";
import { Image } from "expo-image";

import { useColorScheme } from "@/components/useColorScheme";

import Colors from "@/utils/Colors";
import { isAdmin } from "@/utils/supabaseHandler";

const isIOS = Platform.OS === "ios";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={25}
      style={{ marginBottom: -1, paddingTop: 2 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = React.useContext(AuthContext);
  const [admin, setAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchAdmin = async () => {
      const isAdminUser = await isAdmin(user?.id ?? "");
      setAdmin(isAdminUser);
    };
    if (!user) setAdmin(false);
    else fetchAdmin();
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme as keyof typeof Colors].accent,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isIOS
            ? "transparent"
            : Colors[colorScheme as keyof typeof Colors].background,
          borderTopWidth: 0,
          borderColor: Colors[colorScheme as keyof typeof Colors].border,
          position: "absolute",
          borderTopColor: "transparent",
        },
        tabBarBackground: () =>
          isIOS && <BlurView intensity={90} style={StyleSheet.absoluteFill} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="commands"
        options={{
          title: "Commandes",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
          href: user ? "/commands" : null,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Admin",
          tabBarIcon: ({ color }) => <TabBarIcon name="gears" color={color} />,
          href: admin ? "settings" : null,
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) =>
            user ? (
              <Image
                source={{ uri: user?.user_metadata.avatar_url }}
                style={{ width: 25, height: 25, borderRadius: 25 }}
              />
            ) : (
              <TabBarIcon name="user" color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
