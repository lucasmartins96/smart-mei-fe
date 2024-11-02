import { Component } from '@angular/core';
import { CompanyRegisterFormComponent } from '../../components/forms';

@Component({
  selector: 'app-company-register',
  standalone: true,
  imports: [CompanyRegisterFormComponent],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.scss',
})
export class CompanyRegisterComponent {}
