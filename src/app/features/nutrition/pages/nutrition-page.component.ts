import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NutritionGoal } from "../../../core/models/nutrition.model";
import { NutritionService } from "../../../core/services/nutrition.service";

@Component({
  selector: "app-nutrition-page",
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="nutrition-page" aria-labelledby="nutrition-title">
      <header class="page-header">
        <div>
          <p class="module-name">Nutrición</p>
          <h1 id="nutrition-title">Alimenta tu progreso</h1>
        </div>

        <nav class="goal-selector" aria-label="Seleccionar objetivo nutricional">
          <button
            type="button"
            [class.active]="nutrition.selectedGoal() === 'deficit'"
            [attr.aria-pressed]="nutrition.selectedGoal() === 'deficit'"
            (click)="selectGoal('deficit')"
          >
            Déficit
          </button>
          <button
            type="button"
            [class.active]="nutrition.selectedGoal() === 'maintenance'"
            [attr.aria-pressed]="nutrition.selectedGoal() === 'maintenance'"
            (click)="selectGoal('maintenance')"
          >
            Mantenimiento
          </button>
          <button
            type="button"
            [class.active]="nutrition.selectedGoal() === 'volume'"
            [attr.aria-pressed]="nutrition.selectedGoal() === 'volume'"
            (click)="selectGoal('volume')"
          >
            Volumen
          </button>
        </nav>
      </header>

      @if (nutrition.summary(); as summary) {
        <div class="summary-grid" aria-live="polite">
          <article class="card metric-card">
            <span class="metric-label">Objetivo calórico diario</span>
            <strong class="metric-value accent">{{ summary.targetCalories }} kcal</strong>
            <p class="metric-note">{{ summary.goalLabel }}</p>
          </article>

          <article class="card metric-card">
            <span class="metric-label">Gasto estimado base</span>
            <strong class="metric-value">{{ summary.estimatedTdee }} kcal</strong>
            <p class="metric-note">
              Ajuste aplicado:
              {{ summary.calorieAdjustment >= 0 ? "+" + summary.calorieAdjustment : summary.calorieAdjustment }}
              kcal
            </p>
          </article>

          <article class="card metric-card">
            <span class="metric-label">Hidratación y comidas</span>
            <strong class="metric-value">{{ summary.hydrationLiters.toFixed(1) }} L</strong>
            <p class="metric-note">{{ summary.mealsPerDay }}</p>
          </article>
        </div>

        <article class="card macros-card" aria-labelledby="macros-title">
          <h2 id="macros-title">Distribución estimada de macronutrientes</h2>
          <p class="section-subtitle">{{ summary.goalDescription }}</p>

          <div class="macro-list">
            <div class="macro-item">
              <div class="macro-row">
                <strong>Proteína</strong>
                <span>{{ summary.macros.proteinGrams }} g ({{ summary.macros.proteinPercent }}%)</span>
              </div>
              <div
                class="progress-track"
                role="progressbar"
                [attr.aria-valuenow]="summary.macros.proteinPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                [attr.aria-label]="'Proteína ' + summary.macros.proteinPercent + ' por ciento'"
              >
                <div
                  class="progress-fill protein"
                  [style.width.%]="summary.macros.proteinPercent"
                ></div>
              </div>
            </div>

            <div class="macro-item">
              <div class="macro-row">
                <strong>Grasas</strong>
                <span>{{ summary.macros.fatGrams }} g ({{ summary.macros.fatPercent }}%)</span>
              </div>
              <div
                class="progress-track"
                role="progressbar"
                [attr.aria-valuenow]="summary.macros.fatPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                [attr.aria-label]="'Grasas ' + summary.macros.fatPercent + ' por ciento'"
              >
                <div
                  class="progress-fill fat"
                  [style.width.%]="summary.macros.fatPercent"
                ></div>
              </div>
            </div>

            <div class="macro-item">
              <div class="macro-row">
                <strong>Carbohidratos</strong>
                <span>{{ summary.macros.carbGrams }} g ({{ summary.macros.carbPercent }}%)</span>
              </div>
              <div
                class="progress-track"
                role="progressbar"
                [attr.aria-valuenow]="summary.macros.carbPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                [attr.aria-label]="'Carbohidratos ' + summary.macros.carbPercent + ' por ciento'"
              >
                <div
                  class="progress-fill carbs"
                  [style.width.%]="summary.macros.carbPercent"
                ></div>
              </div>
            </div>
          </div>
        </article>

        <div class="guides-grid">
          <article class="card info-card" aria-labelledby="recommendations-title">
            <h2 id="recommendations-title">Recomendaciones generales</h2>
            <ul class="guide-list">
              @for (item of summary.recommendations; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
          </article>

          <article class="card info-card" aria-labelledby="hydration-meals-title">
            <h2 id="hydration-meals-title">Guías básicas de hidratación y comidas</h2>
            <ul class="guide-list">
              @for (tip of summary.hydrationTips; track $index) {
                <li>{{ tip }}</li>
              }
              @for (mealTip of summary.mealTips; track $index) {
                <li>{{ mealTip }}</li>
              }
            </ul>
          </article>
        </div>

        <p class="disclaimer">
          Nota: Estos valores son estimaciones generales orientativas basadas en los datos de tu
          perfil y no constituyen indicaciones clínicas ni sustituyen asesoramiento profesional.
        </p>
      } @else {
        <article class="empty-state" aria-live="polite">
          <h2>Aún no hay un perfil calculado</h2>
          <p>
            Completa tu peso, estatura y edad en el módulo de perfil para calcular una estimación
            orientativa de calorías, macronutrientes y guías de hidratación.
          </p>
          <a class="profile-link" routerLink="/profile">Ir a mi perfil</a>
        </article>
      }
    </section>
  `,
  styleUrl: "./nutrition-page.component.css",
})
export class NutritionPageComponent {
  readonly nutrition = inject(NutritionService);

  selectGoal(goal: NutritionGoal): void {
    this.nutrition.setGoal(goal);
  }
}
