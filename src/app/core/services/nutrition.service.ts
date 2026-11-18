import { Injectable, computed, inject, signal } from "@angular/core";
import {
  MacroDistribution,
  NutritionGoal,
  NutritionSummary,
} from "../models/nutrition.model";
import { ProfileData, ProfileService } from "./profile.service";

interface GoalConfig {
  label: string;
  description: string;
  calorieDelta: number;
  proteinPerKg: number;
  fatShare: number;
  mealsPerDay: string;
  recommendations: string[];
  mealTips: string[];
}

const GOAL_CONFIGS: Record<NutritionGoal, GoalConfig> = {
  deficit: {
    label: "Déficit moderado",
    description:
      "Reducción calórica orientativa para favorecer la pérdida gradual de grasa manteniendo la masa muscular.",
    calorieDelta: -400,
    proteinPerKg: 2.0,
    fatShare: 0.25,
    mealsPerDay: "3 a 4 comidas principales",
    recommendations: [
      "Prioriza fuentes magras de proteína en cada comida para favorecer la saciedad.",
      "Incluye verduras y alimentos ricos en fibra para mantener un buen volumen en el plato.",
      "Evita recortes extremos; un ajuste moderado suele ser más sostenible en el tiempo.",
    ],
    mealTips: [
      "Distribuye la proteína de forma equilibrada a lo largo del día.",
      "Reserva una porción de carbohidratos cerca de tus sesiones de entrenamiento.",
    ],
  },
  maintenance: {
    label: "Mantenimiento",
    description:
      "Aporte calórico cercano al gasto diario estimado para sostener el peso y el rendimiento habitual.",
    calorieDelta: 0,
    proteinPerKg: 1.8,
    fatShare: 0.28,
    mealsPerDay: "3 a 4 comidas balanceadas",
    recommendations: [
      "Mantén una proporción estable entre proteínas, carbohidratos complejos y grasas saludables.",
      "Ajusta las porciones según tu nivel de actividad semanal y sensaciones de energía.",
      "Observa tendencias de varias semanas en lugar de cambios aislados de un solo día.",
    ],
    mealTips: [
      "Combina proteína y carbohidratos complejos en tus comidas principales.",
      "Incluye grasas saludables como aceite de oliva, frutos secos o aguacate con moderación.",
    ],
  },
  volume: {
    label: "Volumen",
    description:
      "Superávit calórico moderado para respaldar la recuperación y el desarrollo muscular junto al entrenamiento.",
    calorieDelta: 350,
    proteinPerKg: 1.9,
    fatShare: 0.25,
    mealsPerDay: "4 a 5 comidas al día",
    recommendations: [
      "Acompaña el superávit con entrenamiento de fuerza progresivo y descanso suficiente.",
      "Prioriza alimentos densos en nutrientes antes que ultraprocesados para cubrir tus calorías.",
      "Si el aumento de energía resulta incómodo en pocas tomas, reparte la ingesta en más comidas.",
    ],
    mealTips: [
      "Añade una comida o merienda extra si te cuesta alcanzar el objetivo calórico.",
      "Asegura carbohidratos suficientes antes y después de entrenar para rendir mejor.",
    ],
  },
};

@Injectable({ providedIn: "root" })
export class NutritionService {
  private readonly profileService = inject(ProfileService);

  private readonly _selectedGoal = signal<NutritionGoal>("maintenance");
  readonly selectedGoal = this._selectedGoal.asReadonly();

  readonly hasCalculatedProfile = computed(() =>
    this.isProfileComplete(this.profileService.profile()),
  );

  readonly summary = computed<NutritionSummary | null>(() => {
    const profile = this.profileService.profile();
    if (!profile || !this.isProfileComplete(profile)) {
      return null;
    }

    const goal = this._selectedGoal();
    const config = GOAL_CONFIGS[goal];
    const weightKg = profile.weight ?? profile.weightKg!;
    const heightCm = profile.height ?? profile.heightCm!;
    const age = profile.age!;

    // Estimación orientativa basada en Mifflin-St Jeor neutra y factor moderado (1.45).
    const estimatedBmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 78;
    const estimatedTdee = Math.max(1200, Math.round(estimatedBmr * 1.45));
    const targetCalories = Math.max(1200, estimatedTdee + config.calorieDelta);

    const macros = this.calculateMacros(weightKg, targetCalories, config);
    const hydrationLiters = Math.max(1.5, Math.round((weightKg * 35) / 100) / 10);
    const hydrationGlassesApprox = Math.max(6, Math.round((hydrationLiters * 1000) / 250));

    return {
      goal,
      goalLabel: config.label,
      goalDescription: config.description,
      estimatedTdee,
      targetCalories,
      calorieAdjustment: config.calorieDelta,
      macros,
      hydrationLiters,
      hydrationGlassesApprox,
      mealsPerDay: config.mealsPerDay,
      recommendations: config.recommendations,
      hydrationTips: [
        `Referencia general: alrededor de ${hydrationLiters.toFixed(1)} L al día (~${hydrationGlassesApprox} vasos de 250 ml).`,
        "Aumenta la ingesta de líquidos en días calurosos o tras entrenamientos intensos.",
        "Reparte el consumo de agua de forma constante durante la jornada.",
      ],
      mealTips: config.mealTips,
    };
  });

  setGoal(goal: NutritionGoal): void {
    this._selectedGoal.set(goal);
  }

  private isProfileComplete(profile: ProfileData | null): boolean {
    if (!profile) return false;

    const weightKg = profile.weight ?? profile.weightKg;
    const heightCm = profile.height ?? profile.heightCm;
    return (
      typeof weightKg === "number" &&
      weightKg > 0 &&
      typeof heightCm === "number" &&
      heightCm > 0 &&
      typeof profile.age === "number" &&
      profile.age > 0
    );
  }

  private calculateMacros(
    weightKg: number,
    targetCalories: number,
    config: GoalConfig,
  ): MacroDistribution {
    const proteinGrams = Math.max(1, Math.round(weightKg * config.proteinPerKg));
    const proteinCalories = proteinGrams * 4;

    const fatCaloriesTarget = Math.round(targetCalories * config.fatShare);
    const fatGrams = Math.max(1, Math.round(fatCaloriesTarget / 9));
    const fatCalories = fatGrams * 9;

    const remainingCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
    const carbGrams = Math.round(remainingCalories / 4);
    const carbCalories = carbGrams * 4;

    const totalMacroCalories = Math.max(1, proteinCalories + fatCalories + carbCalories);
    const proteinPercent = Math.round((proteinCalories / totalMacroCalories) * 100);
    const fatPercent = Math.round((fatCalories / totalMacroCalories) * 100);
    const carbPercent = Math.max(0, 100 - proteinPercent - fatPercent);

    return {
      proteinGrams,
      fatGrams,
      carbGrams,
      proteinPercent,
      fatPercent,
      carbPercent,
    };
  }
}
