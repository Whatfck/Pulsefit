import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
      <div class="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
        <p>© 2026 FitPulse Gym App. Todos los derechos reservados.</p>
        <p class="mt-1">Diseñado para seguimiento deportivo personal e interactivo.</p>
      </div>
    </footer>
  `
})
export class FooterComponent {}
