import { Injectable, signal } from "@angular/core";
import { StorageService } from "./storage.service";

export interface ProfileData {
  name?: string;
  age?: number;
  weightKg?: number;
  heightCm?: number;
}

@Injectable({ providedIn: "root" })
export class ProfileService {
  private readonly key = "pulsefit.profile";
  private readonly _profile = signal<ProfileData>({});
  readonly profile = this._profile.asReadonly();

  constructor(private readonly storage: StorageService) {
    this._profile.set(this.storage.read<ProfileData>(this.key) ?? {});
  }

  save(profile: ProfileData): void {
    this._profile.set(profile);
    this.storage.write(this.key, profile);
  }
}
