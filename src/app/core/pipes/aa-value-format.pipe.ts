import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aaValueFormat'
})
export class AaValueFormatPipe implements PipeTransform {

  transform(value: number, assessmentArea?: string): any {
    if (value === null) {
      return '';
    }

    switch (assessmentArea) {
      case undefined:
      case 'Average teacher cost':
        let formatter = new Intl.NumberFormat('en-UK', {
          style: 'currency',
          currency: 'GBP',
        });
        return formatter.format(value);
      case 'Pupil to teacher ratio':
      case 'Pupil to adult ratio':
      case 'Teacher contact ratio (less than 1)':
      case 'Average Class size':
        return value?.toFixed(2);
      default:
        if (value === null || value === undefined) {
          return '';
        }
        return `${(value * 100).toFixed(1)}%`;
    }
  }

}
