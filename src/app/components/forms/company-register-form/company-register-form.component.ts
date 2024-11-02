import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import brazilianStates from '../../../../utils/brazilian-states';
import { CompanyService } from '../../../services/company/company.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDefaultComponent } from '../../dialogs/dialog-default/dialog-default.component';

interface CompanyActivity {
  index: number;
  cnae: string;
  name: string;
  occupation: string;
  isPrimary: boolean;
}

@Component({
  selector: 'app-company-register-form',
  standalone: true,
  templateUrl: './company-register-form.component.html',
  styleUrl: './company-register-form.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRegisterFormComponent {
  readonly dialog = inject(MatDialog);
  activityIndex = 0;
  activitiesButtonLabel = 'Cadastrar Atividade';
  isEditionMode = false;
  activityEditId: number | null = null;
  brazilianStates = brazilianStates;
  activityFormGroup = new FormGroup({
    cnae: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d{4}-\d{1}\/\d{2}/),
    ]),
    name: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    isPrimary: new FormControl(false),
  });
  companyRegisterFormGroup = new FormGroup({
    cnpj: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/),
    ]),
    legalName: new FormControl('', [Validators.required]),
    tradeName: new FormControl('', [Validators.required]),
    socialCapital: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(((\d+)(\.\d{3})*(,\d{2}))|(\d*))$/),
    ]),
    isTransportAutonomous: new FormControl(false),
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
  displayedColumns = ['cnae', 'name', 'occupation', 'isPrimary', 'actions'];
  companyActivitiesTableDataSource: CompanyActivity[] = [];

  @ViewChild(MatTable)
  table!: MatTable<CompanyActivity>;

  constructor(
    private companyService: CompanyService,
    private router: Router,
  ) {}

  addActivity() {
    const cnae = this.activityFormGroup.controls.cnae.value!;
    const name = this.activityFormGroup.controls.name.value!;
    const occupation = this.activityFormGroup.controls.occupation.value!;
    const isPrimary = this.activityFormGroup.controls.isPrimary.value!;
    const newActivity = {
      index: this.activityIndex,
      cnae,
      name,
      occupation,
      isPrimary,
    };
    this.companyActivitiesTableDataSource = [
      ...this.companyActivitiesTableDataSource,
      newActivity,
    ];
    this.activityIndex += 1;

    this.activityFormGroup.setValue({
      cnae: '',
      name: '',
      occupation: '',
      isPrimary: false,
    });
    this.activityFormGroup.markAsUntouched();
    this.table.renderRows();
  }

  updateActivity() {
    const cnae = this.activityFormGroup.controls.cnae.value!;
    const name = this.activityFormGroup.controls.name.value!;
    const occupation = this.activityFormGroup.controls.occupation.value!;
    const isPrimary = this.activityFormGroup.controls.isPrimary.value!;

    this.companyActivitiesTableDataSource =
      this.companyActivitiesTableDataSource.map((activity) => {
        if (activity.index === this.activityEditId) {
          return {
            ...activity,
            cnae,
            name,
            occupation,
            isPrimary,
          };
        }

        return activity;
      });
    this.setActivityFormButtonLabelToRegisterActivity();
    this.isEditionMode = false;
    this.activityEditId = null;
    this.activityFormGroup.setValue({
      cnae: '',
      name: '',
      occupation: '',
      isPrimary: false,
    });
    this.activityFormGroup.markAsUntouched();
    this.table.renderRows();
  }

  handleActivityFormButtonActions() {
    if (this.isEditionMode) {
      this.updateActivity();
    } else {
      this.addActivity();
    }
  }

  handleClickCancelChanges() {
    this.setActivityFormButtonLabelToRegisterActivity();
    this.isEditionMode = false;
    this.activityEditId = null;
    this.activityFormGroup.setValue({
      cnae: '',
      name: '',
      occupation: '',
      isPrimary: false,
    });
    this.activityFormGroup.markAsUntouched();
  }

  deleteOneActivity(activityRow: CompanyActivity) {
    this.companyActivitiesTableDataSource =
      this.companyActivitiesTableDataSource.filter((activity) => {
        return activity.index !== activityRow.index;
      });
    this.table.renderRows();
  }

  handleUpdateActivity(activityIndex: number) {
    this.setActivityFormButtonLabelToUpdateActivity();
    this.isEditionMode = true;
    this.activityEditId = activityIndex;
    const activityFound = this.companyActivitiesTableDataSource.find(
      (activity) => activity.index === activityIndex,
    )!;
    this.activityFormGroup.setValue({
      cnae: activityFound.cnae,
      name: activityFound.name,
      occupation: activityFound.occupation,
      isPrimary: activityFound.isPrimary,
    });
  }

  setActivityFormButtonLabelToRegisterActivity() {
    this.activitiesButtonLabel = 'Cadastrar Atividade';
  }

  setActivityFormButtonLabelToUpdateActivity() {
    this.activitiesButtonLabel = 'Atualizar Atividade';
  }

  onSubmit() {
    const activitiesIsEmpty =
      this.companyActivitiesTableDataSource.length === 0;
    const primaryActivitiesFilterResult =
      this.companyActivitiesTableDataSource.filter(
        (activity) => activity.isPrimary,
      );

    if (activitiesIsEmpty) {
      this.openDialog({
        title: 'Erro ao Cadastrar Empresa',
        message:
          'É obrigatório informar uma atividade principal e algumas atividades secundárias',
      });
      return;
    }

    if (primaryActivitiesFilterResult.length !== 1) {
      this.openDialog({
        title: 'Erro ao Cadastrar Empresa',
        message: 'Informe somente uma atividade principal',
      });
      return;
    }

    const businessManId = sessionStorage.getItem('businessPersonId');
    const { cnpj, legalName, tradeName, isTransportAutonomous } =
      this.companyRegisterFormGroup.value;
    const { zipCode, street, complement, number, neighborhood, city, state } =
      this.companyRegisterFormGroup.value.address!;
    const socialCapital =
      this.companyRegisterFormGroup.value.socialCapital?.replaceAll(
        /(\.)|(,)/g,
        (_match, _dotGroupMatch, commaGroupMatch) => {
          if (commaGroupMatch) {
            return '.';
          }

          return '';
        },
      );
    const activities = this.companyActivitiesTableDataSource.map((activity) => {
      const { cnae, isPrimary, name, occupation } = activity;

      return {
        cnae,
        name,
        occupation,
        isPrimary,
      };
    });

    const requestBody = {
      company: {
        cnpj: cnpj!,
        legalName: legalName!,
        tradeName: tradeName!,
        socialCapital: Number(socialCapital),
        isTransportAutonomous: isTransportAutonomous!,
        businessManId: Number(businessManId!),
      },
      address: {
        street: street!,
        complement: complement!,
        number: number!,
        neighborhood: neighborhood!,
        city: city!,
        state: state!,
        zipCode: zipCode!,
      },
      activities,
    };

    this.companyService.add(requestBody).subscribe({
      next: (response) => {
        const responseBody = response.body;

        console.log(responseBody);
        this.router.navigateByUrl('/home');
      },
      error: (errorResponse) => {
        const title = 'Erro no Cadastro de Empresário(a)';
        const message = errorResponse?.error?.errors?.[0]?.message;

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
