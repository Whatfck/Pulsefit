import { Injectable, OnDestroy, computed, signal } from "@angular/core";

export type TimerPreset = 30 | 60 | 90 | 120;

@Injectable({ providedIn: "root" })
export class TimerService implements OnDestroy {
  readonly presets: readonly TimerPreset[] = [30, 60, 90, 120];

  private readonly _initialSeconds = signal<number>(60);
  private readonly _seconds = signal<number>(60);
  private readonly _isRunning = signal<boolean>(false);
  private readonly _isCompleted = signal<boolean>(false);
  private readonly _statusMessage = signal<string>("Temporizador listo en 01:00.");
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly initialSeconds = this._initialSeconds.asReadonly();
  readonly seconds = this._seconds.asReadonly();
  readonly isRunning = this._isRunning.asReadonly();
  readonly isCompleted = this._isCompleted.asReadonly();
  readonly statusMessage = this._statusMessage.asReadonly();

  readonly formattedTime = computed(() => {
    const total = this._seconds();
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  });

  readonly progressPercent = computed(() => {
    const initial = this._initialSeconds();
    if (initial <= 0) return 0;
    const elapsed = initial - this._seconds();
    return Math.min(100, Math.max(0, Math.round((elapsed / initial) * 100)));
  });

  setPreset(seconds: TimerPreset): void {
    this.clearTimerInterval();
    this._isRunning.set(false);
    this._isCompleted.set(false);
    this._initialSeconds.set(seconds);
    this._seconds.set(seconds);
    this._statusMessage.set(`Temporizador configurado en ${this.formattedTime()}.`);
  }

  start(): void {
    if (this._isRunning() || this._seconds() <= 0) {
      return;
    }

    this.clearTimerInterval();
    this._isCompleted.set(false);
    this._isRunning.set(true);
    this._statusMessage.set(`Temporizador en marcha: ${this.formattedTime()} restantes.`);

    this.intervalId = setInterval(() => {
      const current = this._seconds();
      if (current > 1) {
        this._seconds.set(current - 1);
        return;
      }

      this._seconds.set(0);
      this.clearTimerInterval();
      this._isRunning.set(false);
      this._isCompleted.set(true);
      this._statusMessage.set(
        "Tiempo de descanso completado. Puedes continuar con tu siguiente serie.",
      );
    }, 1000);
  }

  pause(): void {
    this.clearTimerInterval();
    if (this._isRunning()) {
      this._isRunning.set(false);
      this._statusMessage.set(`Temporizador en pausa en ${this.formattedTime()}.`);
    }
  }

  reset(): void {
    this.clearTimerInterval();
    this._isRunning.set(false);
    this._isCompleted.set(false);
    this._seconds.set(this._initialSeconds());
    this._statusMessage.set(`Temporizador reiniciado a ${this.formattedTime()}.`);
  }

  dismissCompletion(): void {
    this._isCompleted.set(false);
  }

  ngOnDestroy(): void {
    this.pause();
  }

  private clearTimerInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
