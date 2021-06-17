import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export let mustBeLowerThanTotalSpendingValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  let totalExpenditure = currencyToNumber(control.get('reserveBalance').get('totalExpenditure').value);
  let teachingStaff = currencyToNumber(control.get('spending').get('teachingStaff').value);
  let supplyStaff = currencyToNumber(control.get('spending').get('supplyStaff').value);
  let educationSupportStaff = currencyToNumber(control.get('spending').get('educationSupportStaff').value);
  let adminStaff = currencyToNumber(control.get('spending').get('adminStaff').value);
  let otherStaff = currencyToNumber(control.get('spending').get('otherStaff').value);
  let premises = currencyToNumber(control.get('spending').get('premises').value);
  let teachingResources = currencyToNumber(control.get('spending').get('teachingResources').value);
  let energy = currencyToNumber(control.get('spending').get('energy').value);

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
