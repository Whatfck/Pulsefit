import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor funcional para trazabilidad y manejo de peticiones HTTP globales.
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // En modo cliente / frontend sin backend, sirve como punto de intercepción centralizado
  return next(req);
};
