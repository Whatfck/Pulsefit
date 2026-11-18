import {
  FitnessMetrics,
  FitnessGoal,
  Gender,
  MacroDistribution,
  UserProfile,
} from "../models/profile.model";

export function calculateBmi(weight: number, height: number): number {
  if (weight <= 0 || height <= 0) return 0;
  return Number((weight / (height / 100) ** 2).toFixed(1));
}

export function getBmiStatus(bmi: number): string {
  if (bmi <= 0) return "Datos insuficientes";
  if (bmi < 18.5) return "Bajo peso estimado";
  if (bmi < 25) return "Peso saludable estimado";
  if (bmi < 30) return "Sobrepeso estimado";
  return "Obesidad estimada";
}

export function calculateBmr(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(base + (gender === "male" ? 5 : -161));
}

export function getTargetCalories(
  tdee: number,
  goal: FitnessGoal,
): { targetCalories: number; goalLabel: string } {
  if (goal === "lose") {
    return {
      targetCalories: Math.max(1200, tdee - 400),
      goalLabel: "Déficit estimado (-400 kcal)",
    };
  }

  if (goal === "gain") {
    return {
      targetCalories: tdee + 400,
      goalLabel: "Superávit estimado (+400 kcal)",
    };
  }

  return {
    targetCalories: tdee,
    goalLabel: "Mantenimiento estimado",
  };
}

export function calculateMacros(
  weight: number,
  targetCalories: number,
): MacroDistribution {
  const proteinGrams = Math.round(weight * 2);
  const proteinCalories = proteinGrams * 4;
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.max(0, Math.round(fatCalories / 9));
  const carbohydrateCalories = Math.max(
    0,
    targetCalories - proteinCalories - fatCalories,
  );
  const carbGrams = Math.max(
    0,
    Math.round(carbohydrateCalories / 4),
  );

  return { proteinGrams, fatGrams, carbGrams };
}

export function calculateFitnessMetrics(
  profile: UserProfile,
): FitnessMetrics {
  const bmi = calculateBmi(profile.weight, profile.height);
  const bmr = calculateBmr(
    profile.weight,
    profile.height,
    profile.age,
    profile.gender,
  );
  const tdee = Math.round(bmr * profile.activityLevel);
  const { targetCalories, goalLabel } = getTargetCalories(
    tdee,
    profile.goal,
  );

  return {
    bmi,
    bmiStatus: getBmiStatus(bmi),
    bmr,
    tdee,
    targetCalories,
    goalLabel,
    macros: calculateMacros(profile.weight, targetCalories),
  };
}
