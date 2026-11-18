export type Gender = "male" | "female";
export type FitnessGoal = "lose" | "maintain" | "gain";

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  goal: FitnessGoal;
  activityLevel: number;
}

export interface MacroDistribution {
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
}

export interface FitnessMetrics {
  bmi: number;
  bmiStatus: string;
  bmr: number;
  tdee: number;
  targetCalories: number;
  goalLabel: string;
  macros: MacroDistribution;
}
