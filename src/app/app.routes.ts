import { Routes } from '@angular/router';
import { AuthComponent, WelcomeComponent } from './pages/index';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
