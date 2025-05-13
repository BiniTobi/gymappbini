import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ExerciseSet } from '../store/workoutStore';

interface SetItemProps {
  set: ExerciseSet;
  index: number;
  onUpdate: (updates: { weight?: number; reps?: number; tenRm?: number }) => void;
  onToggleCompletion: () => void;
}

export const SetItem = ({ set, index, onUpdate, onToggleCompletion }: SetItemProps) => {
  return (
    <View 
      className={`flex-row justify-between items-center my-2 py-3 px-4 rounded-lg ${
        set.completed ? 'bg-green-100 bg-opacity-30' : 'bg-red-100 bg-opacity-30'
      }`}
    >
      <Text className="flex-1 text-center text-base">{index + 1}</Text>
      
      <TextInput
        className="flex-1 text-center bg-white p-2 rounded mx-1"
        keyboardType="numeric"
        value={set.weight.toString()}
        onChangeText={(text) => onUpdate({ weight: parseFloat(text) || 0 })}
      />
      
      <TextInput
        className="flex-1 text-center bg-white p-2 rounded mx-1"
        keyboardType="numeric"
        value={set.reps.toString()}
        onChangeText={(text) => onUpdate({ reps: parseInt(text) || 0 })}
      />
      
      <TextInput
        className="flex-1 text-center bg-white p-2 rounded mx-1"
        keyboardType="numeric"
        value={set.tenRm?.toString() || '0'}
        onChangeText={(text) => onUpdate({ tenRm: parseFloat(text) || 0 })}
      />
      
      <TouchableOpacity 
        onPress={onToggleCompletion}
        className="flex-1 items-center justify-center"
      >
        <View className={`w-6 h-6 rounded-full items-center justify-center ${
          set.completed ? 'bg-green-500' : 'bg-yellow-400'
        }`}>
          <Ionicons 
            name={set.completed ? "checkmark" : "checkmark"} 
            size={16} 
            color="black" 
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};