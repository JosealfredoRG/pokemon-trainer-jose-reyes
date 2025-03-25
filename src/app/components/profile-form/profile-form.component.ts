import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngAfterViewInit(): void {

  }

  onSubmit(): void {
    if (this.profileForm.valid) {

      //? Emmitters
      this.generalService.showLoader$.emit(true);
      this.trainerProfileService.userName$.emit(this.profileForm.get('name')?.value);

      //? store form data into localstorage
      this.trainerProfileService.saveProfile(this.profileForm.value);
      this.router.navigate(['/team']);      
    }
  }

  //? clear hoby selection
  removeHobby(): void {
    this.profileForm.get('hobby')?.setValue('');
  }

}
