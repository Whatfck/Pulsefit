import { Component, inject, signal } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ProfileService } from "../../../core/services/profile.service";

@Component({
  selector: "app-profile-page",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="profile-module" aria-labelledby="profile-title">
      <header class="profile-heading">
        <p>Perfil y estimaciones</p>
        <h1 id="profile-title">Tu punto de partida</h1>
      </header>

      <div class="profile-layout">
        <form
          class="profile-form"
          [formGroup]="profileForm"
          (ngSubmit)="saveProfile()"
          novalidate
        >
          <div class="field field-wide">
            <label for="name">Nombre completo</label>
            <input id="name" type="text" formControlName="name" autocomplete="name" />
            @if (isInvalid("name")) {
              <small>Ingresa tu nombre.</small>
            }
          </div>

          <div class="field">
            <label for="age">Edad</label>
            <input id="age" type="number" formControlName="age" min="10" max="100" />
            @if (isInvalid("age")) {
              <small>Edad entre 10 y 100 años.</small>
            }
          </div>

          <div class="field">
            <label for="gender">Género</label>
            <select id="gender" formControlName="gender">
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>

          <div class="field">
            <label for="weight">Peso (kg)</label>
            <input id="weight" type="number" step="0.1" formControlName="weight" min="20" max="300" />
            @if (isInvalid("weight")) {
              <small>Peso entre 20 y 300 kg.</small>
            }
          </div>

          <div class="field">
            <label for="height">Altura (cm)</label>
            <input id="height" type="number" step="0.1" formControlName="height" min="50" max="250" />
            @if (isInvalid("height")) {
              <small>Altura entre 50 y 250 cm.</small>
            }
          </div>

          <div class="field field-wide">
            <label for="goal">Objetivo</label>
            <select id="goal" formControlName="goal">
              <option value="lose">Perder peso o grasa</option>
              <option value="maintain">Mantener el peso</option>
              <option value="gain">Ganar músculo o volumen</option>
            </select>
          </div>

          <div class="field field-wide">
            <label for="activity">Nivel de actividad</label>
            <select id="activity" formControlName="activityLevel">
              <option [ngValue]="1.2">Sedentario</option>
              <option [ngValue]="1.375">Ligero: 1–3 días por semana</option>
              <option [ngValue]="1.55">Moderado: 3–5 días por semana</option>
              <option [ngValue]="1.725">Fuerte: 6–7 días por semana</option>
            </select>
          </div>

          <button class="save-button" type="submit" [disabled]="profileForm.invalid">
            Guardar perfil
          </button>

          @if (saveMessage()) {
            <p class="save-message" role="status">{{ saveMessage() }}</p>
          }
        </form>

        <div class="metrics" aria-live="polite">
          @if (metrics(); as metrics) {
            <div class="metric-grid">
              <article>
                <span>IMC</span>
                <strong>{{ metrics.bmi }}</strong>
                <p>{{ metrics.bmiStatus }}</p>
              </article>
              <article>
                <span>BMR</span>
                <strong>{{ metrics.bmr }}</strong>
                <p>kcal estimadas</p>
              </article>
              <article>
                <span>TDEE</span>
                <strong>{{ metrics.tdee }}</strong>
                <p>kcal estimadas</p>
              </article>
              <article class="target">
                <span>Objetivo</span>
                <strong>{{ metrics.targetCalories }}</strong>
                <p>{{ metrics.goalLabel }}</p>
              </article>
            </div>

            <div class="macros">
              <h2>Macronutrientes sugeridos</h2>
              <div class="macro-grid">
                <article>
                  <span>Proteína</span>
                  <strong>{{ metrics.macros.proteinGrams }} g</strong>
                </article>
                <article>
                  <span>Carbohidratos</span>
                  <strong>{{ metrics.macros.carbGrams }} g</strong>
                </article>
                <article>
                  <span>Grasas</span>
                  <strong>{{ metrics.macros.fatGrams }} g</strong>
                </article>
              </div>
            </div>
          } @else {
            <div class="empty-metrics">
              <h2>Completa tu perfil</h2>
              <p>Las estimaciones aparecerán después de guardar tus datos.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .profile-heading p {
      margin: 0 0 8px;
      color: #c9ff44;
      font-weight: 800;
    }

    h1 {
      max-width: 12ch;
      margin: 0 0 32px;
      font-size: clamp(2.75rem, 8vw, 5.5rem);
      line-height: .95;
      letter-spacing: -.045em;
    }

    .profile-layout {
      display: grid;
      grid-template-columns: minmax(280px, .82fr) minmax(380px, 1.18fr);
      gap: 18px;
      align-items: start;
    }

    .profile-form,
    .metrics {
      background: #10212b;
      border-radius: 12px;
    }

    .profile-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      padding: 20px;
    }

    .field {
      display: grid;
      gap: 7px;
    }

    .field-wide,
    .save-button,
    .save-message {
      grid-column: 1 / -1;
    }

    label {
      color: #dce7ec;
      font-size: .9rem;
      font-weight: 700;
    }

    input,
    select {
      width: 100%;
      min-height: 46px;
      border: 1px solid #314b59;
      border-radius: 8px;
      background: #081017;
      color: #f4fbff;
      padding: 10px 12px;
    }

    small {
      color: #ff9f92;
    }

    .save-button {
      min-height: 48px;
      border: 0;
      border-radius: 8px;
      background: #c9ff44;
      color: #081017;
      font-weight: 900;
    }

    .save-button:disabled {
      cursor: not-allowed;
      opacity: .45;
    }

    .save-message {
      margin: 0;
      color: #c9ff44;
      font-size: .9rem;
    }

    .metrics {
      display: grid;
      gap: 18px;
      padding: 20px;
    }

    .metric-grid,
    .macro-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .metric-grid article,
    .macro-grid article,
    .empty-metrics {
      padding: 16px;
      border-radius: 8px;
      background: #081017;
    }

    .metric-grid article {
      min-height: 132px;
    }

    .metric-grid .target {
      grid-column: 1 / -1;
      background: #c9ff44;
      color: #081017;
    }

    .metric-grid span,
    .macro-grid span {
      display: block;
      margin-bottom: 8px;
      color: #9fb0ba;
      font-size: .82rem;
      font-weight: 800;
    }

    .metric-grid strong,
    .macro-grid strong {
      display: block;
      font-size: 1.75rem;
    }

    .metric-grid p,
    .macros h2,
    .empty-metrics p {
      margin: 8px 0 0;
      color: #b0bec6;
    }

    .target p,
    .target span {
      color: #26380a !important;
    }

    .macros h2 {
      margin: 0 0 10px;
      color: #f4fbff;
      font-size: 1.1rem;
    }

    .empty-metrics {
      min-height: 260px;
      display: grid;
      place-content: center;
      text-align: center;
    }

    @media (max-width: 820px) {
      .profile-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 460px) {
      .profile-form,
      .metric-grid,
      .macro-grid {
        grid-template-columns: 1fr;
      }

      .field-wide,
      .save-button,
      .save-message,
      .metric-grid .target {
        grid-column: auto;
      }
    }
  `,
})
export class ProfilePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);

  readonly profile = this.profileService.profile;
  readonly metrics = this.profileService.metrics;
  readonly saveMessage = signal("");

  readonly profileForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.maxLength(80)]],
    age: [25, [Validators.required, Validators.min(10), Validators.max(100)]],
    gender: ["male" as "male" | "female", [Validators.required]],
    weight: [75.5, [Validators.required, Validators.min(20), Validators.max(300)]],
    height: [175, [Validators.required, Validators.min(50), Validators.max(250)]],
    goal: ["maintain" as "lose" | "maintain" | "gain", [Validators.required]],
    activityLevel: [1.55, [Validators.required]],
  });

  constructor() {
    const savedProfile = this.profile();
    if (savedProfile) {
      this.profileForm.reset(savedProfile);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.profileForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const profile = this.profileForm.getRawValue();
    const saved = this.profileService.saveProfile(profile);
    this.saveMessage.set(
      saved
        ? "Perfil guardado en este dispositivo."
        : "No fue posible guardar el perfil en este dispositivo.",
    );
  }
}
