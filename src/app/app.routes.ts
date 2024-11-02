import { Routes } from '@angular/router';
import {
  AuthComponent,
  BusinessPersonRegisterComponent,
  CompanyRegisterComponent,
  HomeComponent,
  WelcomeComponent,
} from './pages/index';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'business-person-register',
    component: BusinessPersonRegisterComponent,
  },
  {
    path: 'company-register',
    component: CompanyRegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
