import { computed, Injectable, inject, signal } from "@angular/core";
import { StorageService } from "./storage.service";
import { UserProfile } from "../models/profile.model";
import { calculateFitnessMetrics } from "../utils/profile-calculator";

export interface ProfileData {
  name?: string;
  age?: number;
  gender?: "male" | "female";
  weight?: number;
  height?: number;
  weightKg?: number;
  heightCm?: number;
  goal?: "lose" | "maintain" | "gain";
  activityLevel?: number;
}

@Injectable({ providedIn: "root" })
export class ProfileService {
  private readonly key = "pulsefit.profile";
  private readonly storage = inject(StorageService);
  private readonly _profile = signal<ProfileData | null>(null);

  readonly profile = this._profile.asReadonly();
  readonly metrics = computed(() => {
    const profile = this._profile();
    const normalized = this.normalizeProfile(profile);
    return normalized ? calculateFitnessMetrics(normalized) : null;
  });

  constructor() {
    const storedProfile = this.storage.read<ProfileData>(this.key);
    if (storedProfile) {
      this._profile.set(storedProfile);
    }
  }

  save(profile: ProfileData): void {
    this._profile.set(profile);
    this.storage.write(this.key, profile);
  }

  saveProfile(profile: UserProfile): boolean {
    if (!this.isValidProfile(profile)) return false;

    const saved = this.storage.write(this.key, profile);
    if (!saved) return false;

    this._profile.set(profile);
    return true;
  }

  clearProfile(): void {
    this.storage.remove(this.key);
    this._profile.set(null);
  }

  private normalizeProfile(profile: ProfileData | null): UserProfile | null {
    if (!profile) return null;

    const weight = profile.weight ?? profile.weightKg;
    const height = profile.height ?? profile.heightCm;
    if (
      typeof profile.age !== "number" ||
      typeof weight !== "number" ||
      typeof height !== "number"
    ) {
      return null;
    }

    return {
      name: profile.name ?? "",
      age: profile.age,
      gender: profile.gender ?? "male",
      weight,
      height,
      goal: profile.goal ?? "maintain",
      activityLevel: profile.activityLevel ?? 1.55,
    };
  }

  private isValidProfile(profile: UserProfile): boolean {
    return (
      typeof profile.name === "string" &&
      profile.name.trim().length > 0 &&
      typeof profile.age === "number" &&
      profile.age >= 10 &&
      profile.age <= 100 &&
      (profile.gender === "male" || profile.gender === "female") &&
      typeof profile.weight === "number" &&
      profile.weight >= 20 &&
      profile.weight <= 300 &&
      typeof profile.height === "number" &&
      profile.height >= 50 &&
      profile.height <= 250 &&
      (profile.goal === "lose" ||
        profile.goal === "maintain" ||
        profile.goal === "gain") &&
      typeof profile.activityLevel === "number" &&
      [1.2, 1.375, 1.55, 1.725].includes(profile.activityLevel)
    );
  }
}
