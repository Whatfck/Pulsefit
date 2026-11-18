import { TestBed } from "@angular/core/testing";
import { vi } from "vitest";
import { TimerService } from "./timer.service";

describe("TimerService", () => {
  let service: TimerService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  afterEach(() => {
    service.ngOnDestroy();
    vi.useRealTimers();
  });

  it("supports 30, 60, 90, and 120 second presets", () => {
    expect(service.presets).toEqual([30, 60, 90, 120]);
    service.setPreset(90);
    expect(service.seconds()).toBe(90);
    expect(service.formattedTime()).toBe("01:30");
  });

  it("starts and counts down without creating duplicate intervals", () => {
    service.setPreset(30);
    service.start();
    service.start();

    vi.advanceTimersByTime(3000);
    expect(service.seconds()).toBe(27);
    expect(service.isRunning()).toBe(true);
  });

  it("pauses and resets to the selected preset", () => {
    service.setPreset(60);
    service.start();
    vi.advanceTimersByTime(5000);
    service.pause();

    expect(service.isRunning()).toBe(false);
    expect(service.seconds()).toBe(55);

    vi.advanceTimersByTime(5000);
    expect(service.seconds()).toBe(55);

    service.reset();
    expect(service.seconds()).toBe(60);
    expect(service.isCompleted()).toBe(false);
  });

  it("detects completion and stops at zero", () => {
    service.setPreset(30);
    service.start();
    vi.advanceTimersByTime(30000);

    expect(service.seconds()).toBe(0);
    expect(service.isRunning()).toBe(false);
    expect(service.isCompleted()).toBe(true);
    expect(service.statusMessage()).toContain("completado");
  });

  it("clears running interval on destroy", () => {
    service.setPreset(30);
    service.start();
    vi.advanceTimersByTime(2000);
    service.ngOnDestroy();

    expect(service.isRunning()).toBe(false);
    vi.advanceTimersByTime(5000);
    expect(service.seconds()).toBe(28);
  });
});
