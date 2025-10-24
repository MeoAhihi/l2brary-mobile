import api from "@/hooks/axios-interceptor";
import { useProfile } from "@/hooks/use-profile";
import { useQuery } from "@tanstack/react-query";
import { Image, ScrollView, Text, View } from "react-native";

export default function Home() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: upcomingSessions, isLoading: isLoadingSessions } = useQuery({
    queryKey: ["sessions", "week"],
    queryFn: async () => {
      const res = await api.get("/session/week");
      return res.data;
    },
  });
  if (isLoadingProfile || isLoadingSessions) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        {(() => {
          const now = new Date();
          const hour = now.getHours();
          let timeGreeting = "Chào buổi sáng";
          if (hour >= 12 && hour < 18) {
            timeGreeting = "Chào buổi chiều";
          } else if (hour >= 18 || hour < 5) {
            timeGreeting = "Chào buổi tối";
          }
          return `${timeGreeting}, ${profile?.fullName}!`;
        })()}
      </Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "flex-start",
          padding: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#334155",
          }}
        >
          Các buổi học sắp tới của bạn
        </Text>
        <View>
          {upcomingSessions && upcomingSessions.length > 0 ? (
            upcomingSessions.map((session: any) => (
              <View
                key={session.id}
                style={{
                  width: "90%",
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  padding: 18,
                  marginBottom: 18,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                {session && (
                  <View style={{ alignItems: "flex-start", marginBottom: 12 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginBottom: 12,
                      }}
                    >
                      <Image
                        source={{ uri: session.thumbnail }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 8,
                          backgroundColor: "#e5e7eb",
                          marginRight: 16,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "#141414",
                            marginBottom: 3,
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {session.title}
                        </Text>
                      </View>
                    </View>

                    {/* Schedule Info */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#64748b",
                          marginRight: 8,
                        }}
                      >
                        Ngày:
                      </Text>
                      <Text style={{ color: "#334155" }}>
                        {new Date(session.startTime).toLocaleDateString(
                          "vi-VN",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#64748b",
                          marginRight: 8,
                        }}
                      >
                        Thời gian:
                      </Text>
                      <Text style={{ color: "#334155" }}>
                        {new Date(session.startTime).toLocaleTimeString(
                          "vi-VN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        {" - "}
                        {new Date(session.endTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#64748b",
                          marginRight: 8,
                        }}
                      >
                        Diễn giả:
                      </Text>
                      <Text style={{ color: "#334155" }}>
                        {session.presenterName ?? "không có"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#64748b",
                          marginRight: 8,
                        }}
                      >
                        Địa điểm:
                      </Text>
                      <Text style={{ color: "#334155" }}>
                        {session.roomInfo} ({session.address})
                      </Text>
                    </View>
                  </View>
                )}
                <Text style={{ marginBottom: 8 }}>
                  {session.description?.length > 0
                    ? session.description
                    : "Không có mô tả cho khoá học này."}
                </Text>
              </View>
            ))
          ) : (
            <Text>Bạn chưa tiết học nào tuần này.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
