import { Spinner } from "@/components/ui/spinner";
import { useProfile } from "@/hooks/use-profile";
import { Image, ScrollView, Text, View } from "react-native";

export default function Profile() {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <Spinner size="large" />
        <Text style={{ color: "#333" }}>Đang tải thông tin hồ sơ...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <Text style={{ color: "red" }}>
          Đã xảy ra lỗi khi tải thông tin hồ sơ.
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
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Image
          source={{
            uri: data.avatarUrl ?? "",
          }}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            color: "#141414",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          {data.fullName}
        </Text>
        <Text
          style={{
            fontWeight: "300",
            fontSize: 16,
            color: "#536471",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {data.internationalName}
        </Text>
        <Text style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
          Mã số: {data.id}
        </Text>
      </View>
      <View
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
        <Text
          style={{
            color: "#334155",
            fontWeight: "700",
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Thông tin cá nhân
        </Text>
        <ProfileRow label="Giới tính" value={data.gender} />
        <ProfileRow
          label="Ngày sinh"
          value={data.birthdate.split("-").reverse().join("/")}
        />
        <ProfileRow label="Số điện thoại" value={data.phoneNumber} />
        <ProfileRow label="Email" value={data.email || "--"} />
        <ProfileRow label="Cấp bậc" value={data.rank || "--"} />
        <ProfileRow
          label="Ngày tạo tài khoản"
          value={data.createdAt?.slice(0, 10).split("-").reverse().join("/")}
        />
      </View>
      <View
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
        <Text
          style={{
            color: "#334155",
            fontWeight: "700",
            fontSize: 15,
            marginBottom: 6,
          }}
        >
          Vai trò & Thành viên
        </Text>
        {data.roles && data.roles.length > 0 ? (
          data.roles.map((role: any) => (
            <Text key={role.id} style={{ color: "#334155", fontSize: 14 }}>
              {role.name} {role.description ? `- ${role.description}` : ""}
            </Text>
          ))
        ) : (
          <Text style={{ color: "#64748b", fontSize: 13 }}>
            Không có vai trò.
          </Text>
        )}
      </View>
      <View
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
        <Text
          style={{
            color: "#334155",
            fontWeight: "700",
            fontSize: 15,
            marginBottom: 6,
          }}
        >
          Chứng chỉ khóa học
        </Text>
        {data.courseCertificates && data.courseCertificates.length > 0 ? (
          data.courseCertificates.map((cert: string, idx: number) => (
            <Text key={idx} style={{ color: "#334155", fontSize: 14 }}>
              {cert}
            </Text>
          ))
        ) : (
          <Text style={{ color: "#64748b", fontSize: 13 }}>
            Chưa có chứng chỉ nào.
          </Text>
        )}
      </View>
      <View
        style={{
          width: "90%",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: 18,
          marginBottom: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: "#334155",
            fontWeight: "700",
            fontSize: 15,
            marginBottom: 6,
          }}
        >
          Kinh nghiệm & Sự kiện
        </Text>
        {data.experiences && data.experiences.length > 0 ? (
          data.experiences.map((exp: string, idx: number) => (
            <Text key={idx} style={{ color: "#334155", fontSize: 14 }}>
              {exp}
            </Text>
          ))
        ) : (
          <Text style={{ color: "#64748b", fontSize: 13 }}>
            Chưa có kinh nghiệm nào.
          </Text>
        )}
        <Text
          style={{
            color: "#334155",
            fontWeight: "700",
            fontSize: 14,
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          Chứng chỉ sự kiện
        </Text>
        {data.eventCertificates && data.eventCertificates.length > 0 ? (
          data.eventCertificates.map((eventCert: string, idx: number) => (
            <Text key={idx} style={{ color: "#334155", fontSize: 14 }}>
              {eventCert}
            </Text>
          ))
        ) : (
          <Text style={{ color: "#64748b", fontSize: 13 }}>
            Chưa có chứng chỉ sự kiện nào.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

function ProfileRow({ label, value }: { label: string; value: any }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <Text style={{ color: "#64748b", fontSize: 14 }}>{label}</Text>
      <Text style={{ color: "#141414", fontSize: 14 }}>{value || "--"}</Text>
    </View>
  );
}
