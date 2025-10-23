import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Extracted Drawer component
function BottomMenuDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={isOpen} size="lg" anchor="bottom" onClose={onClose}>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <Heading size="md">Menu</Heading>
          <DrawerCloseButton>
            <Ionicons name="close" size={24} color="#000" />
          </DrawerCloseButton>
        </DrawerHeader>
        <DrawerBody>
          <Text>This is the basic drawer component.</Text>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onPress={onClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function TabsLayout() {
  const [showDrawer, setShowDrawer] = useState(false);
  // 👇 Swipe-up gesture setup
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: (_, gestureState) => {
  //       // Detect finger movement
  //       return Math.abs(gestureState.dy) > 20;
  //     },
  //     onPanResponderRelease: (_, gestureState) => {
  //       if (gestureState.dy < -60) {
  //         console.log("🆙 Swipe up detected in Tabs!");
  //         // 👉 Example action: go to "log-activity" tab
  //         setShowDrawer(true);
  //       }
  //     },
  //   })
  // ).current;

  return (
    <View
      // {...panResponder.panHandlers}
      style={{ flex: 1 }}
    >
      <BottomMenuDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
      />
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Trang chủ",
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="home" size={24} color="#60a5fa" />
            ),
          }}
        />
        <Tabs.Screen
          name="my-course"
          options={{
            title: "Lớp học",
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="book" size={24} color="#60a5fa" />
            ),
          }}
        />
        <Tabs.Screen
          name="my-activities"
          options={{
            title: "Hoạt động",
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="flash" size={24} color="#60a5fa" />
            ),
          }}
        />
        <Tabs.Screen
          name="log-activity"
          options={{
            title: "Ghi nhận",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="create"
                size={24}
                color={focused ? "#2563eb" : "#60a5fa"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Tôi",
            headerShown: false,
            tabBarIcon: () => (
              <Avatar size="md">
                <AvatarFallbackText>John Doe</AvatarFallbackText>
              </Avatar>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

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
