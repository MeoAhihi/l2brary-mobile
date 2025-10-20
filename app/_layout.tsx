import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "react-native-reanimated"; // MUST be first import

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="dark">
      <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
    </GluestackUIProvider>
  
  );
}
