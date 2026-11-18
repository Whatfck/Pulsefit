import { describe, expect, it } from "vitest";
import {
  calculateBmi,
  calculateBmr,
  calculateFitnessMetrics,
  calculateMacros,
  getBmiStatus,
  getTargetCalories,
} from "./profile-calculator";
import { UserProfile } from "../models/profile.model";

describe("profile-calculator", () => {
  it("calculates BMI and rounded BMR", () => {
    expect(calculateBmi(75.5, 175)).toBe(24.7);
    expect(calculateBmr(75.5, 175, 25, "male")).toBe(1729);
    expect(calculateBmr(75.5, 175, 25, "female")).toBe(1563);
  });

  it("returns zero BMI for invalid dimensions", () => {
    expect(calculateBmi(0, 175)).toBe(0);
    expect(calculateBmi(75, 0)).toBe(0);
  });

  it("maps BMI boundaries to weight estimates", () => {
    expect(getBmiStatus(18.4)).toBe("Bajo peso estimado");
    expect(getBmiStatus(18.5)).toBe("Peso saludable estimado");
    expect(getBmiStatus(24.9)).toBe("Peso saludable estimado");
    expect(getBmiStatus(25)).toBe("Sobrepeso estimado");
    expect(getBmiStatus(30)).toBe("Obesidad estimada");
  });

  it("adjusts calories for every fitness goal", () => {
    expect(getTargetCalories(2400, "maintain").targetCalories).toBe(2400);
    expect(getTargetCalories(2400, "lose").targetCalories).toBe(2000);
    expect(getTargetCalories(2400, "gain").targetCalories).toBe(2800);
  });

  it("does not lower a deficit below the supported calorie floor", () => {
    expect(getTargetCalories(1400, "lose").targetCalories).toBe(1200);
  });

  it("calculates a macro distribution that remains within calorie targets", () => {
    expect(calculateMacros(75, 2400)).toEqual({
      proteinGrams: 150,
      fatGrams: 67,
      carbGrams: 300,
    });
  });

  it("calculates a complete fitness estimate", () => {
    const profile: UserProfile = {
      name: "Test",
      age: 25,
      gender: "male",
      weight: 75,
      height: 175,
      goal: "maintain",
      activityLevel: 1.55,
    };

    const metrics = calculateFitnessMetrics(profile);
    expect(metrics.bmi).toBe(24.5);
    expect(metrics.bmr).toBe(1724);
    expect(metrics.tdee).toBe(2672);
    expect(metrics.targetCalories).toBe(2672);
  });

  it("supports gain and deficit goals in complete calculations", () => {
    const baseProfile: UserProfile = {
      name: "Test",
      age: 30,
      gender: "female",
      weight: 60,
      height: 165,
      goal: "maintain",
      activityLevel: 1.375,
    };

    expect(
      calculateFitnessMetrics({ ...baseProfile, goal: "lose" }).targetCalories,
    ).toBeLessThan(calculateFitnessMetrics(baseProfile).targetCalories);
    expect(
      calculateFitnessMetrics({ ...baseProfile, goal: "gain" }).targetCalories,
    ).toBeGreaterThan(calculateFitnessMetrics(baseProfile).targetCalories);
  });
});
