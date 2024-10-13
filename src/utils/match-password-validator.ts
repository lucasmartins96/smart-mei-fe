import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPassword: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({
      passwordMatchError: true,
    });
    return {
      passwordMatchError: true,
    };
  }

  return null;
};
