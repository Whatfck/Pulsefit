import { Component } from "@angular/core";

@Component({
  selector: "app-routines-page",
  standalone: true,
  template: `
    <section class="module-placeholder">
      <p class="module-name">Rutinas recomendadas</p>
      <h1>Encuentra tu siguiente entrenamiento</h1>
      <p>Próximamente podrás explorar rutinas por objetivo y nivel.</p>
    </section>
  `,
  styles: `
    .module-placeholder { max-width: 760px; }
    .module-name { margin: 0 0 12px; color: #c9ff44; font-weight: 800; }
    h1 { max-width: 15ch; margin: 0 0 16px; font-size: clamp(2.5rem, 8vw, 5.5rem); line-height: .95; letter-spacing: -.04em; }
    p { max-width: 560px; color: #b2c1c9; line-height: 1.6; }
  `,
})
export class RoutinesPageComponent {}
