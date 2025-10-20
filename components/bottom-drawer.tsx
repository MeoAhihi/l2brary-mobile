import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function BottomDrawer() {
  const sheetRef = useRef<BottomSheet>(null);

  // Define snap points (percent of screen height)
  const snapPoints = useMemo(() => ["15%", "50%"], []);

  return (
    <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints}>
      <View style={styles.content}>
        <Text style={styles.title}>Bottom Drawer</Text>
        <Text>This drawer is shared across all tabs!</Text>
        <Button title="Expand" onPress={() => sheetRef.current?.expand()} />
        <Button title="Collapse" onPress={() => sheetRef.current?.close()} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
