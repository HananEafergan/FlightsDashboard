import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: false
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    if (minutes == null || isNaN(minutes)) {
      return '';
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  }
}
