import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { supabase } from "./supabase";

export async function hasCommandInProgress(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", userId)
    .eq("finished", false)
    .single();
  if (error) {
    return false;
  }
  return data;
}

export async function getItems() {
  const { data, error } = await supabase
    .from("items")
    .select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export async function getItemIdFromName(name: string) {
  const { data, error } = await supabase
    .from("items")
    .select("id")
    .eq("name", name)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data?.id;
}

export async function isAdmin(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("admin")
    .eq("id", userId)
    .single();
  if (error) {
    console.error(error);
    return false;
  }
  return data?.admin;
}

export async function getPoints(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("points")
    .eq("id", userId);
  if (error) {
    console.error(error);
    return 0;
  }
  return data?.[0]?.points;
}

export async function getMostOrderedItems(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("content")
    .eq("customer_id", userId);
  if (error) {
    console.error(error);
    return [];
  }
  // get the most occuring item
  const items = data?.map((order) => order.content).flat();
  const counts = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  const mostSelected = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  // return a string
  return mostSelected;
}

// Notifications : A FAIRE /!\ flemme pour le moment

async function storeExpoPushToken(userId: string, token: string) {
  try {
    const { error } = await supabase
      .from('users')
      .update({ expo_push_token: token })
      .eq('id', userId);

    if (error) {
      console.error('Error storing Expo Push Notification token:', error);
    } else {
      console.log('Expo Push Notification token stored successfully.');
    }
  } catch (error) {
    console.error('Error storing Expo Push Notification token:', error);
  }
}