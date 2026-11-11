import { Injectable, computed, signal } from '@angular/core';
import { WorkoutLog } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  // In-memory workout logs initialized with sample data
  private readonly _workouts = signal<WorkoutLog[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      name: 'Pecho + Tríceps (Hipertrofia)',
      duration: 60,
      intensity: 'Alta',
      details: 'Press banca 4x10 (80kg), Aperturas 3x12 (16kg), Fondos 3x15'
    }
  ]);

  readonly workouts = this._workouts.asReadonly();
  readonly totalWorkouts = computed(() => this._workouts().length);

  addWorkout(workout: Omit<WorkoutLog, 'id'>): void {
    const newLog: WorkoutLog = {
      ...workout,
      id: Date.now()
    };
    this._workouts.update((logs) => [newLog, ...logs]);
  }

  deleteWorkout(id: number): void {
    this._workouts.update((logs) => logs.filter((log) => log.id !== id));
  }
}
