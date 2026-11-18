import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <footer class="site-footer">
      <p>PulseFit 2026</p>
      <p>Entrenamiento personalizado y seguimiento diario.</p>
    </footer>
  `,
  styles: `
    .site-footer {
      padding: 28px 16px;
      border-top: 1px solid #1b2a35;
      background: #0b171f;
      text-align: center;
      color: #93a4ae;
      font-size: 0.875rem;
    }

    p {
      margin: 4px 0;
    }
  `,
})
export class FooterComponent {}
