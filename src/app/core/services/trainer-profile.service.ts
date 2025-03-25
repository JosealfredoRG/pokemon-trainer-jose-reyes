import { EventEmitter, Injectable } from '@angular/core';

const STORAGE_KEY = 'trainerProfile';

@Injectable({
  providedIn: 'root'
})
export class TrainerProfileService {
  imageChange$ = new EventEmitter<File | null>();
  userName$ = new EventEmitter<String>();

  constructor() { }

  //? Save trainer profile form data to local storage
  saveProfile(profile: any): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  //? Get trainer profile form data from local storage
  getProfile(): any | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  //? Clear trainer profile form data from local storage
  clearProfile(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
