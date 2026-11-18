import { beforeEach, describe, expect, it } from "vitest";
import { PROFILE_STORAGE_KEY, ProfileStorage } from "./profile-storage";
import { UserProfile } from "../models/profile.model";

const profile: UserProfile = {
  name: "Ana",
  age: 28,
  gender: "female",
  weight: 62,
  height: 168,
  goal: "maintain",
  activityLevel: 1.375,
};

describe("ProfileStorage", () => {
  let storage: ProfileStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = new ProfileStorage();
  });

  it("returns null when no profile is stored", () => {
    expect(storage.load()).toBeNull();
  });

  it("saves and restores a valid profile", () => {
    expect(storage.save(profile)).toBe(true);
    expect(localStorage.getItem(PROFILE_STORAGE_KEY)).not.toBeNull();
    expect(storage.load()).toEqual(profile);
  });

  it("rejects corrupted JSON", () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, "{invalid");
    expect(storage.load()).toBeNull();
  });

  it("rejects structurally invalid profiles", () => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({ ...profile, age: 5 }),
    );
    expect(storage.load()).toBeNull();
  });
});
