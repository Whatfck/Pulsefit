import { Injectable, signal } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class WaterService {
  private readonly key = "pulsefit.water";
  private readonly _glasses = signal<number>(0);
  readonly glasses = this._glasses.asReadonly();

  constructor(private readonly storage: StorageService) {
    const saved = this.storage.read<number>(this.key);
    this._glasses.set(typeof saved === "number" && saved >= 0 ? saved : 0);
  }

  set(glasses: number): void {
    const safeValue = Math.max(0, Math.floor(glasses));
    this._glasses.set(safeValue);
    this.storage.write(this.key, safeValue);
  }
}
