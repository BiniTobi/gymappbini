import React from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useWorkoutStore } from '../store/workoutStore';
import { EditModeFooter } from './components/EditModeFooter';
import { ExerciseCarousel } from './components/ExerciseCarousel';
import { ExerciseDetails } from './components/ExerciseDetails';
import { Header } from './components/Header';

const Index = () => {
  const {
    exercises,
    tempExercises,
    selectedExerciseId,
    editMode,
    hasChanges,
    setSelectedExercise,
    toggleEditMode,
    reorderExercises: storeReorderExercises,
    deleteExercise,
    saveChanges,
    discardChanges,
    addExercise,
    addSet,
    updateSet,
    toggleSetCompletion,
  } = useWorkoutStore();

  const currentExercises = editMode ? tempExercises : exercises;
  const selectedExercise = currentExercises.find(ex => ex.id === selectedExerciseId) || currentExercises[0];

  const reorderExercises = (data: Exercise[]) => {
    const newOrder = data.map(item => item.id);
    const oldOrder = currentExercises.map(item => item.id);
    
    if (JSON.stringify(newOrder) !== JSON.stringify(oldOrder)) {
      data.forEach((item, newIndex) => {
        const oldIndex = currentExercises.findIndex(ex => ex.id === item.id);
        if (oldIndex !== newIndex) {
          storeReorderExercises(oldIndex, newIndex);
          return;
        }
      });
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 ">
      <SafeAreaView className="flex-1">
        <Header />
        
        <ExerciseCarousel
          exercises={currentExercises}
          editMode={editMode}
          selectedExerciseId={selectedExerciseId}
          setSelectedExercise={setSelectedExercise}
          toggleEditMode={toggleEditMode}
          deleteExercise={deleteExercise}
          reorderExercises={reorderExercises}
          addExercise={addExercise}
          
        />

        {selectedExercise && (
          <ExerciseDetails
            exercise={selectedExercise}
            addSet={() => addSet(selectedExercise.id)}
            updateSet={(setId, updates) => updateSet(selectedExercise.id, setId, updates)}
            toggleSetCompletion={(setId) => toggleSetCompletion(selectedExercise.id, setId)}
          />
        )}

        {editMode && (
          <EditModeFooter
            hasChanges={hasChanges}
            onDiscard={discardChanges}
            onSave={saveChanges}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Index;