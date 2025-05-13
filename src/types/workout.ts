export type Equipment = 'barbell' | 'bodyweight' | 'dumbbell' | 'cable';

export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  asset_url: string;
  gif_asset_url: string;
  equipment: Equipment;
  completed: boolean;
  sets: ExerciseSet[];
}

export interface WorkoutState {
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
  updateSet: (
    exerciseId: string, 
    setId: string, 
    updates: Partial<ExerciseSet>
  ) => void;
  deleteSet: (exerciseId: string, setId: string) => void;
  toggleSetCompletion: (exerciseId: string, setId: string) => void;
}

export interface ExerciseItemProps {
  exercise: Exercise;
  drag?: () => void;
  editMode: boolean;
  selected: boolean;
}

export interface ExerciseGifProps {
  gifUrl: string;
  equipment: Equipment;
}

export interface SetsSectionProps {
  exercise: Exercise;
  editMode: boolean;
}

export interface SetItemProps {
  set: ExerciseSet;
  index: number;
  exerciseId: string;
  editMode: boolean;
}

export interface ActionButtonsProps {
  onReplace?: () => void;
  onInstructions?: () => void;
  onWarmUp?: () => void;
  onFAQ?: () => void;
}

export interface HeaderProps {
  time: number;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export interface EditFooterProps {
  hasChanges: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export interface ExerciseListProps {
  exercises: Exercise[];
  selectedExerciseId: string | null;
  editMode: boolean;
}

export interface ExerciseDetailsProps {
  exercise: Exercise;
  editMode: boolean;
}