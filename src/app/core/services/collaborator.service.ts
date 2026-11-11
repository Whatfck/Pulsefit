import { Injectable, signal } from '@angular/core';
import { Collaborator } from '../models/collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private readonly _collaborators = signal<Collaborator[]>([
    {
      name: 'Daniel Perez',
      role: 'Desarrollador',
      profileUrl: '../../estudiantes/DP/perfil-DP.html'
    },
    {
      name: 'Sebastian Bolivar',
      role: 'Desarrollador',
      profileUrl: '../../estudiantes/Sebastian_Bolivar/perfil.html'
    },
    {
      name: 'Julian Mera',
      role: 'Desarrollador',
      profileUrl: '../../estudiantes/JulianMera/perfil_julian_mera.html'
    },
    {
      name: 'Manuela Betancourth',
      role: 'Desarrolladora',
      profileUrl: '../../estudiantes/ManuelaBetancourth/perfil.html'
    }
  ]);

  readonly collaborators = this._collaborators.asReadonly();
}
