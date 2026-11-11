import { Injectable, computed, signal } from '@angular/core';
import { FitnessMetrics, UserProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // In-memory reactive state (sin persistencia externa)
  private readonly _profile = signal<UserProfile | null>({
    name: 'Juan Pérez',
    age: 25,
    gender: 'male',
    weight: 75.5,
    height: 175,
    goal: 'maintain',
    activityLevel: 1.55
  });

  private readonly _dailyQuote = signal<string>(
    '"El único entrenamiento malo es el que no sucedió."'
  );

  readonly profile = this._profile.asReadonly();
  readonly dailyQuote = this._dailyQuote.asReadonly();

  readonly metrics = computed<FitnessMetrics | null>(() => {
    const p = this._profile();
    if (!p || !p.weight || !p.height) return null;

    // 1. BMI Calculation
    const heightInMeters = p.height / 100;
    const bmiVal = p.weight / (heightInMeters * heightInMeters);
    const bmi = parseFloat(bmiVal.toFixed(1));

    let bmiStatus = 'Peso saludable';
    if (bmi < 18.5) bmiStatus = 'Bajo peso';
    else if (bmi < 25) bmiStatus = 'Peso saludable';
    else if (bmi < 30) bmiStatus = 'Sobrepeso';
    else bmiStatus = 'Obesidad';

    // 2. BMR (Mifflin-St Jeor) & TDEE
    let bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age;
    bmr += p.gender === 'male' ? 5 : -161;

    const tdee = Math.round(bmr * p.activityLevel);

    // 3. Goal Calories
    let targetCalories = tdee;
    let goalLabel = 'Según tu meta';
    if (p.goal === 'lose') {
      targetCalories -= 400;
      goalLabel = 'Déficit calórico (-400 kcal)';
    } else if (p.goal === 'gain') {
      targetCalories += 400;
      goalLabel = 'Superávit calórico (+400 kcal)';
    } else {
      goalLabel = 'Mantenimiento saludable';
    }

    // 4. Macronutrients Calculation
    const proteinGrams = Math.round(p.weight * 2.0);
    const proteinCals = proteinGrams * 4;

    const fatCals = targetCalories * 0.25;
    const fatGrams = Math.max(0, Math.round(fatCals / 9));

    const carbCals = targetCalories - (proteinCals + fatCals);
    const carbGrams = Math.max(0, Math.round(carbCals / 4));

    return {
      bmi,
      bmiStatus,
      tdee,
      targetCalories,
      goalLabel,
      macros: {
        proteinGrams,
        fatGrams,
        carbGrams
      }
    };
  });

  saveProfile(profile: UserProfile): void {
    this._profile.set({ ...profile });
  }

  setQuote(quote: string): void {
    this._dailyQuote.set(quote);
  }
}
