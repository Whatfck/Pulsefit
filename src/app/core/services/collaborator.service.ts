import { Injectable, signal } from "@angular/core";
import { Collaborator } from "../models/collaborator.model";

@Injectable({ providedIn: "root" })
export class CollaboratorService {
  private readonly _collaborators = signal<Collaborator[]>([
    {
      name: "Daniel Perez",
      role: "Desarrollador",
      profileUrl: "https://github.com/Whatfck",
    },
    {
      name: "Sebastian Bolivar",
      role: "Desarrollador",
      profileUrl: "https://github.com/SebastianBolivar01",
    },
    {
      name: "Julian Mera",
      role: "Desarrollador",
      profileUrl: "https://github.com/Jujuks",
    },
    {
      name: "Manuela Betancourth",
      role: "Desarrolladora",
      profileUrl: "https://github.com/manuelabetancourth12",
    },
  ]);

  readonly collaborators = this._collaborators.asReadonly();
}
