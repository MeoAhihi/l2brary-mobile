import { Image } from "@/components/ui/image";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LogActivities = () => {
  return (
    <SafeAreaView>
      <Text>LogActivities</Text>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0hn0KWpyMWz-3K2mggSwA4i_a_4MjQA4aaw&s",
        }}
        width={200}
        height={200}

        // style={styles.image}
      />
      <Text>asdfsd</Text>
    </SafeAreaView>
  );
};

export default LogActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
