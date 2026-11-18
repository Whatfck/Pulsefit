import { Injectable, computed, inject, signal } from "@angular/core";
import { ProfileStorage } from "../storage/profile-storage";
import { calculateFitnessMetrics } from "../utils/profile-calculator";
import { UserProfile } from "../models/profile.model";

@Injectable({ providedIn: "root" })
export class ProfileService {
  private readonly storage = inject(ProfileStorage);
  private readonly _profile = signal<UserProfile | null>(this.storage.load());

  readonly profile = this._profile.asReadonly();
  readonly metrics = computed(() => {
    const profile = this._profile();
    return profile ? calculateFitnessMetrics(profile) : null;
  });

  saveProfile(profile: UserProfile): boolean {
    const saved = this.storage.save(profile);
    if (saved) this._profile.set(profile);
    return saved;
  }

  clearProfile(): void {
    this._profile.set(null);
  }
}
