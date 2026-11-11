import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { QuoteCardComponent } from '../../../shared/components/quote-card/quote-card.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatCardComponent, QuoteCardComponent],
  template: `
    <section class="transition-all duration-300">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Form User Info -->
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div class="flex items-center space-x-3 mb-6">
            <div class="p-3 bg-lime-500/10 text-lime-400 rounded-xl">
              <i class="fa-solid fa-id-card text-2xl"></i>
            </div>
            <h2 class="text-xl font-bold text-white">Perfil del Usuario</h2>
          </div>

          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Nombre Completo</label>
              <input
                type="text"
                formControlName="name"
                required
                placeholder="Ej. Juan Pérez"
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Edad (Años)</label>
                <input
                  type="number"
                  formControlName="age"
                  min="10"
                  max="100"
                  required
                  placeholder="25"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Género</label>
                <select
                  formControlName="gender"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  formControlName="weight"
                  required
                  placeholder="75.5"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  formControlName="height"
                  required
                  placeholder="175"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Objetivo Fitness</label>
              <select
                formControlName="goal"
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
              >
                <option value="lose">Perder Peso / Grasa</option>
                <option value="maintain">Mantenimiento Saludable</option>
                <option value="gain">Ganar Músculo / Volumen</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Nivel de Actividad Física</label>
              <select
                formControlName="activityLevel"
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-500 transition-colors"
              >
                <option [value]="1.2">Sedentario (poco o nada de ejercicio)</option>
                <option [value]="1.375">Ligero (1-3 días a la semana)</option>
                <option [value]="1.55">Moderado (3-5 días a la semana)</option>
                <option [value]="1.725">Fuerte (6-7 días a la semana)</option>
              </select>
            </div>

            <button
              type="submit"
              [disabled]="profileForm.invalid"
              class="w-full bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-lime-500/20 transition-all duration-200 mt-2 flex items-center justify-center cursor-pointer"
            >
              <i class="fa-solid fa-floppy-disk mr-2"></i> Guardar Perfil y Calcular
            </button>
          </form>
        </div>

        <!-- Right Column: Results & Dashboard Stats -->
        <div class="lg:col-span-2 space-y-6">
          @if (metrics(); as m) {
            <!-- Metrics Summary Banner -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <app-stat-card
                icon="fa-calculator"
                iconColorClass="bg-lime-500/20 text-lime-400"
                title="Índice IMC"
                [value]="m.bmi.toString()"
                [subtitle]="m.bmiStatus"
              />

              <app-stat-card
                icon="fa-fire"
                iconColorClass="bg-orange-500/20 text-orange-400"
                title="TDEE / Cal Barias"
                [value]="m.tdee + ' kcal'"
                subtitle="Mantenimiento diario"
              />

              <app-stat-card
                icon="fa-bullseye"
                iconColorClass="bg-blue-500/20 text-blue-400"
                title="Calorías Objetivo"
                [value]="m.targetCalories + ' kcal'"
                valueColorClass="text-lime-400"
                [subtitle]="m.goalLabel"
              />
            </div>

            <!-- Macro recommendations -->
            <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center">
                <i class="fa-solid fa-pie-chart text-lime-400 mr-2"></i> Distribución de Macronutrientes Sugerida
              </h3>
              <div class="grid grid-cols-3 gap-4 text-center">
                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
                  <span class="text-xs text-slate-400 uppercase font-semibold">Proteínas</span>
                  <p class="text-2xl font-extrabold text-red-400 mt-1">{{ m.macros.proteinGrams }}g</p>
                  <span class="text-xs text-slate-500">Construcción muscular</span>
                </div>
                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
                  <span class="text-xs text-slate-400 uppercase font-semibold">Carbohidratos</span>
                  <p class="text-2xl font-extrabold text-amber-400 mt-1">{{ m.macros.carbGrams }}g</p>
                  <span class="text-xs text-slate-500">Energía principal</span>
                </div>
                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
                  <span class="text-xs text-slate-400 uppercase font-semibold">Grasas</span>
                  <p class="text-2xl font-extrabold text-emerald-400 mt-1">{{ m.macros.fatGrams }}g</p>
                  <span class="text-xs text-slate-500">Salud hormonal</span>
                </div>
              </div>
            </div>
          } @else {
            <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-8 text-center text-slate-400">
              <i class="fa-solid fa-circle-info text-4xl mb-3 text-slate-500"></i>
              <p>Completa el formulario y presiona "Guardar Perfil y Calcular" para visualizar tus métricas de IMC, calorías y macronutrientes.</p>
            </div>
          }

          <!-- Motivational Quote Card -->
          <app-quote-card [quote]="dailyQuote()" />
        </div>

      </div>
    </section>
  `
})
export class ProfilePageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);

  readonly metrics = this.profileService.metrics;
  readonly dailyQuote = this.profileService.dailyQuote;

  profileForm!: FormGroup;

  ngOnInit(): void {
    const current = this.profileService.profile();
    this.profileForm = this.fb.group({
      name: [current?.name ?? '', [Validators.required]],
      age: [current?.age ?? 25, [Validators.required, Validators.min(10), Validators.max(100)]],
      gender: [current?.gender ?? 'male', [Validators.required]],
      weight: [current?.weight ?? 75.5, [Validators.required, Validators.min(20)]],
      height: [current?.height ?? 175, [Validators.required, Validators.min(50)]],
      goal: [current?.goal ?? 'maintain', [Validators.required]],
      activityLevel: [current?.activityLevel ?? 1.55, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const val = this.profileForm.value;
    this.profileService.saveProfile({
      name: val.name,
      age: Number(val.age),
      gender: val.gender,
      weight: Number(val.weight),
      height: Number(val.height),
      goal: val.goal,
      activityLevel: Number(val.activityLevel)
    });

    alert('¡Perfil y datos guardados correctamente!');
  }
}
