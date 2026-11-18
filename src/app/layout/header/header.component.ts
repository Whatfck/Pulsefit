import { Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" routerLink="/profile" aria-label="PulseFit, ir al perfil">
          <img class="brand-mark" src="icon-Pulsefit.png" alt="" width="38" height="38" />
          <span>PULSE<span class="brand-accent">FIT</span></span>
        </a>

        <button
          class="menu-button"
          type="button"
          (click)="toggleMenu()"
          [attr.aria-expanded]="isMenuOpen()"
          aria-controls="primary-navigation"
        >
          <span aria-hidden="true">{{ isMenuOpen() ? "Cerrar" : "Menú" }}</span>
          <span class="sr-only">
            {{ isMenuOpen() ? "Cerrar navegacion" : "Abrir navegacion" }}
          </span>
        </button>

        <nav id="primary-navigation" class="primary-nav" [class.is-open]="isMenuOpen()" aria-label="Principal">
          @for (item of navigation; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              [attr.aria-label]="item.label"
              (click)="closeMenu()"
            >
              {{ item.label }}
            </a>
          }
        </nav>
      </div>
    </header>
  `,
  styles: `
    .site-header {
      position: sticky;
      top: 0;
      z-index: 20;
      border-bottom: 1px solid #1b2a35;
      background: rgba(11, 23, 31, 0.96);
    }

    .header-inner {
      width: min(1120px, calc(100% - 32px));
      height: 72px;
      margin-inline: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: #f4fbff;
      font-size: 1.25rem;
      font-weight: 800;
      text-decoration: none;
    }

    .brand-accent {
      color: #c9ff44;
    }

    .brand-mark {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      object-fit: contain;
    }

    .primary-nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .primary-nav a {
      padding: 10px 12px;
      border-radius: 8px;
      color: #9fb0ba;
      font-size: 0.92rem;
      font-weight: 700;
      text-decoration: none;
    }

    .primary-nav a:hover,
    .primary-nav a.active {
      color: #081017;
      background: #c9ff44;
    }

    .menu-button {
      display: none;
      border: 0;
      border-radius: 8px;
      background: #1a303d;
      color: #f4fbff;
      padding: 9px 12px;
      font-weight: 800;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @media (max-width: 760px) {
      .header-inner {
        height: 64px;
      }

      .menu-button {
        display: inline-block;
      }

      .primary-nav {
        position: absolute;
        left: 16px;
        right: 16px;
        top: 72px;
        display: none;
        flex-direction: column;
        align-items: stretch;
        padding: 8px;
        border: 1px solid #263844;
        border-radius: 12px;
        background: #0b171f;
      }

      .primary-nav.is-open {
        display: flex;
      }

      .primary-nav a {
        padding: 12px;
      }
    }
  `,
})
export class HeaderComponent {
  readonly isMenuOpen = signal(false);

  readonly navigation = [
    { path: "/profile", label: "Perfil & IMC" },
    { path: "/activity", label: "Diario & Actividad" },
    { path: "/routines", label: "Rutinas" },
    { path: "/nutrition", label: "Nutrición" },
    { path: "/tools", label: "Herramientas" },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
