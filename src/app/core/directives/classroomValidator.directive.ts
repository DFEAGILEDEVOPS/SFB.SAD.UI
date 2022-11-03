import {ValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';

export const classroomValidatorDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const averageClass: number = control.get('schoolDetails').get('averageClassSize')?.value;
  const totalPupils: number = control.get('schoolDetails').get('numberOfPupils')?.value;

  if (averageClass > totalPupils) {
    return {classSizeGreaterThanCohort: true };
  }
};
