import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorService } from '../../core/services/collaborator.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="border-t border-slate-800/80 bg-slate-900/50 py-4 mt-8">
      <div class="container my-5">
        <h2 class="text-center mb-4 text-light font-bold">Nuestros Colaboradores</h2>
        @if (collaborators().length === 0) {
          <p class="text-center text-slate-400">No hay colaboradores disponibles.</p>
        } @else {
          <div class="row my-3 g-3">
            @for (collab of collaborators(); track collab.name) {
              <div class="col-12 col-sm-6 col-md-3">
                <a [href]="collab.profileUrl" target="_blank" rel="noopener noreferrer" class="text-decoration-none">
                  <div class="card bs-dark-card p-3 text-center h-100 shadow-sm">
                    <div class="card-body flex flex-col items-center justify-center">
                      <span class="dev-icon mb-2" aria-hidden="true">&lt;/&gt;</span>
                      <h5 class="card-title font-bold text-white mb-1">{{ collab.name }}</h5>
                      <p class="card-text text-slate-400 text-xs">{{ collab.role }}</p>
                    </div>
                  </div>
                </a>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class SidebarComponent {
  private readonly collaboratorService = inject(CollaboratorService);
  readonly collaborators = this.collaboratorService.collaborators;
}
