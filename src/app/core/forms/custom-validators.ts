import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export function mustMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function allowedCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // setup simple regex for white listed characters
    const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
    if (control.value && control.value.length > 0) {
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);
      // if there are matches return an object, else return null.
      return matches && matches.length ? { invalidCharacters: matches } : null;
    }
    return null;
  };
}

export function ageLimitValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // if control value is not null and is a number
    if (control.value !== null) {
      // return null  if it's in between the minAge and maxAge and is A valid Number
      return isNaN(control.value) || // checks if its a valid number
        control.value < minAge || // checks if its below the minimum age
        control.value > maxAge // checks if its above the maximum age
        ? { ageLimit: true } // return this incase of error
        : null; // there was not error
    }
    return null;
  };
}
