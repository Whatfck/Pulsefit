import { TestBed } from "@angular/core/testing";
import { NutritionService } from "./nutrition.service";
import { ProfileService } from "./profile.service";

describe("NutritionService", () => {
  let service: NutritionService;
  let profileService: ProfileService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    profileService = TestBed.inject(ProfileService);
    service = TestBed.inject(NutritionService);
  });

  it("returns null summary when no calculated profile exists", () => {
    expect(service.hasCalculatedProfile()).toBe(false);
    expect(service.summary()).toBeNull();
  });

  it("calculates maintenance calories and macro distribution from profile", () => {
    profileService.save({ name: "Julián", age: 25, weightKg: 70, heightCm: 175 });
    service.setGoal("maintenance");

    const summary = service.summary();
    expect(summary).not.toBeNull();
    expect(summary!.goal).toBe("maintenance");
    expect(summary!.targetCalories).toBe(summary!.estimatedTdee);
    expect(summary!.macros.proteinGrams).toBe(126);
    expect(
      summary!.macros.proteinPercent +
        summary!.macros.fatPercent +
        summary!.macros.carbPercent,
    ).toBe(100);
    expect(summary!.recommendations.length).toBeGreaterThan(0);
  });

  it("calculates deficit below maintenance TDEE", () => {
    profileService.save({ name: "Julián", age: 25, weightKg: 70, heightCm: 175 });
    service.setGoal("deficit");

    const summary = service.summary();
    expect(summary).not.toBeNull();
    expect(summary!.goal).toBe("deficit");
    expect(summary!.targetCalories).toBe(summary!.estimatedTdee - 400);
    expect(summary!.macros.proteinGrams).toBe(140);
  });

  it("calculates volume above maintenance TDEE", () => {
    profileService.save({ name: "Julián", age: 25, weightKg: 70, heightCm: 175 });
    service.setGoal("volume");

    const summary = service.summary();
    expect(summary).not.toBeNull();
    expect(summary!.goal).toBe("volume");
    expect(summary!.targetCalories).toBe(summary!.estimatedTdee + 350);
    expect(summary!.macros.proteinGrams).toBe(133);
  });
});
