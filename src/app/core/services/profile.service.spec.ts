import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ProfileService } from "./profile.service";
import { ProfileStorage } from "../storage/profile-storage";
import { UserProfile } from "../models/profile.model";

const profile: UserProfile = {
  name: "Laura",
  age: 32,
  gender: "female",
  weight: 68,
  height: 170,
  goal: "gain",
  activityLevel: 1.55,
};

describe("ProfileService", () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [ProfileService, ProfileStorage],
    });
  });

  it("starts without a profile and without metrics", () => {
    const service = TestBed.inject(ProfileService);
    expect(service.profile()).toBeNull();
    expect(service.metrics()).toBeNull();
  });

  it("updates the reactive profile and metrics together", () => {
    const service = TestBed.inject(ProfileService);

    expect(service.saveProfile(profile)).toBe(true);
    expect(service.profile()).toEqual(profile);
    expect(service.metrics()?.targetCalories).toBeGreaterThan(
      service.metrics()?.tdee ?? 0,
    );
  });

  it("restores a saved profile on a new service instance", () => {
    const firstService = TestBed.inject(ProfileService);
    firstService.saveProfile(profile);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ProfileService, ProfileStorage],
    });

    const restoredService = TestBed.inject(ProfileService);
    expect(restoredService.profile()).toEqual(profile);
  });
});
