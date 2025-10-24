import api from "@/hooks/axios-interceptor";
import { getAccessToken } from "@/lib/token-storage";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode as decode } from "jwt-decode";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyActivites = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["gamification", "my"],
    queryFn: async () => {
      const jwt = await getAccessToken();
      if (!jwt) throw new Error("User unauthenticated");
      const userId = decode(jwt).sub;
      const response = await api.get("/gamification/report/" + userId);

      return response.data;
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
          Timeline hoạt động của bạn
        </Text>
        {Array.isArray(data?.activityLogs) && data.activityLogs.length > 0 ? (
          data.activityLogs.map((activity: any) => (
            <View
              key={activity.id}
              style={{
                marginBottom: 16,
                padding: 16,
                borderRadius: 10,
                backgroundColor: "#f3f4f6",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#2563eb" }}>
                {activity.activity?.name ?? "Hoạt động"}
              </Text>
              <Text style={{ color: "#71717a", marginVertical: 4 }}>
                Ghi nhận bởi:{" "}
                <Text style={{ fontWeight: "500", color: "#18181b" }}>
                  {activity.loggedBy}
                </Text>
              </Text>
              <Text style={{ color: "#6b7280" }}>
                Đã ghi vào:{" "}
                {new Date(activity.createdAt).toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </Text>
            </View>
          ))
        ) : (
          <Text>Chưa có hoạt động nào.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyActivites;

// const styles = StyleSheet.create({});
