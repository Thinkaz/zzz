import React from "react";
import { StyleSheet } from "react-native";
import { AuthContext } from "@/app/_layout";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function Settings() {
  const { user } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>
        {user?.aud} {"\n"}
        {user?.id} {"\n"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
