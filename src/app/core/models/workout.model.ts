export type WorkoutIntensity = 'Baja' | 'Media' | 'Alta' | 'Extrema';

export interface WorkoutLog {
  id: number;
  date: string;
  name: string;
  duration: number; // in minutes
  intensity: WorkoutIntensity;
  details?: string;
}
