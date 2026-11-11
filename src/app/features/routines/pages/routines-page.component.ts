import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesService } from '../../../core/services/routines.service';
import { CardHoverDirective } from '../../../shared/directives/card-hover.directive';

@Component({
  selector: 'app-routines-page',
  standalone: true,
  imports: [CommonModule, CardHoverDirective],
  template: `
    <section class="transition-all duration-300 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 shadow-lg">
        <div>
          <h2 class="text-2xl font-bold text-white">Catálogo de Rutinas</h2>
          <p class="text-slate-400 text-sm">Selecciona una rutina ajustada a tus objetivos específicos.</p>
        </div>
        
        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            (click)="setFilter('all')"
            [class]="selectedCategory() === 'all'
              ? 'bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md'
              : 'bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all'"
          >
            Todos
          </button>
          <button
            type="button"
            (click)="setFilter('principiante')"
            [class]="selectedCategory() === 'principiante'
              ? 'bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md'
              : 'bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all'"
          >
            Principiante
          </button>
          <button
            type="button"
            (click)="setFilter('hipertrofia')"
            [class]="selectedCategory() === 'hipertrofia'
              ? 'bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md'
              : 'bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all'"
          >
            Hipertrofia
          </button>
          <button
            type="button"
            (click)="setFilter('fuerza')"
            [class]="selectedCategory() === 'fuerza'
              ? 'bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md'
              : 'bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all'"
          >
            Fuerza
          </button>
        </div>
      </div>

      <!-- Routine Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (routine of filteredRoutines(); track routine.id) {
          <div
            appCardHover
            class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-lime-500/40 transition-all"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span [class]="routine.tagColor + ' text-xs font-bold px-3 py-1 rounded-full'">
                  {{ routine.tag }}
                </span>
                <i class="fa-solid fa-dumbbell text-slate-500"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">{{ routine.title }}</h3>
              <p class="text-xs text-slate-400 mb-4">{{ routine.description }}</p>
              
              <div class="space-y-3">
                <span class="text-xs uppercase font-bold text-slate-500 tracking-wider">Ejercicios:</span>
                @for (ex of routine.exercises; track ex.name) {
                  <div class="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                    <p class="text-sm font-semibold text-slate-200">{{ ex.name }}</p>
                    <div class="flex justify-between text-xs text-slate-400 mt-1">
                      <span><i class="fa-solid fa-repeat mr-1 text-lime-400"></i>{{ ex.sets }}</span>
                      <span><i class="fa-solid fa-hourglass-half mr-1 text-orange-400"></i>{{ ex.rest }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class RoutinesPageComponent {
  private readonly routinesService = inject(RoutinesService);

  readonly filteredRoutines = this.routinesService.filteredRoutines;
  readonly selectedCategory = this.routinesService.selectedCategory;

  setFilter(category: string): void {
    this.routinesService.setFilter(category);
  }
}
