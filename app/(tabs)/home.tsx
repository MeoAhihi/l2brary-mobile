import { useMyCourses } from "@/hooks/use-my-courses";
import { useProfile } from "@/hooks/use-profile";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: courses, isLoading: isLoadingCourses } = useMyCourses();
  if (isLoadingProfile || isLoadingCourses) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  // Tính toán thời gian tiếp theo của các khoá học
  // Giả sử mỗi course có startDate, endDate, startTime, endTime và scheduleType
  // Ta sẽ tìm thời gian học tới cho từng course (ngày >= hôm nay, ưu tiên hôm nay hoặc lần sau)
  const now = new Date();
  const getNextCourseTime = (course: any) => {
    if (
      !course.startDate ||
      !course.endDate ||
      !course.startTime ||
      !course.endTime
    ) {
      return null;
    }

    // Lấy ngày bắt đầu và kết thúc
    const start = new Date(course.startDate + "T00:00:00");
    const end = new Date(course.endDate + "T23:59:59");

    if (end < now) return null;

    // Xác định các ngày trong tuần diễn ra học (nếu có scheduleDetail, có thể mở rộng)
    // Nếu không, mặc định giả sử mỗi ngày đều có học trong khoảng thời gian đó
    // Nếu có scheduleType là "weekday", chỉ lấy các ngày trong tuần thứ 2-6
    let candidateDates: Date[] = [];

    // Lặp từng ngày một từ hôm nay tới ngày endDate
    let current = new Date(now);
    current.setHours(0, 0, 0, 0); // reset về đầu ngày

    while (current <= end) {
      // Nếu trong khoảng start-end
      if (current >= start && current <= end) {
        // Nếu học theo "weekday"
        if (course.scheduleType === "weekday") {
          const day = current.getDay(); // 0=CN, 1=T2
          if (day > 0 && day < 6) {
            candidateDates.push(new Date(current));
          }
        } else if (course.scheduleType === "weekend") {
          const day = current.getDay();
          if (day === 0 || day === 6) {
            candidateDates.push(new Date(current));
          }
        } else {
          // bất kỳ ngày nào
          candidateDates.push(new Date(current));
        }
      }
      current.setDate(current.getDate() + 1);
    }

    // Tìm ngày candidate sớm nhất >= hôm nay
    for (const d of candidateDates) {
      if (d >= now) {
        // Trả về object gồm ngày học tới, giờ bắt đầu/kết thúc định dạng string
        return {
          date: d,
          dateString: `${d.getDate().toString().padStart(2, "0")}/${(
            d.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${d.getFullYear()}`,
          time: `${course.startTime} - ${course.endTime}`,
        };
      }
    }
    return null;
  };

  const upcoming = courses?.courses
    .filter((c: any) => c.enrollment.status === "approved")
    .map((c: any) => ({
      ...c,
      nextTime: getNextCourseTime(c),
    }))
    .filter((c: any) => c.nextTime !== null);

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
      </ScrollView>
    </View>
  );
}
