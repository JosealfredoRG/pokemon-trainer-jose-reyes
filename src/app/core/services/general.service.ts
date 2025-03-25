import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  showLoader$ = new EventEmitter<Boolean>();

  constructor() { }
}
