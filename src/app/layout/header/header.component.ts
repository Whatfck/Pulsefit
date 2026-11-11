import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/profile" class="flex items-center space-x-3 cursor-pointer no-underline text-inherit">
            <div class="bg-lime-500 text-slate-950 p-2 rounded-xl font-extrabold flex items-center justify-center shadow-md shadow-lime-500/20">
              <i class="fa-solid font-black fa-bolt text-xl"></i>
            </div>
            <span class="text-2xl font-extrabold tracking-wider text-white">
              PULSE<span class="text-lime-400">FIT</span>
            </span>
          </a>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex space-x-1 lg:space-x-2">
            <a
              routerLink="/profile"
              routerLinkActive="text-lime-400 bg-slate-800"
              class="nav-btn px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <i class="fa-solid fa-user"></i>
              <span>Perfil & IMC</span>
            </a>
            <a
              routerLink="/activity"
              routerLinkActive="text-lime-400 bg-slate-800"
              class="nav-btn px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <i class="fa-solid fa-calendar-check"></i>
              <span>Diario & Actividad</span>
            </a>
            <a
              routerLink="/routines"
              routerLinkActive="text-lime-400 bg-slate-800"
              class="nav-btn px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <i class="fa-solid fa-dumbbell"></i>
              <span>Rutinas</span>
            </a>
            <a
              routerLink="/nutrition"
              routerLinkActive="text-lime-400 bg-slate-800"
              class="nav-btn px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <i class="fa-solid fa-utensils"></i>
              <span>Nutrición</span>
            </a>
            <a
              routerLink="/tools"
              routerLinkActive="text-lime-400 bg-slate-800"
              class="nav-btn px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <i class="fa-solid fa-stopwatch"></i>
              <span>Herramientas</span>
            </a>
          </nav>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center">
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800 focus:outline-none transition-colors"
              aria-label="Abrir menú"
            >
              <i [class]="isMobileMenuOpen() ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl'"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-fade-in">
          <a
            routerLink="/profile"
            (click)="closeMobileMenu()"
            routerLinkActive="text-lime-400 bg-slate-800"
            class="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-lime-400 flex items-center space-x-3 transition-colors"
          >
            <i class="fa-solid fa-user w-6"></i>
            <span>Perfil y Métricas</span>
          </a>
          <a
            routerLink="/activity"
            (click)="closeMobileMenu()"
            routerLinkActive="text-lime-400 bg-slate-800"
            class="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-lime-400 flex items-center space-x-3 transition-colors"
          >
            <i class="fa-solid fa-calendar-check w-6"></i>
            <span>Diario de Entrenamiento</span>
          </a>
          <a
            routerLink="/routines"
            (click)="closeMobileMenu()"
            routerLinkActive="text-lime-400 bg-slate-800"
            class="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-lime-400 flex items-center space-x-3 transition-colors"
          >
            <i class="fa-solid fa-dumbbell w-6"></i>
            <span>Rutinas Recomendadas</span>
          </a>
          <a
            routerLink="/nutrition"
            (click)="closeMobileMenu()"
            routerLinkActive="text-lime-400 bg-slate-800"
            class="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-lime-400 flex items-center space-x-3 transition-colors"
          >
            <i class="fa-solid fa-utensils w-6"></i>
            <span>Dietas y Nutrición</span>
          </a>
          <a
            routerLink="/tools"
            (click)="closeMobileMenu()"
            routerLinkActive="text-lime-400 bg-slate-800"
            class="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-lime-400 flex items-center space-x-3 transition-colors"
          >
            <i class="fa-solid fa-stopwatch w-6"></i>
            <span>Herramientas y Cronómetro</span>
          </a>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  readonly isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
