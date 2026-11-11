import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../../core/services/timer.service';
import { WaterService } from '../../../core/services/water.service';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  template: `
    <section class="transition-all duration-300 space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Rest Timer Card -->
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl text-center flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-center space-x-2 text-lime-400 mb-4">
              <i class="fa-solid fa-stopwatch text-2xl"></i>
              <h2 class="text-xl font-bold text-white">Temporizador de Descanso</h2>
            </div>
            <p class="text-slate-400 text-xs mb-6">Controla tus tiempos de descanso entre series para maximizar el rendimiento.</p>

            <!-- Timer Display -->
            <div class="bg-slate-900 border border-slate-700 rounded-2xl py-8 my-4 shadow-inner">
              <span class="text-6xl font-black text-white tracking-widest font-mono">
                {{ timerService.seconds() | timeFormat }}
              </span>
            </div>

            <!-- Quick presets -->
            <div class="flex justify-center gap-2 mb-6">
              <button
                type="button"
                (click)="setTimer(30)"
                class="bg-slate-700 hover:bg-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
              >
                30s
              </button>
              <button
                type="button"
                (click)="setTimer(60)"
                class="bg-slate-700 hover:bg-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
              >
                60s
              </button>
              <button
                type="button"
                (click)="setTimer(90)"
                class="bg-slate-700 hover:bg-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
              >
                90s
              </button>
              <button
                type="button"
                (click)="setTimer(120)"
                class="bg-slate-700 hover:bg-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
              >
                2 min
              </button>
            </div>
          </div>

          <!-- Timer Controls -->
          <div class="flex justify-center space-x-4">
            <button
              type="button"
              (click)="startTimer()"
              [disabled]="timerService.isRunning()"
              class="bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <i class="fa-solid fa-play"></i>
              <span>Iniciar</span>
            </button>
            <button
              type="button"
              (click)="pauseTimer()"
              [disabled]="!timerService.isRunning()"
              class="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <i class="fa-solid fa-pause"></i>
              <span>Pausa</span>
            </button>
            <button
              type="button"
              (click)="resetTimer()"
              class="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer"
            >
              <i class="fa-solid fa-rotate-left"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>

        <!-- Water Intake Counter -->
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-center space-x-2 text-blue-400 mb-4">
              <i class="fa-solid fa-glass-water text-2xl"></i>
              <h2 class="text-xl font-bold text-white">Registro de Hidratación</h2>
            </div>
            <p class="text-slate-400 text-xs text-center mb-6">Meta recomendada: 8 vasos de agua al día (approx. 2 Litros).</p>

            <div class="text-center my-4">
              <span class="text-6xl font-black text-blue-400">{{ waterService.glasses() }}</span>
              <span class="text-slate-400 font-bold"> / {{ waterService.targetGlasses }} vasos</span>
            </div>

            <!-- Water Visual Icons Grid -->
            <div class="flex flex-wrap justify-center gap-3 my-6">
              @for (glass of waterService.glassIcons(); track glass.index) {
                <i
                  [class]="'fa-solid fa-glass-water text-3xl transition-colors duration-200 ' + (glass.filled ? 'text-blue-400 scale-110' : 'text-slate-700')"
                ></i>
              }
            </div>
          </div>

          <div class="flex justify-center space-x-4">
            <button
              type="button"
              (click)="addWater()"
              class="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <i class="fa-solid fa-plus"></i>
              <span>Agregar Vaso</span>
            </button>
            <button
              type="button"
              (click)="resetWater()"
              class="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              title="Reiniciar contador de agua"
            >
              <i class="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ToolsPageComponent {
  readonly timerService = inject(TimerService);
  readonly waterService = inject(WaterService);

  setTimer(seconds: number): void {
    this.timerService.setTimer(seconds);
  }

  startTimer(): void {
    this.timerService.start();
  }

  pauseTimer(): void {
    this.timerService.pause();
  }

  resetTimer(): void {
    this.timerService.reset();
  }

  addWater(): void {
    this.waterService.addGlass();
  }

  resetWater(): void {
    this.waterService.reset();
  }
}
