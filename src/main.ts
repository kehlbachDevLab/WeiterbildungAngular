import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { VerkaufsDashboard } from './Teilpruefung 1/verkaufs-dashboard.component';

bootstrapApplication(VerkaufsDashboard, appConfig)
  .catch((err) => console.error(err));
