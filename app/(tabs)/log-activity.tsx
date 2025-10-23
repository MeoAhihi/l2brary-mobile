import InputBar from "@/components/input-bar";
import Message from "@/components/message";
import api from "@/hooks/axios-interceptor";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "bot",
    text: "Xin chào! Bạn muốn ghi nhận hoạt động gì hôm nay?",
  },
];

const LogActivities = () => {
  const {
    data: gamificationData,
    isLoading: isLoadingGamification,
    error: gamificationError,
  } = useQuery({
    queryKey: ["gamification"],
    queryFn: async () => {
      const response = await api.get("/gamification", {
        params: {
          page: 1,
          limit: 20,
        },
      });

      return response.data;
    },
  });

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  const sendBotResponse = useCallback((activity: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "bot",
        text: "Đã ghi nhận: " + activity,
      },
    ]);
  }, []);

  const handleSend = useCallback(() => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "user", text: trimmedInput },
      ]);
      setInput("");
      setTimeout(() => {
        sendBotResponse(trimmedInput);
      }, 400);
    }
    Keyboard.dismiss();
  }, [input, sendBotResponse]);
  if (isLoadingGamification) return <Text>Đang tải dữ liệu...</Text>;
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Code>
        {JSON.stringify(
          gamificationData.items.map((g) => ({
            id: g.id,
            fullName: g.user.fullName,
            activity: g.activity.name,
            loggedBy: g.loggedBy,
            createdAt: new Date(g.createdAt).toLocaleString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
            }),
          })),
          null,
          2
        )}
      </Code> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
            ref={scrollViewRef}
            contentContainerStyle={{
              paddingVertical: 20,
              paddingHorizontal: 18,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {gamificationData.items
              .map((g: any) => ({
                id: g.id,
                fullName: g.user.fullName,
                activity: g.activity.name,
                loggedBy: g.loggedBy,
                createdAt: new Date(g.createdAt).toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                }),
              }))
              .map(
                (msg: {
                  id: number;
                  loggedBy: string;
                  fullName: string;
                  activity: string;
                  createdAt: string;
                }) => (
                  <Message
                    key={msg.id}
                    loggedBy={msg.loggedBy}
                    fullName={msg.fullName}
                    activity={msg.activity}
                    createdAt={msg.createdAt}
                  />
                )
              )}
          </ScrollView>
          <InputBar />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f1f5f9" },
  container: { flex: 1, justifyContent: "flex-end" },
  messageRow: {
    marginBottom: 12,
    maxWidth: "80%",
    borderRadius: 12,
    padding: 12,
  },
  userRow: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
  },
  botRow: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e7ef",
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  botText: {
    color: "#18181b",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 25,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
});

export default LogActivities;
