import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDui'
})
export class FormatDuiPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 9
      ? `${cleaned.slice(0, 8)}-${cleaned.slice(8)}`
      : value;
  }

}
