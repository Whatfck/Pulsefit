import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WorkoutIntensity, WorkoutSession } from "../../../core/models/workout.model";
import { WorkoutService } from "../../../core/services/workout.service";

@Component({
  selector: "app-activity-page",
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="activity-page">
      <header class="page-heading">
        <div><p class="module-name">Diario de entrenamiento</p><h1>Registra cada sesión</h1></div>
        <div class="total"><strong>{{ workouts.sessions().length }}</strong><span>sesiones</span></div>
      </header>

      <form class="workout-form" (ngSubmit)="addWorkout()">
        <label>Fecha<input type="date" name="date" [(ngModel)]="date" /></label>
        <label>Nombre<input name="name" [(ngModel)]="name" placeholder="Ej. Pierna y core" /></label>
        <label>Duración (min)<input type="number" name="duration" [(ngModel)]="duration" min="1" max="1440" /></label>
        <label>Intensidad<select name="intensity" [(ngModel)]="intensity">
          <option value="baja">Baja</option><option value="media">Media</option><option value="alta">Alta</option>
        </select></label>
        <label class="details">Detalles<textarea name="details" [(ngModel)]="details" rows="3" placeholder="Notas opcionales"></textarea></label>
        <div class="form-actions">
          @if (error) { <p class="error" role="alert">{{ error }}</p> }
          <button type="submit">Guardar sesión</button>
        </div>
      </form>

      <div class="toolbar">
        <h2>Mis entrenamientos</h2>
        <label>Ordenar<select [value]="sortBy" (change)="changeSort($event)">
          <option value="date">Por fecha</option><option value="createdAt">Por creación</option>
        </select></label>
      </div>

      @if (workouts.sort(sortBy).length) {
        <div class="session-list">
          @for (session of workouts.sort(sortBy); track session.id) {
            <article class="session-card">
              <div class="session-main"><span class="intensity" [attr.data-intensity]="session.intensity">{{ session.intensity }}</span><div><h3>{{ session.name }}</h3><p>{{ formatDate(session.date) }} · {{ session.durationMinutes }} min</p></div></div>
              @if (session.details) { <p class="details-text">{{ session.details }}</p> }
              <button class="delete" type="button" (click)="remove(session.id)" [attr.aria-label]="'Eliminar ' + session.name">Eliminar</button>
            </article>
          }
        </div>
      } @else { <p class="empty">Aún no hay entrenamientos registrados.</p> }
    </section>
  `,
  styles: `
    .activity-page{max-width:980px}.page-heading,.toolbar,.session-card,.session-main{display:flex;align-items:center}.page-heading{justify-content:space-between}.module-name{margin:0 0 10px;color:#c9ff44;font-weight:800}.page-heading h1{margin:0 0 24px;font-size:clamp(2.2rem,7vw,5rem);line-height:.95}.total{display:grid;text-align:center;min-width:100px;padding:16px;border:1px solid #263641;border-radius:18px}.total strong{color:#c9ff44;font-size:2rem}.workout-form{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;padding:20px;background:#101c24;border:1px solid #263641;border-radius:18px}.workout-form label,.toolbar label{display:grid;gap:7px;color:#dbe9ef;font-size:.85rem}.details{grid-column:1/-1}input,select,textarea{width:100%;border:1px solid #344954;border-radius:10px;padding:11px;color:#eef7ff;background:#0a141a}textarea{resize:vertical}.form-actions{grid-column:1/-1;display:flex;justify-content:flex-end;align-items:center;gap:16px}.error{margin:0 auto 0 0;color:#ff8d8d}.form-actions button,.delete{border:0;border-radius:999px;background:#c9ff44;color:#081017;font-weight:800;padding:11px 18px}.toolbar{justify-content:space-between;margin:28px 0 12px}.toolbar label{grid-template-columns:auto 150px;align-items:center}.session-list{display:grid;gap:10px}.session-card{justify-content:space-between;gap:16px;padding:16px;border:1px solid #263641;border-radius:14px;background:#0d181f}.session-main{gap:12px}.session-card h3{margin:0 0 4px}.session-card p{margin:0;color:#b2c1c9}.intensity{width:62px;text-align:center;border-radius:999px;padding:6px;text-transform:capitalize;background:#2b3b44}.intensity[data-intensity="alta"]{background:#ff7b72;color:#081017}.intensity[data-intensity="media"]{background:#c9ff44;color:#081017}.details-text{flex:1}.delete{background:transparent;color:#ff9a94;border:1px solid #65413f}.empty{padding:30px;text-align:center;color:#b2c1c9;border:1px dashed #263641;border-radius:14px}@media(max-width:760px){.workout-form{grid-template-columns:1fr 1fr}.session-card{align-items:flex-start}}@media(max-width:520px){.workout-form{grid-template-columns:1fr}.toolbar{align-items:flex-end}.session-card{flex-wrap:wrap}.details-text{flex-basis:100%;order:3}}
  `,
})
export class ActivityPageComponent {
  date = new Date().toISOString().slice(0, 10);
  name = "";
  duration: number | null = null;
  intensity: WorkoutIntensity = "media";
  details = "";
  sortBy: "date" | "createdAt" = "date";
  error = "";

  constructor(readonly workouts: WorkoutService) {}

  addWorkout(): void {
    if (!this.duration) {
      this.error = "Completa la fecha, el nombre y una duración válida.";
      return;
    }
    const session: Omit<WorkoutSession, "id" | "createdAt"> = {
      date: this.date,
      name: this.name.trim(),
      durationMinutes: Number(this.duration),
      intensity: this.intensity,
      details: this.details.trim() || undefined,
    };
    if (!this.workouts.add(session)) {
      this.error = "Revisa la fecha y la duración. La duración debe estar entre 1 y 1440 minutos.";
      return;
    }
    this.error = "";
    this.name = "";
    this.duration = null;
    this.details = "";
  }

  remove(id: string): void { this.workouts.remove(id); }

  changeSort(event: Event): void {
    this.sortBy = (event.target as HTMLSelectElement).value as "date" | "createdAt";
  }

  formatDate(date: string): string {
    return new Date(`${date}T00:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
  }
}
