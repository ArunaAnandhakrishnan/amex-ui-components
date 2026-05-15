import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent }         from './app/app.component';
import { appConfig }            from './app/app.config';

// Only executed when running standalone (ng serve on port 4207).
// When loaded as a remote by the shell, only the exposed Module is used —
// this file is NOT executed, preventing double-bootstrap / re-render.
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
