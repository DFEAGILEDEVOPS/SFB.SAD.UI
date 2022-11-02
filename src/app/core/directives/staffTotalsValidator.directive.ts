import {ValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';

export const staffTotalsValidatorDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const seniorLeadersCount: number = control.get('schoolDetails').get('seniorLeadership')?.value;
  const staffTotal: number = control.get('schoolDetails').get('schoolWorkforce')?.value;
  const teacherCount: number = control.get('schoolDetails').get('numberOfTeachers')?.value;

  if (seniorLeadersCount > teacherCount) {
    console.log('seniorLeadersGreaterThanTeachers');
    return {seniorLeadersGreaterThanTeachers: true };
  }

  if (teacherCount > staffTotal) {
    console.log('teachersGreaterThanStaff');
    return { teachersGreaterThanStaff: true };
  }
};
