import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(min: Date, max: Date): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value);
    if (date <= min) return { tooEarly: true };
    if (date >= max) return { tooLate: true };

    return null;
  };
}

// Custom date format
export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MMM/YYYY',
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file); // 👈 converts file to base64
    });
  }