import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class HomeComponent {
  linkList = [
    {
      label: 'Dashboard',
      routerLink: 'dashboard',
    },
    {
      label: 'Movimentações',
      routerLink: 'transactions',
    },
    {
      label: 'Relatórios',
      routerLink: 'reports',
    },
  ];
}
