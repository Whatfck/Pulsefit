import { TestBed } from "@angular/core/testing";
import { vi } from "vitest";
import { TimerService } from "../../../core/services/timer.service";
import { WaterService } from "../../../core/services/water.service";
import { ToolsPageComponent } from "./tools-page.component";

describe("ToolsPageComponent", () => {
  beforeEach(async () => {
    localStorage.clear();
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [ToolsPageComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders rest timer presets and stops timer when component is destroyed", () => {
    const fixture = TestBed.createComponent(ToolsPageComponent);
    const timer = TestBed.inject(TimerService);
    fixture.detectChanges();

    const presetButtons = Array.from(
      fixture.nativeElement.querySelectorAll(".preset-group button"),
    ) as HTMLButtonElement[];
    expect(presetButtons.map((b) => b.textContent?.trim())).toEqual([
      "30 s",
      "60 s",
      "90 s",
      "120 s",
    ]);

    presetButtons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="timer-display"]').textContent.trim()).toBe("00:30");

    timer.start();
    vi.advanceTimersByTime(3000);
    expect(timer.isRunning()).toBe(true);

    fixture.destroy();
    expect(timer.isRunning()).toBe(false);
    vi.advanceTimersByTime(5000);
    expect(timer.seconds()).toBe(27);
  });

  it("renders 8 target water slots and delegates controls to WaterService", () => {
    const fixture = TestBed.createComponent(ToolsPageComponent);
    const water = TestBed.inject(WaterService);
    fixture.detectChanges();

    const slots = fixture.nativeElement.querySelectorAll(".glass-slot");
    expect(slots.length).toBe(8);

    water.addGlass();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="water-count"]').textContent.trim()).toBe("1");
    expect(fixture.nativeElement.querySelector('[data-testid="water-percent"]').textContent).toContain("13%");
  });
});
