export type RoutineCategory = 'principiante' | 'hipertrofia' | 'fuerza';

export interface RoutineExercise {
  name: string;
  sets: string;
  rest: string;
}

export interface Routine {
  id: number;
  title: string;
  category: RoutineCategory;
  tag: string;
  tagColor: string;
  description: string;
  exercises: RoutineExercise[];
}
