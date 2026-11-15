import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeArea from "../../components/safeScreen"
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeArea>
      <Stack screenOptions={{headerShown : false}}>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="(auth)"></Stack.Screen> 
    </Stack>
      </SafeArea>
      <StatusBar></StatusBar>
    </SafeAreaProvider>

  );
}
