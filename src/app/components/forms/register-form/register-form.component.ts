import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterService } from './register.service';
import { MatDialog } from '@angular/material/dialog';
import { matchPassword } from '../../../../utils/match-password-validator';
import { DialogDefaultComponent } from '../../index';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  readonly dialog = inject(MatDialog);
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: matchPassword,
    },
  );
  controlHidePasswordFields = {
    password: true,
    confirm: true,
  };

  constructor(private registerService: RegisterService) {}

  hideField(field: keyof typeof this.controlHidePasswordFields) {
    this.controlHidePasswordFields[field] =
      !this.controlHidePasswordFields[field];
  }

  onSubmit() {
    const name = this.registerForm.controls.name.value!;
    const email = this.registerForm.controls.email.value!;
    const password = this.registerForm.controls.password.value!;

    this.registerService.register({ name, email, password }).subscribe({
      next(value) {
        console.log(value);
      },
      error: (err) => {
        const message = err?.error?.errors?.[0]?.message;
        const title = 'Erro no Cadastro';

        this.openDialog({ title, message });
      },
    });
  }

  openDialog(data: { title: string; message: string }) {
    this.dialog.open(DialogDefaultComponent, {
      data,
    });
  }
}
