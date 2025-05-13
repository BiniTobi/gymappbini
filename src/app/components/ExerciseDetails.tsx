import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AddSetModal } from './AddSetModal';
import { SetItem } from './SetItem';

const equipmentIcons = {
  barbell: 'barbell-outline',
  bodyweight: 'body-outline',
  dumbbell: 'dumbbell-outline',
  cable: 'git-pull-request-outline',
};

export const ExerciseDetails = ({
  exercise,
  addSet,
  updateSet,
  toggleSetCompletion,
}: ExerciseDetailsProps) => {
  const [showAddSetModal, setShowAddSetModal] = useState(false);

  const handleAddSet = (weight: number, reps: number, tenRm: number) => {
    addSet();
    
    
    const newSetId = exercise.sets[exercise.sets.length - 1]?.id;
    if (newSetId) {
      updateSet(newSetId, { weight, reps, tenRm });
    }
  };
  return (
    <>
      <View className="flex-row justify-between items-center bg-white mx-4 my-2">
        <Text className="text-xl font-bold">{exercise.name}</Text>
        <TouchableOpacity className="flex-row items-center bg-yellow-400 rounded-full px-4 py-2">
          <Ionicons name="swap-horizontal" size={24} color="black" />
          <Text className="ml-2 font-semibold">Replace</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center mx-8 relative">
        <Image 
          source={{ uri: exercise.gif_asset_url }}
          className="w-[250px] h-[250px] rounded-lg"
          contentFit="cover"
          allowDownsampling={false}
          transition={200}
        />
        <View className="absolute bottom-0 left-0 flex-row items-center bg-gray-200 rounded-full px-4 py-2">
          <Ionicons 
            name={equipmentIcons[exercise.equipment]} 
            size={24} 
            color="black" 
          />
          <Text className="ml-2 text-black font-bold capitalize">
            {exercise.equipment}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-4 px-4">
        <TouchableOpacity className="flex-row items-center border-2 border-black rounded-full px-4 py-2">
          <Ionicons name="book-outline" size={24} color="black" />
          <Text className="ml-2 text-black font-bold">Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center border-2 border-black rounded-full px-4 py-2">
          <Ionicons name="flame-outline" size={24} color="black" />
          <Text className="ml-2 text-black font-bold">Warm Up</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center border-2 border-black rounded-full px-4 py-2">
          <Ionicons name="help-circle-outline" size={24} color="black" />
          <Text className="ml-2 text-black font-bold">FAQ</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 px-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl">Sets</Text>
          <TouchableOpacity 
        onPress={() => setShowAddSetModal(true)}
        className="flex-row items-center bg-yellow-300 rounded-full px-4 py-2"
      >
        <Ionicons name="add" size={24} color="black" />
        <Text className="ml-2 text-black font-bold">Add Set</Text>
      </TouchableOpacity>
      <AddSetModal
        visible={showAddSetModal}
        onClose={() => setShowAddSetModal(false)}
        onSave={handleAddSet}
      />
        </View>

        <View className="flex-row justify-between items-center my-4 px-4">
          <Text className="flex-1 text-base font-bold text-center">#</Text>
          <Text className="flex-1 text-base font-bold text-center">Kg</Text>
          <Text className="flex-1 text-base font-bold text-center">Reps</Text>
          <Text className="flex-1 text-base font-bold text-center">10RM</Text>

          <View className="flex-1"></View>
        </View>
        
        {exercise.sets.map((set, index) => (
          <SetItem
            key={set.id}
            set={set}
            index={index}
            onUpdate={(updates) => updateSet(set.id, updates)}
            onToggleCompletion={() => toggleSetCompletion(set.id)}
          />
        ))}
      </View>
    </>
  );
};