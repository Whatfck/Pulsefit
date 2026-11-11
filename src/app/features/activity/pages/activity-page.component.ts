import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutIntensity } from '../../../core/models/workout.model';
import { IntensityBadgePipe } from '../../../shared/pipes/intensity-badge.pipe';

@Component({
  selector: 'app-activity-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IntensityBadgePipe],
  template: `
    <section class="transition-all duration-300 space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Workout Logger Form -->
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <i class="fa-solid fa-pen-to-square text-lime-400 mr-2"></i> Registrar Entrenamiento
          </h2>

          <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Fecha</label>
              <input
                type="date"
                formControlName="date"
                required
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-lime-500"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Rutina / Grupo Muscular</label>
              <input
                type="text"
                formControlName="name"
                placeholder="Ej. Pierna + Core o Pecho / Tríceps"
                required
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-lime-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Duración (min)</label>
                <input
                  type="number"
                  formControlName="duration"
                  placeholder="60"
                  required
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-lime-500"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Intensidad</label>
                <select
                  formControlName="intensity"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-lime-500"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Extrema">Extrema</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Ejercicios Realizados (Detalle)</label>
              <textarea
                formControlName="details"
                rows="3"
                placeholder="Ej. Sentadilla: 4x10 (80kg), Prensa: 3x12 (120kg)..."
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-lime-500 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="workoutForm.invalid"
              class="w-full bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              <i class="fa-solid fa-plus mr-1"></i> Guardar Entrenamiento
            </button>
          </form>
        </div>

        <!-- Logs List & Summary -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-white flex items-center">
                <i class="fa-solid fa-list-check text-lime-400 mr-2"></i> Historial de Entrenamientos
              </h3>
              <span class="bg-slate-700 text-lime-400 text-xs px-3 py-1 rounded-full font-bold">
                {{ totalWorkouts() }} Sesiones
              </span>
            </div>

            <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              @if (workouts().length === 0) {
                <p class="text-slate-400 text-center py-8">
                  No has registrado entrenamientos aún. ¡Completa el formulario para empezar!
                </p>
              } @else {
                @for (log of workouts(); track log.id) {
                  <div class="bg-slate-900 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between hover:border-lime-500/40 transition-all">
                    <div class="flex items-start justify-between">
                      <div>
                        <span class="text-xs font-semibold text-lime-400">
                          <i class="fa-regular fa-calendar mr-1"></i>{{ log.date }}
                        </span>
                        <h4 class="text-lg font-bold text-white mt-0.5">{{ log.name }}</h4>
                      </div>
                      <button
                        type="button"
                        (click)="onDelete(log.id)"
                        class="text-slate-500 hover:text-red-400 text-sm p-1 transition-colors cursor-pointer"
                        title="Eliminar sesión"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>

                    <div class="flex items-center space-x-4 text-xs text-slate-400 my-2">
                      <span><i class="fa-regular fa-clock mr-1"></i>{{ log.duration }} min</span>
                      <span>
                        <i class="fa-solid fa-gauge-high mr-1"></i>
                        Intensidad:
                        <span [class]="'px-2 py-0.5 rounded text-xs font-semibold border ' + (log.intensity | intensityBadge)">
                          {{ log.intensity }}
                        </span>
                      </span>
                    </div>

                    @if (log.details) {
                      <p class="text-xs bg-slate-800 p-2.5 rounded-lg text-slate-300 border border-slate-700/50 mt-1 whitespace-pre-line">
                        {{ log.details }}
                      </p>
                    }
                  </div>
                }
              }
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ActivityPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly workoutService = inject(WorkoutService);

  readonly workouts = this.workoutService.workouts;
  readonly totalWorkouts = this.workoutService.totalWorkouts;

  workoutForm!: FormGroup;

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.workoutForm = this.fb.group({
      date: [today, [Validators.required]],
      name: ['', [Validators.required]],
      duration: [60, [Validators.required, Validators.min(1)]],
      intensity: ['Media' as WorkoutIntensity, [Validators.required]],
      details: ['']
    });
  }

  onSubmit(): void {
    if (this.workoutForm.invalid) return;

    const val = this.workoutForm.value;
    this.workoutService.addWorkout({
      date: val.date,
      name: val.name,
      duration: Number(val.duration),
      intensity: val.intensity,
      details: val.details || undefined
    });

    this.workoutForm.patchValue({
      name: '',
      details: ''
    });
  }

  onDelete(id: number): void {
    this.workoutService.deleteWorkout(id);
  }
}
