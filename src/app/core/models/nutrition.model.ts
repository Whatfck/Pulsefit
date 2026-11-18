export type NutritionGoal = "deficit" | "maintenance" | "volume";

export interface MacroDistribution {
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  proteinPercent: number;
  fatPercent: number;
  carbPercent: number;
}

export interface NutritionSummary {
  goal: NutritionGoal;
  goalLabel: string;
  goalDescription: string;
  estimatedTdee: number;
  targetCalories: number;
  calorieAdjustment: number;
  macros: MacroDistribution;
  hydrationLiters: number;
  hydrationGlassesApprox: number;
  mealsPerDay: string;
  recommendations: string[];
  hydrationTips: string[];
  mealTips: string[];
}
