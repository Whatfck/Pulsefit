import { describe, expect, it } from "vitest";
import { routes } from "./app.routes";

describe("App routes", () => {
  it("should redirect the root route to profile", () => {
    expect(routes[0]).toMatchObject({
      path: "",
      pathMatch: "full",
      redirectTo: "profile",
    });
  });

  it("should define all PulseFit feature routes", () => {
    const featurePaths = routes
      .map((route) => route.path)
      .filter((path): path is string => path !== undefined);

    expect(featurePaths).toEqual([
      "",
      "profile",
      "activity",
      "routines",
      "nutrition",
      "tools",
      "**",
    ]);
  });

  it("should load standalone feature components", async () => {
    const profileRoute = routes.find((route) => route.path === "profile");
    expect(profileRoute?.loadComponent).toBeTypeOf("function");

    const profileComponent = await profileRoute?.loadComponent?.();
    expect(profileComponent).toBeTruthy();
  });

  it("should redirect unknown routes to profile", () => {
    expect(routes.at(-1)).toMatchObject({
      path: "**",
      redirectTo: "profile",
    });
  });
});
