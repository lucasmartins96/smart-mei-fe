import { Component } from '@angular/core';
import { BusinessPersonRegisterFormComponent } from '../../components/forms';

@Component({
  selector: 'app-business-person-register',
  standalone: true,
  templateUrl: './business-person-register.component.html',
  styleUrl: './business-person-register.component.scss',
  imports: [BusinessPersonRegisterFormComponent],
})
export class BusinessPersonRegisterComponent {}
