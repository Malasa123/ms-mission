import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators extends Validators{

    static mustBeLessThan( prop:string , number: number = 1): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
          let otherValue = control.parent && control.parent.get(prop) && control.parent.get(prop).value  ? control.parent.get(prop).value : 0; 
          if ((control.value + number) > otherValue) {
              return { 'less': true };
          }
          return null;
      };
    }
    static mustBeGreaterThan( prop:string , number: number = 0): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
          let otherValue = control.parent && control.parent.get(prop) && control.parent.get(prop).value  ? control.parent.get(prop).value : 0; 
          otherValue+=number;
          if (control.value < otherValue) {
              return { 'greater': true };
          }
          return null;
      };
    }
    static isTimeAfter(prop : string): ValidatorFn{
      return(control: AbstractControl): {[key:string]: boolean} | null => {
        let otherValue = control.parent && control.parent.get(prop) && control.parent.get(prop).value  ? control.parent.get(prop).value : ''; 
          if(otherValue && control.value && (otherValue as Date).getTime() > (control.value as Date).getTime() ){
          return {
            'isTimeAfter':true
          }
        }
        return null;
      }
    }
  
    static isTimeBefore(prop : string): ValidatorFn{
      return(control: AbstractControl): {[key:string]: boolean} | null => {
        let otherValue = control.parent && control.parent.get(prop) && control.parent.get(prop).value  ? control.parent.get(prop).value : ''; 
        if(otherValue && control.value && (otherValue as Date).getTime() < (control.value as Date).getTime() ){
          return {
            'isTimeBefore':true
          }
        }
        return null;
      }
    }
  }