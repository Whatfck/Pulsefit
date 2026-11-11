import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from '../../../shared/directives/card-hover.directive';

interface NutritionPlan {
  tag: string;
  tagClass: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  points: string[];
}

@Component({
  selector: 'app-nutrition-page',
  standalone: true,
  imports: [CommonModule, CardHoverDirective],
  template: `
    <section class="transition-all duration-300 space-y-8">
      <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <h2 class="text-2xl font-bold text-white mb-2">Planes de Alimentación Recomendados</h2>
        <p class="text-slate-400 text-sm mb-6">Guías nutricionales estructuradas según tu objetivo actual.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (plan of plans; track plan.title) {
            <div
              appCardHover
              class="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-lime-500/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span [class]="'text-xs font-bold px-3 py-1 rounded-full ' + plan.tagClass">
                    {{ plan.tag }}
                  </span>
                  <i [class]="'fa-solid ' + plan.icon + ' ' + plan.iconColor"></i>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">{{ plan.title }}</h3>
                <p class="text-xs text-slate-400 mb-4">{{ plan.description }}</p>
                <ul class="text-xs text-slate-300 space-y-2 mb-4">
                  @for (point of plan.points; track point) {
                    <li class="flex items-center">
                      <i class="fa-solid fa-check text-lime-400 mr-2"></i> {{ point }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class NutritionPageComponent {
  readonly plans: NutritionPlan[] = [
    {
      tag: 'Déficit Calórico',
      tagClass: 'bg-red-500/10 text-red-400',
      icon: 'fa-fire',
      iconColor: 'text-red-400',
      title: 'Pérdida de Grasa',
      description: 'Consumo de calorías por debajo de tu TDEE. Prioridad alta en proteínas para preservar la masa muscular.',
      points: [
        'Proteína: 2.0 - 2.2g / kg',
        'Grasas: 0.8g / kg',
        'Carbohidratos moderados/bajos'
      ]
    },
    {
      tag: 'Mantenimiento',
      tagClass: 'bg-blue-500/10 text-blue-400',
      icon: 'fa-scale-balanced',
      iconColor: 'text-blue-400',
      title: 'Equilibrada / Recomposición',
      description: 'Aporte calórico equivalente al gasto diario. Ideal para mejorar rendimiento y composición corporal gradualmente.',
      points: [
        'Proteína: 1.8g / kg',
        'Grasas: 1.0g / kg',
        'Carbohidratos balanceados'
      ]
    },
    {
      tag: 'Superávit Calórico',
      tagClass: 'bg-lime-500/10 text-lime-400',
      icon: 'fa-cubes',
      iconColor: 'text-lime-400',
      title: 'Volumen & Músculo',
      description: 'Consumo de 300-500 kcal extra diarias para favorecer la hipertrofia y ganancia de fuerza muscular.',
      points: [
        'Proteína: 1.8 - 2.0g / kg',
        'Carbohidratos altos para energía',
        'Grasas saludables constantes'
      ]
    }
  ];
}
