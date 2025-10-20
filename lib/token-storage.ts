import * as SecureStore from "expo-secure-store";

// Save token
export async function saveAccessToken(accessToken: string) {
  await SecureStore.setItemAsync("access-token", accessToken);
}

// Get token
export async function getAccessToken() {
  return await SecureStore.getItemAsync("access-token");
}

// Delete token
export async function deleteAccessToken() {
  await SecureStore.deleteItemAsync("access-token");
}

// Save token
export async function saveRefreshToken(refreshToken: string) {
  await SecureStore.setItemAsync("refresh-token", refreshToken);
}

// Get token
export async function getRefreshToken() {
  return await SecureStore.getItemAsync("refresh-token");
}

// Delete token
export async function deleteRefreshToken() {
  await SecureStore.deleteItemAsync("refresh-token");
}
