import { Injectable, computed, signal, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService implements OnDestroy {
  private readonly _seconds = signal<number>(60);
  private readonly _initialSeconds = signal<number>(60);
  private readonly _isRunning = signal<boolean>(false);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly seconds = this._seconds.asReadonly();
  readonly isRunning = this._isRunning.asReadonly();
  readonly initialSeconds = this._initialSeconds.asReadonly();

  readonly formattedTime = computed(() => {
    const total = this._seconds();
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  });

  setTimer(seconds: number): void {
    this.pause();
    this._initialSeconds.set(seconds);
    this._seconds.set(seconds);
  }

  start(): void {
    if (this._isRunning() || this._seconds() <= 0) return;

    this._isRunning.set(true);
    this.intervalId = setInterval(() => {
      const current = this._seconds();
      if (current > 1) {
        this._seconds.set(current - 1);
      } else {
        this._seconds.set(0);
        this.pause();
        alert('⏰ ¡Tiempo de descanso completado! A por la siguiente serie.');
      }
    }, 1000);
  }

  pause(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this._isRunning.set(false);
  }

  reset(): void {
    this.pause();
    this._seconds.set(this._initialSeconds());
  }

  ngOnDestroy(): void {
    this.pause();
  }
}
