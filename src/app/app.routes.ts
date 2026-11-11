import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile'
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/pages/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    title: 'PulseFit - Perfil & IMC'
  },
  {
    path: 'activity',
    loadComponent: () =>
      import('./features/activity/pages/activity-page.component').then(
        (m) => m.ActivityPageComponent
      ),
    title: 'PulseFit - Diario & Actividad'
  },
  {
    path: 'routines',
    loadComponent: () =>
      import('./features/routines/pages/routines-page.component').then(
        (m) => m.RoutinesPageComponent
      ),
    title: 'PulseFit - Catálogo de Rutinas'
  },
  {
    path: 'nutrition',
    loadComponent: () =>
      import('./features/nutrition/pages/nutrition-page.component').then(
        (m) => m.NutritionPageComponent
      ),
    title: 'PulseFit - Dietas & Nutrición'
  },
  {
    path: 'tools',
    loadComponent: () =>
      import('./features/tools/pages/tools-page.component').then(
        (m) => m.ToolsPageComponent
      ),
    title: 'PulseFit - Herramientas & Cronómetro'
  },
  {
    path: '**',
    redirectTo: 'profile'
  }
];
