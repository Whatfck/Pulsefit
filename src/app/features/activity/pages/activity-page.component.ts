import { Component } from "@angular/core";

@Component({
  selector: "app-activity-page",
  standalone: true,
  template: `
    <section class="module-placeholder">
      <p class="module-name">Diario de entrenamiento</p>
      <h1>Registra cada sesión</h1>
      <p>Próximamente podrás registrar ejercicios, duración e intensidad.</p>
    </section>
  `,
  styles: `
    .module-placeholder { max-width: 760px; }
    .module-name { margin: 0 0 12px; color: #c9ff44; font-weight: 800; }
    h1 { max-width: 14ch; margin: 0 0 16px; font-size: clamp(2.5rem, 8vw, 5.5rem); line-height: .95; letter-spacing: -.04em; }
    p { max-width: 560px; color: #b2c1c9; line-height: 1.6; }
  `,
})
export class ActivityPageComponent {}
