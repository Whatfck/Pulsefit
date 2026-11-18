export type RoutineCategory = "principiante" | "hipertrofia" | "fuerza";

export interface RoutineExercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface Routine {
  id: string;
  name: string;
  category: RoutineCategory;
  description: string;
  exercises: RoutineExercise[];
}
