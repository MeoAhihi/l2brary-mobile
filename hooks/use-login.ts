import { saveAccessToken, saveRefreshToken } from "@/lib/token-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://l2brary-api.onrender.com/v1/api",
});

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      phoneNumber,
      password,
    }: {
      phoneNumber: string;
      password: string;
    }) => {
      const response = await api.post<{
        accessToken: string;
        refreshToken: string;
      }>("/authentication/login", {
        phoneNumber,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Save tokens to SecureStore using token-storage utility
      saveAccessToken(data.accessToken);
      saveRefreshToken(data.refreshToken);
    },
    onError: (e) => {
      console.error(e);
    },
  });
}
