import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const mustBeLowerThanTotalSpendingValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const totalExpenditure = currencyToNumber(control.get('reserveBalance').get('totalExpenditure').value);

  const teachingStaff = currencyToNumber(control.get('spending').get('teachingStaff').value);
  const supplyStaff = currencyToNumber(control.get('spending').get('supplyStaff').value);
  const educationSupportStaff = currencyToNumber(control.get('spending').get('educationSupportStaff').value);
  const adminStaff = currencyToNumber(control.get('spending').get('adminStaff').value);
  const otherStaff = currencyToNumber(control.get('spending').get('otherStaff').value);
  const premises = currencyToNumber(control.get('spending').get('premises').value);
  const teachingResources = currencyToNumber(control.get('spending').get('teachingResources').value);
  const energy = currencyToNumber(control.get('spending').get('energy').value);

  if (teachingStaff > totalExpenditure){
    return {teachingStaffExceeded: true};
  }
  else if (supplyStaff > totalExpenditure){
    return {supplyStaffExceeded: true};
  }
  else if (educationSupportStaff > totalExpenditure){
    return {educationSupportStaffExceeded: true};
  }
  else if (adminStaff > totalExpenditure){
    return {adminStaffExceeded: true};
  }
  else if (otherStaff > totalExpenditure){
    return {otherStaffExceeded: true};
  }
  else if (premises > totalExpenditure){
    return {premisesExceeded: true};
  }
  else if (teachingResources > totalExpenditure){
    return {teachingResourcesExceeded: true};
  }
  else if (energy > totalExpenditure){
    return {energyExceeded: true};
  }
  else if (teachingStaff + supplyStaff + educationSupportStaff + adminStaff + otherStaff + premises + teachingResources + energy > totalExpenditure) {
   return { maxExpenditureExceeded: true };
  }
  else {
   return null;
  }
};

function currencyToNumber(val: any): number {
  if (typeof (val) === 'string') {
    return Number(val.replace(new RegExp('[^.0-9-]', 'g'), ''));
  }

  return val;
}
