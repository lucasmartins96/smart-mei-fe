import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent, RegisterFormComponent } from '../forms';

@Component({
  selector: 'app-tabs-signin-signup',
  standalone: true,
  templateUrl: './tabs-signin-signup.component.html',
  styleUrl: './tabs-signin-signup.component.scss',
  imports: [MatTabsModule, LoginFormComponent, RegisterFormComponent],
})
export class TabsSigninSignupComponent {}
