import { Text, TouchableOpacity, View } from 'react-native';

interface EditModeFooterProps {
  hasChanges: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export const EditModeFooter = ({ hasChanges, onDiscard, onSave }: EditModeFooterProps) => {
  return (
    <View className="absolute bottom-4 left-0 right-0 bg-white rounded-full p-4 shadow-lg flex-row justify-between items-center mx-4">
      <TouchableOpacity 
        onPress={onDiscard}
        className="flex-row items-center bg-gray-200 rounded-full px-6 py-3"
      >
        <Text className="text-black text-lg font-semibold">Discard</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onSave}
        disabled={!hasChanges}
        className={`flex-row items-center rounded-full px-6 py-3 ${
          hasChanges ? 'bg-yellow-400' : 'bg-gray-300'
        }`}
      >
        <Text className="text-black text-lg font-semibold">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};