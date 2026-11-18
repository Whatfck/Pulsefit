import { Component, inject } from "@angular/core";
import { CollaboratorService } from "../../core/services/collaborator.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  template: `
    <section class="collaborators" aria-labelledby="collaborators-title">
      <h2 id="collaborators-title">Nuestros Colaboradores</h2>
      <div class="collaborator-grid">
        @for (collaborator of collaborators(); track collaborator.profileUrl) {
          <a
            class="collaborator"
            [href]="collaborator.profileUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="dev-icon" aria-hidden="true">&lt;/&gt;</span>
            <strong>{{ collaborator.name }}</strong>
            <span class="role">{{ collaborator.role }}</span>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .collaborators {
      padding: 48px max(16px, calc((100% - 1120px) / 2));
      background: #0d1b24;
    }

    h2 {
      margin: 0 0 24px;
      font-size: clamp(1.5rem, 4vw, 2.25rem);
    }

    .collaborator-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    .collaborator {
      min-height: 112px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 6px;
      padding: 18px;
      border-radius: 10px;
      border: 1px solid #263844;
      background: #142632;
      text-decoration: none;
    }

    .collaborator:hover {
      background: #1a303d;
    }

    .collaborator strong {
      color: #f4fbff;
    }

    .dev-icon {
      color: #c9ff44;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 1.1rem;
      font-weight: 800;
    }

    .role {
      color: #a7b7c0;
      font-size: 0.875rem;
    }

    @media (max-width: 760px) {
      .collaborator-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 420px) {
      .collaborator-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class SidebarComponent {
  private readonly collaboratorService = inject(CollaboratorService);
  readonly collaborators = this.collaboratorService.collaborators;
}
