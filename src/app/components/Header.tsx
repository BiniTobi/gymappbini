import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Timer } from './Timer';

export const Header = () => {
  return (
    <View className="flex-row justify-between items-center bg-white mt-4 px-4">
      <View className="flex-row items-center gap-4">
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text className="text-xl font-mono">Biniyam Fubody</Text>
      </View>
      <Timer />
    </View>
  );
};