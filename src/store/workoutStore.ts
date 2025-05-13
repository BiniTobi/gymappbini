import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Equipment = 'barbell' | 'bodyweight' | 'dumbbell' | 'cable';

interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  tenRm?: number;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  asset_url: string;
  gif_asset_url: string;
  equipment: Equipment;
  completed: boolean;
  sets: ExerciseSet[];
}

interface WorkoutState {
  exercises: Exercise[];
  tempExercises: Exercise[];
  selectedExerciseId: string | null;
  editMode: boolean;
  hasChanges: boolean;
  setSelectedExercise: (id: string) => void;
  toggleEditMode: () => void;
  reorderExercises: (fromIndex: number, toIndex: number) => void;
  deleteExercise: (id: string) => void;
  saveChanges: () => void;
  discardChanges: () => void;
  toggleExerciseCompletion: (id: string) => void;
  addExercise: () => void;
  addSet: (exerciseId: string) => void;
  updateSet: (exerciseId: string, setId: string, updates: Partial<ExerciseSet>) => void;
  deleteSet: (exerciseId: string, setId: string) => void;
  toggleSetCompletion: (exerciseId: string, setId: string) => void;
}

const initialExercises: Exercise[] = [
  {
    id: '1',
    name: "Back Squat",
    asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.png",
    gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif",
    equipment: "barbell",
    completed: false,
    sets: [
      { id: '1-1', weight: 20, reps: 10, completed: false },
      { id: '1-2', weight: 25, reps: 8, completed: false }
    ]
  },
  {
    id: '2',
    name: "Pull Ups",
    asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.png",
    gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif",
    equipment: "bodyweight",
    completed: false,
    sets: [
      { id: '2-1', weight: 0, reps: 8, completed: false },
      { id: '2-2', weight: 0, reps: 8, completed: false }
    ]
  },
  {
    id: '3',
    name: "Shoulder Press",
    asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.png",
    gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif",
    equipment: "dumbbell",
    completed: false,
    sets: [
      { id: '3-1', weight: 12, reps: 10, completed: false },
      { id: '3-2', weight: 14, reps: 8, completed: false }
    ]
  },
  {
    id: '4',
    name: "Curl Biceps",
    asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.png",
    gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.gif",
    equipment: "cable",
    completed: false,
    sets: [
      { id: '4-1', weight: 15, reps: 12, completed: false },
      { id: '4-2', weight: 17, reps: 10, completed: false }
    ]
  }
];

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      exercises: initialExercises,
      tempExercises: initialExercises,
      selectedExerciseId: '1',
      editMode: false,
      hasChanges: false,
      
      setSelectedExercise: (id) => set({ selectedExerciseId: id }),
      
      toggleEditMode: () => {
        const { editMode, exercises } = get();
        set({
          editMode: !editMode,
          tempExercises: !editMode ? [...exercises] : get().tempExercises,
          hasChanges: false
        });
      },
      
      reorderExercises: (fromIndex, toIndex) => {
        const { tempExercises } = get();
        const newExercises = [...tempExercises];
        const [movedExercise] = newExercises.splice(fromIndex, 1);
        newExercises.splice(toIndex, 0, movedExercise);
        
        set({
          tempExercises: newExercises,
          hasChanges: JSON.stringify(newExercises) !== JSON.stringify(get().exercises)
        });
      },
      
      deleteExercise: (id) => {
        const newExercises = get().tempExercises.filter(ex => ex.id !== id);
        set({
          tempExercises: newExercises,
          hasChanges: JSON.stringify(newExercises) !== JSON.stringify(get().exercises)
        });
      },
      
      saveChanges: () => {
        const { tempExercises } = get();
        set({
          exercises: tempExercises,
          editMode: false,
          hasChanges: false,
          selectedExerciseId: tempExercises[0]?.id || null
        });
      },
      
      discardChanges: () => {
        set({
          tempExercises: [...get().exercises],
          editMode: false,
          hasChanges: false
        });
      },
      
      toggleExerciseCompletion: (id) => {
        set({
          exercises: get().exercises.map(ex => 
            ex.id === id ? { ...ex, completed: !ex.completed } : ex
          )
        });
      },
      addExercise: () => {
        const newExercise: Exercise = {
          id: Date.now().toString(),
          name: "New Exercise",
          asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.png",
          gif_asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif",
          equipment: "bodyweight",
          completed: false,
          sets: [
            { id: `${Date.now()}-1`, weight: 0, reps: 0, completed: false }
          ]
        };
        
        set({
          tempExercises: [...get().tempExercises, newExercise],
          hasChanges: true
        });
      },
      
      addSet: (exerciseId) => {
        const { tempExercises } = get();
        const exerciseIndex = tempExercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex === -1) return;
      
        const newSet: ExerciseSet = {
          id: `${exerciseId}-${Date.now()}`,
          weight: 0,
          reps: 0,
          tenRm: 0, 
          completed: false
        };
      
        set({
          tempExercises: [
            ...tempExercises.slice(0, exerciseIndex),
            {
              ...tempExercises[exerciseIndex],
              sets: [...tempExercises[exerciseIndex].sets, newSet]
            },
            ...tempExercises.slice(exerciseIndex + 1)
          ],
          hasChanges: true
        });
      },
      
      updateSet: (exerciseId, setId, updates) => {
        const { tempExercises } = get();
        const exerciseIndex = tempExercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex === -1) return;

        const setIndex = tempExercises[exerciseIndex].sets.findIndex(s => s.id === setId);
        if (setIndex === -1) return;

        const updatedSets = [...tempExercises[exerciseIndex].sets];
        updatedSets[setIndex] = { ...updatedSets[setIndex], ...updates };

        const allSetsCompleted = updatedSets.every(set => set.completed);

        set({
          tempExercises: [
            ...tempExercises.slice(0, exerciseIndex),
            {
              ...tempExercises[exerciseIndex],
              sets: updatedSets,
              completed: allSetsCompleted
            },
            ...tempExercises.slice(exerciseIndex + 1)
          ],
          hasChanges: true
        });
      },
      
      deleteSet: (exerciseId, setId) => {
        const { tempExercises } = get();
        const exerciseIndex = tempExercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex === -1) return;

        const updatedSets = tempExercises[exerciseIndex].sets.filter(s => s.id !== setId);

        set({
          tempExercises: [
            ...tempExercises.slice(0, exerciseIndex),
            {
              ...tempExercises[exerciseIndex],
              sets: updatedSets,
              completed: updatedSets.length > 0 ? updatedSets.every(set => set.completed) : false
            },
            ...tempExercises.slice(exerciseIndex + 1)
          ],
          hasChanges: true
        });
      },
      
      toggleSetCompletion: (exerciseId, setId) => {
        const { exercises } = get();
        const exerciseIndex = exercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex === -1) return;

        const setIndex = exercises[exerciseIndex].sets.findIndex(s => s.id === setId);
        if (setIndex === -1) return;

        const updatedSets = [...exercises[exerciseIndex].sets];
        updatedSets[setIndex] = { 
          ...updatedSets[setIndex], 
          completed: !updatedSets[setIndex].completed 
        };

        const allSetsCompleted = updatedSets.every(set => set.completed);

        set({
          exercises: [
            ...exercises.slice(0, exerciseIndex),
            {
              ...exercises[exerciseIndex],
              sets: updatedSets,
              completed: allSetsCompleted
            },
            ...exercises.slice(exerciseIndex + 1)
          ]
        });
      }
    }),
    {
      name: 'workout-storage',
      partialize: (state) => ({ exercises: state.exercises }),
    }
  )
);