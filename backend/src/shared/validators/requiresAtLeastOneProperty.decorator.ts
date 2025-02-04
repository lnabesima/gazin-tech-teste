import {
  registerDecorator, Validate,
  ValidationArguments, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'requiresAtLeastOneProperty', async: false })
export class RequiresAtLeastOnePropertyConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;
    return Object.keys(object).some(
      key => object[key] !== undefined && object[key] !== null);
  }

  defaultMessage(args: ValidationArguments) {
    return 'At least one property must be provided for update.';
  }
}

export function RequiresAtLeastOneProperty(validationOptions?: ValidationOptions) {
  return function (target: any) {
    Validate(RequiresAtLeastOnePropertyConstraint, validationOptions)(target.prototype, '_placeholder');
  };
}
