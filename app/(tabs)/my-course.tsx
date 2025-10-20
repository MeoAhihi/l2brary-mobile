import { Spinner } from "@/components/ui/spinner";
import { useMyCourses } from "@/hooks/use-my-courses";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const MyCourses = () => {
  const { data, isLoading, isError } = useMyCourses();
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner size="large" />
        <Text>Đang tải dữ liệu khoá học...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "red" }}>
          Đã xảy ra lỗi khi tải dữ liệu khoá học.
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 32,
        backgroundColor: "#f8fafc",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 26,
          marginBottom: 18,
          color: "#334155",
          textAlign: "center",
        }}
      >
        Các lớp đã đăng ký
      </Text>
      <View>
        {data?.courses && data.courses.length > 0 ? (
          data.courses.map((course: any) => (
            <View
              key={course.id}
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
              {course.thumbnail && (
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
                      source={{ uri: course.thumbnail }}
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
                        {course.title}
                      </Text>
                      <Text
                        style={{
                          color:
                            course.enrollment.status === "approved"
                              ? "#16a34a"
                              : course.enrollment.status === "pending"
                              ? "#ca8a04"
                              : course.enrollment.status === "rejected"
                              ? "#dc2626"
                              : "#64748b",
                          fontWeight: "bold",
                          fontSize: 13,
                        }}
                      >
                        {course.enrollment.status === "approved"
                          ? "Đã duyệt"
                          : course.enrollment.status === "pending"
                          ? "Chờ duyệt"
                          : course.enrollment.status === "rejected"
                          ? "Từ chối"
                          : course.enrollment.status}
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
                      Lịch học:
                    </Text>
                    <Text style={{ color: "#334155" }}>
                      {course.scheduleType
                        ? course.scheduleType.charAt(0).toUpperCase() +
                          course.scheduleType.slice(1)
                        : "Chưa rõ"}
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
                      {course.startDate && course.endDate
                        ? `${course.startDate
                            .split("-")
                            .reverse()
                            .join("/")} - ${course.endDate
                            .split("-")
                            .reverse()
                            .join("/")}`
                        : "Không rõ"}
                    </Text>
                  </View>
                  {course.startTime && course.endTime && (
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
                        Giờ học:
                      </Text>
                      <Text style={{ color: "#334155" }}>
                        {course.startTime} - {course.endTime}
                      </Text>
                    </View>
                  )}
                </View>
              )}
              <Text style={{ marginBottom: 8 }}>
                {course.description?.length > 0
                  ? course.description
                  : "Không có mô tả cho khoá học này."}
              </Text>
            </View>
          ))
        ) : (
          <Text>Bạn chưa tham gia khoá học nào.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MyCourses;
