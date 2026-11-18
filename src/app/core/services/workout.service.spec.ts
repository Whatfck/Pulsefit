import { TestBed } from "@angular/core/testing";
import { WorkoutService } from "./workout.service";
import { StorageService } from "./storage.service";

describe("WorkoutService", () => {
  let service: WorkoutService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it("adds a valid workout", () => {
    const before = service.sessions().length;
    expect(service.add({ date: "2026-11-17", name: "Pierna", durationMinutes: 60, intensity: "alta" })).toBe(true);
    expect(service.sessions().length).toBe(before + 1);
  });

  it("removes a workout", () => {
    const workout = service.sessions()[0];
    service.remove(workout.id);
    expect(service.sessions().find((item) => item.id === workout.id)).toBeUndefined();
  });

  it("persists workouts", () => {
    service.add({ date: "2026-11-16", name: "Cardio", durationMinutes: 30, intensity: "media" });
    const reloaded = TestBed.inject(StorageService).read<unknown[]>("pulsefit.workouts");
    expect(reloaded).toBeDefined();
  });

  it("validates dates and durations", () => {
    expect(service.isValid({ date: "2026-02-30", name: "Prueba", durationMinutes: 30 })).toBe(false);
    expect(service.isValid({ date: "2026-11-17", name: "Prueba", durationMinutes: 0 })).toBe(false);
    expect(service.isValid({ date: "2026-11-17", name: "Prueba", durationMinutes: 45 })).toBe(true);
  });
});
