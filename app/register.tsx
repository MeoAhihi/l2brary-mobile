import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Register() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register</Text>
      <Button title="Go to Login" onPress={() => router.back()} />
    </View>
  );
}
