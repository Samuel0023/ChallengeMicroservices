/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDecimal', async: false })
export class IsDecimalValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'number') {
      return false;
    }
    // Verificar si el número tiene hasta 10 dígitos en la parte entera y 2 dígitos en la parte decimal
    return /^-?\d{1,10}(\.\d{1,2})?$/.test(value.toString());
  }

  defaultMessage(_args: ValidationArguments) {
    return 'El campo precio debe ser un número decimal válido con hasta 10 dígitos en la parte entera y 2 dígitos en la parte decimal';
  }
}
