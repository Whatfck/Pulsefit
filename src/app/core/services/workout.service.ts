import { Injectable, signal } from "@angular/core";
import { WorkoutSession } from "../models/workout.model";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class WorkoutService {
  private readonly storageKey = "pulsefit.workouts";
  private readonly _sessions = signal<WorkoutSession[]>([]);
  readonly sessions = this._sessions.asReadonly();

  constructor(private readonly storage: StorageService) {
    const stored = this.storage.read<WorkoutSession[]>(this.storageKey);
    if (stored) {
      this._sessions.set(stored);
    } else if (!this.storage.exists(this.storageKey)) {
      const example: WorkoutSession = {
        id: this.createId(),
        date: new Date().toISOString().slice(0, 10),
        name: "Entrenamiento full body",
        durationMinutes: 45,
        intensity: "media",
        details: "Calentamiento, sentadillas, press de banca y remo.",
        createdAt: Date.now(),
      };
      this._sessions.set([example]);
      this.persist();
    }
  }

  add(session: Omit<WorkoutSession, "id" | "createdAt">): boolean {
    if (!this.isValid(session)) return false;

    const newSession: WorkoutSession = {
      ...session,
      id: this.createId(),
      createdAt: Date.now(),
    };
    this._sessions.update((sessions) => [newSession, ...sessions]);
    return this.persist();
  }

  remove(id: string): void {
    this._sessions.update((sessions) => sessions.filter((session) => session.id !== id));
    this.persist();
  }

  sort(by: "date" | "createdAt"): WorkoutSession[] {
    return [...this._sessions()].sort((a, b) => {
      if (by === "date") return b.date.localeCompare(a.date) || b.createdAt - a.createdAt;
      return b.createdAt - a.createdAt;
    });
  }

  isValid(session: Pick<WorkoutSession, "date" | "name" | "durationMinutes">): boolean {
    if (!session.name.trim()) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(session.date)) return false;

    const date = new Date(`${session.date}T00:00:00`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== session.date) return false;

    return Number.isFinite(session.durationMinutes) && session.durationMinutes > 0 && session.durationMinutes <= 1440;
  }

  private persist(): boolean {
    return this.storage.write(this.storageKey, this._sessions());
  }

  private createId(): string {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
