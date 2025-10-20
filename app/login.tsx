import { useLogin } from "@/hooks/use-login";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });
  const login = useLogin();

  const onSubmit = (data: { phoneNumber: string; password: string }) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push("/(tabs)/home");
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* phoneNumber field */}
      <Controller
        control={control}
        name="phoneNumber"
        rules={{ required: "phoneNumber is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        )}
      />
      {errors.phoneNumber && (
        <Text style={styles.error}>{errors.phoneNumber.message}</Text>
      )}

      {/* Password field */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Mật khẩu là bắt buộc" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button
        title={login.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        onPress={handleSubmit(onSubmit)}
        disabled={login.isPending}
      />

      <Text style={styles.registerText}>
        <Link href="https://google.com">
          👋 Sau khi nhận được mã mời từ email. Hãy đăng ký bạn nhé
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  registerText: {
    textAlign: "center",
    marginTop: 16,
    color: "#007AFF",
  },
});
