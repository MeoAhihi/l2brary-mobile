import api from "@/hooks/axios-interceptor";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InputBar() {
  const [userId, setUserId] = useState();
  const [activityId, setActivityId] = useState();
  const { data, isLoading } = useQuery({
    queryKey: ["activity-log"],
    queryFn: async () => {
      const users = await api.get("/user", {
        params: {
          limit: 100,
          page: 1,
        },
      });

      const activity = await api.get("/activity");
      return { users: users.data.items, activity: activity.data };
    },
  });

  const queryClient = useQueryClient();
  const logActivity = useMutation({
    mutationFn: async ({
      userId,
      activityId,
    }: {
      userId: string;
      activityId: number;
    }) => {
      const res = await api.post("/gamification/log-activity", {
        userId,
        activityId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setUserId(undefined);
      setActivityId(undefined);
    },
    onError: () => {
      console.error("Error");
    },
  });

  async function onSend() {
    if (userId && activityId) {
      return await logActivity.mutate({ userId, activityId }, {});
    }
    console.log("No log");
  }

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.inputBar}>
      <Picker
        selectedValue={userId}
        style={styles.picker}
        onValueChange={(itemValue) => setUserId(itemValue)}
      >
        <Picker.Item label="-- Chọn người dùng --" value={null} />
        {data?.users
          .slice()
          .sort((a: { fullName: string }, b: { fullName: string }) => {
            const getLastName = (fullName: string) => {
              const parts = fullName.trim().split(" ");
              return parts[parts.length - 1].toLowerCase();
            };
            return getLastName(a.fullName).localeCompare(
              getLastName(b.fullName)
            );
          })
          .map((u: { id: string; fullName: string }) => (
            <Picker.Item
              key={u.id}
              label={`[${u.fullName.split(" ").reverse()[0]}] ${u.fullName}`}
              value={u.id}
            />
          ))}
      </Picker>
      <Picker
        selectedValue={activityId}
        style={styles.picker}
        onValueChange={(itemValue) => setActivityId(itemValue)}
      >
        <Picker.Item label="-- Chọn hoạt động --" value={null} />
        {data?.activity
          .filter(
            (a: { name: string; category?: string }) => a.category !== "system"
          )
          .sort(
            (
              a: { name: string; category?: string },
              b: { name: string; category?: string }
            ) => {
              // First sort by category (null/undefined last, otherwise alphabetically)
              const catA = (a.category || "").toLowerCase();
              const catB = (b.category || "").toLowerCase();
              if (catA !== catB) {
                if (!catA) return 1;
                if (!catB) return -1;
                return catA.localeCompare(catB);
              }
              // Then sort by last name
              const getLastName = (name: string) => {
                const parts = name.trim().split(" ");
                return parts[parts.length - 1].toLowerCase();
              };
              return getLastName(a.name).localeCompare(getLastName(b.name));
            }
          )
          .map((u: { id: number; name: string; category: string }) => (
            <Picker.Item
              key={u.id}
              label={`[${u.category}] ${u.name}`}
              value={u.id}
            />
          ))}
      </Picker>

      {logActivity.status === "pending" ? (
        <View style={[styles.sendButton, { backgroundColor: "#aaa" }]}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Đang gửi...</Text>
        </View>
      ) : (
        <TouchableOpacity style={[styles.sendButton]} onPress={onSend}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Gửi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 8,
    backgroundColor: "#f7f7f7",
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  picker: {
    height: "auto",
    width: "100%",
  },
});
