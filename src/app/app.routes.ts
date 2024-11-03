import { Routes } from '@angular/router';
import {
  AuthComponent,
  BusinessPersonRegisterComponent,
  CompanyRegisterComponent,
  DashboardComponent,
  HomeComponent,
  ReportsComponent,
  TransactionsComponent,
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
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
