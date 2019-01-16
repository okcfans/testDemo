import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the EmptyStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'emptyString',
})
export class EmptyStringPipe implements PipeTransform {
  transform(value: string) {
    return (value === '' || value === undefined) ? '-' : value;
  }
}
