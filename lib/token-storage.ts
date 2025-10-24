import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Helpers for environment/Platform checking
const isWeb = Platform.OS === "web";

// Access Token
export async function saveAccessToken(accessToken: string) {
  if (isWeb) {
    window.localStorage.setItem("access-token", accessToken);
  } else {
    await SecureStore.setItemAsync("access-token", accessToken);
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (isWeb) {
    return window.localStorage.getItem("access-token");
  } else {
    return await SecureStore.getItemAsync("access-token");
  }
}

export async function deleteAccessToken() {
  if (isWeb) {
    window.localStorage.removeItem("access-token");
  } else {
    await SecureStore.deleteItemAsync("access-token");
  }
}

// Refresh Token
export async function saveRefreshToken(refreshToken: string) {
  if (isWeb) {
    window.localStorage.setItem("refresh-token", refreshToken);
  } else {
    await SecureStore.setItemAsync("refresh-token", refreshToken);
  }
}

export async function getRefreshToken(): Promise<string | null> {
  if (isWeb) {
    return window.localStorage.getItem("refresh-token");
  } else {
    return await SecureStore.getItemAsync("refresh-token");
  }
}

export async function deleteRefreshToken() {
  if (isWeb) {
    window.localStorage.removeItem("refresh-token");
  } else {
    await SecureStore.deleteItemAsync("refresh-token");
  }
}
