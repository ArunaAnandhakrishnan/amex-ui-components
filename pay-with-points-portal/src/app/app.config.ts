import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }                                  from '@angular/router';
import { routes }                                         from './app.routes';

// Used ONLY when the app runs standalone on port 4207.
// The shell uses the exposed PayWithPointsModule directly — this config is ignored.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
