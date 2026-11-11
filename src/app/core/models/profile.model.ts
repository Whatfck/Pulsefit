export type Gender = 'male' | 'female';
export type FitnessGoal = 'lose' | 'maintain' | 'gain';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  weight: number; // in kg
  height: number; // in cm
  goal: FitnessGoal;
  activityLevel: number; // 1.2, 1.375, 1.55, 1.725
}

export interface MacroDistribution {
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
}

export interface FitnessMetrics {
  bmi: number;
  bmiStatus: string;
  tdee: number;
  targetCalories: number;
  goalLabel: string;
  macros: MacroDistribution;
}
