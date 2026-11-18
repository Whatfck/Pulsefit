import { Injectable, computed, signal } from "@angular/core";
import { StorageService } from "./storage.service";

export interface StoredWaterProgress {
  date: string;
  glasses: number;
}

export interface WaterGlassSlot {
  index: number;
  filled: boolean;
  label: string;
}

@Injectable({ providedIn: "root" })
export class WaterService {
  readonly targetGlasses = 8;
  readonly maxGlasses = 12;

  private readonly key = "pulsefit.water";
  private readonly _glasses = signal<number>(0);
  private _currentDate = this.getLocalDateKey();

  readonly glasses = this._glasses.asReadonly();

  readonly progressPercent = computed(() =>
    Math.min(100, Math.round((this._glasses() / this.targetGlasses) * 100)),
  );

  readonly goalReached = computed(() => this._glasses() >= this.targetGlasses);

  readonly isAtMax = computed(() => this._glasses() >= this.maxGlasses);

  readonly glassSlots = computed<WaterGlassSlot[]>(() => {
    const count = this._glasses();
    return Array.from({ length: this.targetGlasses }, (_, i) => {
      const index = i + 1;
      const filled = i < count;
      return {
        index,
        filled,
        label: filled
          ? `Vaso ${index} de ${this.targetGlasses} completado`
          : `Vaso ${index} de ${this.targetGlasses} pendiente`,
      };
    });
  });

  constructor(private readonly storage: StorageService) {
    this.loadFromStorage();
  }

  addGlass(): void {
    this.syncDay();
    if (this._glasses() >= this.maxGlasses) {
      return;
    }
    this.persistGlasses(this._glasses() + 1);
  }

  removeGlass(): void {
    this.syncDay();
    if (this._glasses() <= 0) {
      return;
    }
    this.persistGlasses(this._glasses() - 1);
  }

  reset(): void {
    this._currentDate = this.getLocalDateKey();
    this.persistGlasses(0);
  }

  set(glasses: number): void {
    this.syncDay();
    const safeValue = Math.min(this.maxGlasses, Math.max(0, Math.floor(glasses)));
    this.persistGlasses(safeValue);
  }

  syncDay(referenceDate?: Date): boolean {
    const today = this.getLocalDateKey(referenceDate);
    if (today !== this._currentDate) {
      this._currentDate = today;
      this.persistGlasses(0);
      return true;
    }
    return false;
  }

  private loadFromStorage(): void {
    const today = this.getLocalDateKey();
    const saved = this.storage.read<StoredWaterProgress | number>(this.key);

    if (typeof saved === "number") {
      const clamped = Math.min(this.maxGlasses, Math.max(0, Math.floor(saved)));
      this._currentDate = today;
      this.persistGlasses(clamped);
      return;
    }

    if (saved && typeof saved === "object" && saved.date === today) {
      const clamped = Math.min(
        this.maxGlasses,
        Math.max(0, Math.floor(Number(saved.glasses) || 0)),
      );
      this._currentDate = today;
      this._glasses.set(clamped);
      return;
    }

    this._currentDate = today;
    this.persistGlasses(0);
  }

  private persistGlasses(value: number): void {
    this._glasses.set(value);
    this.storage.write<StoredWaterProgress>(this.key, {
      date: this._currentDate,
      glasses: value,
    });
  }

  private getLocalDateKey(date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
