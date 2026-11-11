import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaterService {
  readonly targetGlasses = 8;
  readonly maxGlasses = 12;

  private readonly _glasses = signal<number>(0);

  readonly glasses = this._glasses.asReadonly();

  readonly glassIcons = computed(() => {
    const current = this._glasses();
    return Array.from({ length: this.targetGlasses }, (_, i) => ({
      index: i + 1,
      filled: i < current
    }));
  });

  addGlass(): void {
    if (this._glasses() < this.maxGlasses) {
      this._glasses.update((count) => count + 1);
    }
  }

  reset(): void {
    this._glasses.set(0);
  }
}
