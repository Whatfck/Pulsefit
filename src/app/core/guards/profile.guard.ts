import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

/**
 * Guardian funcional de ejemplo que valida si el usuario cuenta con datos en su perfil.
 */
export const profileCompleteGuard: CanActivateFn = () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.profile()) {
    return true;
  }

  return router.parseUrl('/profile');
};
