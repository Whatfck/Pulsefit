export type WorkoutIntensity = "baja" | "media" | "alta";

export interface WorkoutSession {
  id: string;
  date: string;
  name: string;
  durationMinutes: number;
  intensity: WorkoutIntensity;
  details?: string;
  createdAt: number;
}
