import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Exercise } from '../store/workoutStore';

interface ExerciseCarouselProps {
  exercises: Exercise[];
  editMode: boolean;
  selectedExerciseId: string | null;
  setSelectedExercise: (id: string) => void;
  toggleEditMode: () => void;
  deleteExercise: (id: string) => void;
  reorderExercises: (data: Exercise[]) => void;
  addExercise: () => void;
}

export const ExerciseCarousel = ({
  exercises,
  editMode,
  selectedExerciseId,
  setSelectedExercise,
  toggleEditMode,
  deleteExercise,
  reorderExercises,
  addExercise,
}: ExerciseCarouselProps) => {
  const renderExerciseItem = ({ item, drag }: { item: Exercise; drag: () => void }) => (
    <TouchableOpacity
      onPress={() => !editMode && setSelectedExercise(item.id)}
      onLongPress={toggleEditMode}
      className="mx-2"
    >
      <View className={`w-[90px] h-[90px] rounded-full border-2 items-center justify-center mt-2 ${
        item.id === selectedExerciseId ? 'border-yellow-400' : 'border-gray-300'
      }`}>
        <Image 
          source={{ uri: editMode ? item.asset_url : 
                   (item.id === selectedExerciseId ? item.gif_asset_url : item.asset_url) }}
          className="w-[80px] h-[80px] rounded-full"
          contentFit="cover"
          allowDownsampling={false}
          transition={200}
        />
        
        {item.completed && !editMode && (
          <View className="absolute bottom-0 right-0 bg-yellow-400 w-6 h-6 rounded-full items-center justify-center">
            <Ionicons name="checkmark" size={16} color="black" />
          </View>
        )}
        
        {item.id === selectedExerciseId && !item.completed && !editMode && (
          <View className="absolute bottom-0 right-0 bg-yellow-400 w-6 h-6 rounded-full items-center justify-center">
            <Ionicons name="play" size={16} color="black" />
          </View>
        )}
        
        {editMode && (
          <>
            <TouchableOpacity 
              onPress={() => deleteExercise(item.id)}
              className="absolute top-0 right-0 bg-red-500 w-6 h-6 rounded-full items-center justify-center"
            >
              <Ionicons name="remove" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPressIn={drag} className="absolute top-0 left-0 w-full h-full" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="my-2">
      {editMode ? (
        <DraggableFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => reorderExercises(data)}
          activationDistance={10}
          containerStyle={{ paddingVertical: 8 }}
        />
      ) : (
        <FlatList
          horizontal
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity
              onPress={editMode ? addExercise : toggleEditMode}
              className="w-[90px] h-[90px] rounded-full border-2 border-gray-300 items-center justify-center mx-2 mt-2"
            >
              <Ionicons name={editMode ? "add" : "pencil"} size={24} color="black" />
            </TouchableOpacity>
          }
        />
      )}
    </View>
  );
};