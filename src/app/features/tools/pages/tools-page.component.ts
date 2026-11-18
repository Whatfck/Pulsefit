import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { TimerPreset, TimerService } from "../../../core/services/timer.service";
import { WaterService } from "../../../core/services/water.service";

@Component({
  selector: "app-tools-page",
  standalone: true,
  template: `
    <section class="tools-page" aria-labelledby="tools-title">
      <header class="page-header">
        <p class="module-name">Herramientas</p>
        <h1 id="tools-title">Controla descanso e hidratación</h1>
      </header>

      <div class="tools-grid">
        <article class="tool-card" aria-labelledby="timer-heading">
          <div>
            <h2 id="timer-heading">Temporizador de descanso</h2>
            <p class="tool-subtitle">
              Elige una duración entre series y controla tu tiempo de recuperación.
            </p>

            <div class="timer-display">
              <span class="timer-value" data-testid="timer-display">
                {{ timer.formattedTime() }}
              </span>
              <p class="sr-status" role="status" aria-live="polite">
                {{ timer.statusMessage() }}
              </p>
            </div>

            <div
              class="progress-track"
              role="progressbar"
              [attr.aria-valuenow]="timer.progressPercent()"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Progreso del temporizador de descanso"
            >
              <div
                class="progress-fill timer"
                [style.width.%]="timer.progressPercent()"
              ></div>
            </div>

            <div class="preset-group" role="group" aria-label="Duraciones predefinidas">
              @for (preset of timer.presets; track preset) {
                <button
                  type="button"
                  [class.active]="timer.initialSeconds() === preset"
                  [attr.aria-pressed]="timer.initialSeconds() === preset"
                  (click)="selectPreset(preset)"
                >
                  {{ preset }} s
                </button>
              }
            </div>

            @if (timer.isCompleted()) {
              <div class="timer-alert" role="status" aria-live="assertive">
                <span>Descanso terminado. Listo para la siguiente serie.</span>
                <button type="button" (click)="timer.dismissCompletion()">Cerrar</button>
              </div>
            }
          </div>

          <div class="controls">
            <button
              type="button"
              class="btn-primary"
              [disabled]="timer.isRunning() || timer.seconds() <= 0"
              (click)="timer.start()"
            >
              Iniciar
            </button>
            <button
              type="button"
              class="btn-secondary"
              [disabled]="!timer.isRunning()"
              (click)="timer.pause()"
            >
              Pausar
            </button>
            <button type="button" class="btn-secondary" (click)="timer.reset()">
              Reiniciar
            </button>
          </div>
        </article>

        <article class="tool-card" aria-labelledby="water-heading">
          <div>
            <h2 id="water-heading">Registro de hidratación</h2>
            <p class="tool-subtitle">
              Meta diaria recomendada: {{ water.targetGlasses }} vasos (máximo
              {{ water.maxGlasses }} vasos registrados).
            </p>

            <div class="water-summary" aria-live="polite">
              <div class="water-count">
                <strong data-testid="water-count">{{ water.glasses() }}</strong>
                <span> / {{ water.targetGlasses }} vasos</span>
              </div>
              <span class="water-percent" data-testid="water-percent">
                {{ water.progressPercent() }}% de la meta
              </span>
            </div>

            <div
              class="progress-track"
              role="progressbar"
              [attr.aria-valuenow]="water.progressPercent()"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Progreso diario de hidratación"
            >
              <div
                class="progress-fill water"
                [style.width.%]="water.progressPercent()"
              ></div>
            </div>

            <div class="glass-grid" role="list" aria-label="Vasos objetivo del día">
              @for (slot of water.glassSlots(); track slot.index) {
                <div
                  role="listitem"
                  class="glass-slot"
                  [class.filled]="slot.filled"
                  [attr.aria-label]="slot.label"
                >
                  Vaso {{ slot.index }}
                </div>
              }
            </div>

            @if (water.glasses() > water.targetGlasses) {
              <p class="water-note" role="status">
                Superaste la meta base con {{ water.glasses() }} de {{ water.maxGlasses }} vasos
                permitidos.
              </p>
            } @else if (water.goalReached()) {
              <p class="water-note" role="status">
                Meta diaria de {{ water.targetGlasses }} vasos alcanzada.
              </p>
            }
          </div>

          <div class="controls">
            <button
              type="button"
              class="btn-water"
              [disabled]="water.isAtMax()"
              (click)="water.addGlass()"
            >
              Agregar vaso
            </button>
            <button
              type="button"
              class="btn-secondary"
              [disabled]="water.glasses() <= 0"
              (click)="water.removeGlass()"
            >
              Quitar vaso
            </button>
            <button
              type="button"
              class="btn-secondary"
              [disabled]="water.glasses() <= 0"
              (click)="water.reset()"
            >
              Reiniciar
            </button>
          </div>
        </article>
      </div>
    </section>
  `,
  styleUrl: "./tools-page.component.css",
})
export class ToolsPageComponent implements OnInit, OnDestroy {
  readonly timer = inject(TimerService);
  readonly water = inject(WaterService);

  ngOnInit(): void {
    this.water.syncDay();
  }

  ngOnDestroy(): void {
    this.timer.pause();
  }

  selectPreset(seconds: TimerPreset): void {
    this.timer.setPreset(seconds);
  }
}
