import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainerProfile } from 'src/app/core/models/trainer-profile.model';
import { TrainerProfileService } from 'src/app/core/services/trainer-profile.service';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements AfterViewInit {

  @Input() profileForm!: FormGroup;
  @Input() duiLabel:String = 'Carne de Minoridad';
  @Input() minDate = new Date();
  @Input() maxDate = new Date();
  @Input() duiMask = '';
  @Input() duiPlaceholder = '';
  
  hobbies: string[] = [
    'Jugar Fútbol',
    'Jugar Basquetball',
    'Jugar Tennis',
    'Jugar Voleibol',
    'Jugar Fifa',
    'Jugar Videojuegos'
  ];

  constructor(
    private generalService: GeneralService,
    private trainerProfileService: TrainerProfileService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {

  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.generalService.showLoader$.emit(true)
      this.trainerProfileService.saveProfile(this.profileForm.value);
      this.trainerProfileService.userName$.emit(this.profileForm.get('name')?.value)
      this.router.navigate(['/team']);      
    }
  }

  // Functions for removing a hobbie from the list
  removeHobby(): void {
    this.profileForm.get('hobby')?.setValue('');
  }

}
