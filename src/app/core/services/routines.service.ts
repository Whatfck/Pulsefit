import { Injectable, signal } from "@angular/core";
import { Routine, RoutineCategory } from "../models/routine.model";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class RoutinesService {
  readonly routines: Routine[] = [
    {
      id: "inicio-full-body",
      name: "Full Body de iniciación",
      category: "principiante",
      description: "Tres sesiones completas para construir una base sólida.",
      exercises: [
        { name: "Sentadilla goblet", sets: 3, reps: "10-12", restSeconds: 75 },
        { name: "Press de banca", sets: 3, reps: "8-12", restSeconds: 75 },
        { name: "Remo con mancuerna", sets: 3, reps: "10 por lado", restSeconds: 60 },
        { name: "Plancha", sets: 3, reps: "30-45 s", restSeconds: 45 },
      ],
    },
    {
      id: "hipertrofia-push-pull",
      name: "Hipertrofia Push-Pull",
      category: "hipertrofia",
      description: "Volumen controlado para estimular grupos musculares.",
      exercises: [
        { name: "Press militar", sets: 4, reps: "8-10", restSeconds: 90 },
        { name: "Jalón al pecho", sets: 4, reps: "10-12", restSeconds: 75 },
        { name: "Curl de bíceps", sets: 3, reps: "12-15", restSeconds: 60 },
        { name: "Press francés", sets: 3, reps: "10-12", restSeconds: 60 },
      ],
    },
    {
      id: "fuerza-5x5",
      name: "Fuerza 5x5",
      category: "fuerza",
      description: "Programa clásico con cargas progresivas en los levantamientos principales.",
      exercises: [
        { name: "Sentadilla", sets: 5, reps: "5", restSeconds: 180 },
        { name: "Press de banca", sets: 5, reps: "5", restSeconds: 180 },
        { name: "Peso muerto", sets: 1, reps: "5", restSeconds: 180 },
      ],
    },
  ];

  private readonly categoryKey = "pulsefit.selectedRoutineCategory";
  private readonly _selectedCategory = signal<"todos" | RoutineCategory>("todos");
  readonly selectedCategory = this._selectedCategory.asReadonly();

  constructor(private readonly storage: StorageService) {
    const saved = this.storage.read<"todos" | RoutineCategory>(this.categoryKey);
    if (saved === "todos" || saved === "principiante" || saved === "hipertrofia" || saved === "fuerza") {
      this._selectedCategory.set(saved);
    }
  }

  selectCategory(category: "todos" | RoutineCategory): void {
    this._selectedCategory.set(category);
    this.storage.write(this.categoryKey, category);
  }

  filter(category: "todos" | RoutineCategory = this._selectedCategory()) {
    return category === "todos" ? this.routines : this.routines.filter((routine) => routine.category === category);
  }
}
