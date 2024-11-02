import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
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
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDefaultComponent } from '../../index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
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
export class LoginFormComponent {
  readonly dialog = inject(MatDialog);
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = signal(true);

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    const email = this.loginFormGroup.controls.email.value!;
    const password = this.loginFormGroup.controls.password.value!;

    this.loginService.login({ email, password }).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.body!.token);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        const message = err?.error?.errors?.[0]?.message;
        const title = 'Erro no Login';

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
