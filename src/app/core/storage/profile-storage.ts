import { Injectable } from "@angular/core";
import { UserProfile } from "../models/profile.model";

export const PROFILE_STORAGE_KEY = "pulsefit.profile";

@Injectable({ providedIn: "root" })
export class ProfileStorage {
  load(): UserProfile | null {
    try {
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!storedProfile) return null;

      const profile = JSON.parse(storedProfile) as Partial<UserProfile>;
      if (!this.isValidProfile(profile)) return null;
      return profile as UserProfile;
    } catch {
      return null;
    }
  }

  save(profile: UserProfile): boolean {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return true;
    } catch {
      return false;
    }
  }

  private isValidProfile(profile: Partial<UserProfile>): boolean {
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
