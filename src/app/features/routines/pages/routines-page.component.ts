import { Component } from "@angular/core";
import { Routine, RoutineCategory } from "../../../core/models/routine.model";
import { RoutinesService } from "../../../core/services/routines.service";

@Component({
  selector: "app-routines-page",
  standalone: true,
  template: `
    <section class="routines-page">
      <p class="module-name">Rutinas recomendadas</p>
      <h1>Encuentra tu siguiente entrenamiento</h1>

      <nav class="filters" aria-label="Filtrar rutinas">
        <button type="button" [class.active]="routines.selectedCategory() === 'todos'" (click)="select('todos')">Todas</button>
        <button type="button" [class.active]="routines.selectedCategory() === 'principiante'" (click)="select('principiante')">Iniciación</button>
        <button type="button" [class.active]="routines.selectedCategory() === 'hipertrofia'" (click)="select('hipertrofia')">Hipertrofia</button>
        <button type="button" [class.active]="routines.selectedCategory() === 'fuerza'" (click)="select('fuerza')">Fuerza</button>
      </nav>

      @if (visibleRoutines().length) {
        <div class="routine-grid">
          @for (routine of visibleRoutines(); track routine.id) {
            <article class="routine-card">
              <header><span>{{ routine.category }}</span><h2>{{ routine.name }}</h2><p>{{ routine.description }}</p></header>
              <div class="exercise-list">
                @for (exercise of routine.exercises; track exercise.name) {
                  <div class="exercise"><strong>{{ exercise.name }}</strong><span>{{ exercise.sets }} series</span><span>{{ exercise.reps }} reps</span><span>{{ exercise.restSeconds }} s descanso</span></div>
                }
              </div>
              <button type="button" class="select-routine" (click)="selected = routine">Ver rutina</button>
            </article>
          }
        </div>
      } @else {
        <p class="empty">No existen rutinas que coincidan con esta categoría.</p>
      }

      @if (selected) {
        <aside class="selected" aria-live="polite">
          <button type="button" class="close" (click)="selected = null" aria-label="Cerrar rutina">×</button>
          <p class="module-name">Rutina seleccionada</p><h2>{{ selected.name }}</h2>
          @for (exercise of selected.exercises; track exercise.name) {
            <p><strong>{{ exercise.name }}</strong> — {{ exercise.sets }} series × {{ exercise.reps }} · descanso {{ exercise.restSeconds }} s</p>
          }
        </aside>
      }
    </section>
  `,
  styles: `
    .routines-page{max-width:980px}.module-name{margin:0 0 12px;color:#c9ff44;font-weight:800}.routines-page h1{max-width:15ch;margin:0 0 24px;font-size:clamp(2.5rem,8vw,5.5rem);line-height:.95}.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}.filters button{border:1px solid #344954;border-radius:999px;padding:9px 14px;color:#dbe9ef;background:transparent}.filters button.active{border-color:#c9ff44;background:#c9ff44;color:#081017;font-weight:800}.routine-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.routine-card{display:flex;flex-direction:column;gap:16px;padding:18px;border:1px solid #263641;border-radius:18px;background:#101c24}.routine-card header>span{text-transform:capitalize;color:#c9ff44;font-size:.78rem}.routine-card h2{margin:8px 0}.routine-card p{margin:0;color:#b2c1c9}.exercise-list{display:grid;gap:7px}.exercise{display:grid;grid-template-columns:1fr auto;gap:3px 10px;padding:9px;border-radius:9px;background:#0a141a}.exercise strong{grid-row:1/3}.exercise span{color:#b2c1c9;font-size:.78rem}.select-routine{margin-top:auto;border:1px solid #c9ff44;border-radius:999px;padding:9px;background:transparent;color:#c9ff44;font-weight:800}.empty{padding:32px;text-align:center;color:#b2c1c9;border:1px dashed #263641;border-radius:14px}.selected{position:fixed;right:24px;bottom:24px;width:min(420px,calc(100vw - 48px));padding:20px;border:1px solid #c9ff44;border-radius:16px;background:#101c24;box-shadow:0 20px 50px #0009}.selected h2{margin-top:0}.close{float:right;border:0;background:transparent;color:#fff;font-size:1.5rem}@media(max-width:820px){.routine-grid{grid-template-columns:1fr}}
  `,
})
export class RoutinesPageComponent {
  selected: Routine | null = null;

  constructor(readonly routines: RoutinesService) {}

  visibleRoutines(): Routine[] {
    return this.routines.filter(this.routines.selectedCategory());
  }

  select(category: "todos" | RoutineCategory): void {
    this.routines.selectCategory(category);
    this.selected = null;
  }
}
