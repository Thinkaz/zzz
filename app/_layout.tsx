import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
const { useFonts } = require("expo-font");

import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({ user: null });

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.data.session?.user ?? null);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event: string, session: Session | null) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "San Francisco": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "San Francisco Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    "San Francisco Medium": require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "Space Mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="foodmodal"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
