import { Component } from '@angular/core';
import { TabsSigninSignupComponent } from '../../components';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [TabsSigninSignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
