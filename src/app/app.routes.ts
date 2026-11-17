import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "profile",
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./features/profile/pages/profile-page.component").then(
        (m) => m.ProfilePageComponent,
      ),
    title: "PulseFit - Perfil y IMC",
  },
  {
    path: "activity",
    loadComponent: () =>
      import("./features/activity/pages/activity-page.component").then(
        (m) => m.ActivityPageComponent,
      ),
    title: "PulseFit - Diario y actividad",
  },
  {
    path: "routines",
    loadComponent: () =>
      import("./features/routines/pages/routines-page.component").then(
        (m) => m.RoutinesPageComponent,
      ),
    title: "PulseFit - Rutinas",
  },
  {
    path: "nutrition",
    loadComponent: () =>
      import("./features/nutrition/pages/nutrition-page.component").then(
        (m) => m.NutritionPageComponent,
      ),
    title: "PulseFit - Nutricion",
  },
  {
    path: "tools",
    loadComponent: () =>
      import("./features/tools/pages/tools-page.component").then(
        (m) => m.ToolsPageComponent,
      ),
    title: "PulseFit - Herramientas",
  },
  {
    path: "**",
    redirectTo: "profile",
  },
];
