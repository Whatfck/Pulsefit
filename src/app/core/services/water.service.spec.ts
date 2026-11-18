import { TestBed } from "@angular/core/testing";
import { vi } from "vitest";
import { StorageService } from "./storage.service";
import { WaterService } from "./water.service";

describe("WaterService", () => {
  let service: WaterService;
  let storage: StorageService;

  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 17, 10, 0, 0));
    TestBed.configureTestingModule({});
    storage = TestBed.inject(StorageService);
    service = TestBed.inject(WaterService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("increments and removes glasses within bounds", () => {
    expect(service.glasses()).toBe(0);
    service.addGlass();
    service.addGlass();
    expect(service.glasses()).toBe(2);
    expect(service.progressPercent()).toBe(25);

    service.removeGlass();
    expect(service.glasses()).toBe(1);

    service.removeGlass();
    service.removeGlass();
    expect(service.glasses()).toBe(0);
  });

  it("enforces a maximum of 12 glasses", () => {
    for (let i = 0; i < 15; i++) {
      service.addGlass();
    }
    expect(service.glasses()).toBe(12);
    expect(service.isAtMax()).toBe(true);
    expect(service.progressPercent()).toBe(100);
  });

  it("resets progress and persists state in localStorage", () => {
    service.addGlass();
    service.addGlass();
    const saved = storage.read<{ date: string; glasses: number }>("pulsefit.water");
    expect(saved?.glasses).toBe(2);

    service.reset();
    expect(service.glasses()).toBe(0);
    const afterReset = storage.read<{ date: string; glasses: number }>("pulsefit.water");
    expect(afterReset?.glasses).toBe(0);
  });

  it("resets automatically when the day changes", () => {
    service.addGlass();
    service.addGlass();
    service.addGlass();
    expect(service.glasses()).toBe(3);

    const nextDay = new Date(2026, 10, 18, 8, 0, 0);
    const rolledOver = service.syncDay(nextDay);
    expect(rolledOver).toBe(true);
    expect(service.glasses()).toBe(0);
  });
});
