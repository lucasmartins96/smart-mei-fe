import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import brazilianStates from '../../../../utils/brazilian-states';
import { BusinessPersonService } from '../../../services/business-person/business-person.service';
import { DialogDefaultComponent } from '../../dialogs/dialog-default/dialog-default.component';

@Component({
  selector: 'app-business-person-register-form',
  standalone: true,
  templateUrl: './business-person-register-form.component.html',
  styleUrl: './business-person-register-form.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPersonRegisterFormComponent {
  readonly dialog = inject(MatDialog);
  brazilianStates = brazilianStates;
  businessPersonFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d{3}\.?\d{3}\.?\d{3}[-|.]?\d{2}/),
    ]),
    birthday: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      number: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/\d{5}-\d{3}/),
      ]),
    }),
  });

  constructor(
    private businessPersonService: BusinessPersonService,
    private router: Router,
  ) {}

  onSubmit() {
    const name = this.businessPersonFormGroup.controls.name.value!;
    const cpf = this.businessPersonFormGroup.controls.cpf.value!;
    const birthday = this.businessPersonFormGroup.controls.birthday.value!;
    const street =
      this.businessPersonFormGroup.controls.address.controls.street.value!;
    const complement =
      this.businessPersonFormGroup.controls.address.controls.complement.value;
    const number =
      this.businessPersonFormGroup.controls.address.controls.number.value!;
    const neighborhood =
      this.businessPersonFormGroup.controls.address.controls.neighborhood.value;
    const city =
      this.businessPersonFormGroup.controls.address.controls.city.value!;
    const state =
      this.businessPersonFormGroup.controls.address.controls.state.value!;
    const zipCode =
      this.businessPersonFormGroup.controls.address.controls.zipCode.value!;

    const requestBody = {
      name,
      cpf,
      birthday,
      address: {
        street,
        complement,
        number,
        neighborhood,
        city,
        state,
        zipCode,
      },
    };

    this.businessPersonService.add(requestBody).subscribe({
      next: (response) => {
        const responseBody = response.body;

        sessionStorage.setItem('businessPersonId', responseBody!.id!);
        this.router.navigateByUrl('/company-register');
      },
      error: (errorResponse) => {
        const message = errorResponse?.error?.errors?.[0]?.message;
        const title = 'Erro no Cadastro de Empresário(a)';

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
