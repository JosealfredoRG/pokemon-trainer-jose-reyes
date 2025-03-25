import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ViewEnum } from '../../core/models/view.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator, fileToBase64 } from 'src/app/shared/utils';
import { TrainerProfileService } from 'src/app/core/services/trainer-profile.service';
import { TrainerProfile } from 'src/app/core/models/trainer-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentView: ViewEnum = ViewEnum.Profile;
  selectedImage: string | null = null;
  profileForm!: FormGroup;
  duiLabel:String = 'Carne de Minoridad';
  duiMask = '';
  duiPlaceholder = '';

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private trainerProfileService: TrainerProfileService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //? Initialize profile form
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      profileImg: ['', [Validators.required]],
      profileImgName: ['', []],
      hobby: [''],
      birthdate: ['', [Validators.required, dateRangeValidator(this.minDate, this.maxDate)]],
      isAdult: ['', []],
      dui: ['', ]
    });
  
    //? Subscribe to birthdate changes
    this.birthdateValueChanges();
    
    //? Subscribe to birthdate changes
    this.onImageSelected();

    //? Load Stored data if it exists
    this.checkStoredProfile();
  }

  checkStoredProfile():void {
    const storedProfile: TrainerProfile = this.trainerProfileService.getProfile();
    if (storedProfile) {
      this.profileForm.patchValue(storedProfile);
      this.profileForm.updateValueAndValidity();      
      this.cd.detectChanges();
    }
  }

  onImageSelected() {
    this.trainerProfileService.imageChange$.subscribe((image: File) => {
      console.log('image', image);
      fileToBase64(image).then((base64) => {
        this.profileForm.get('profileImg')?.setValue(base64);
        this.profileForm.get('profileImgName')?.setValue(image.name);
      });
      
    });
  }
  
  birthdateValueChanges() {
    this.profileForm.get('birthdate')?.valueChanges.subscribe((birthdate: string | Date) => {
      const duiControl = this.profileForm.get('dui');
    
      //? Check if the user age is over 18
      if (this.isAdult(birthdate)) {
        this.duiLabel = 'DUI';
        this.duiMask = '00000000-0';
        this.duiPlaceholder = '########-#';
        this.profileForm.get('isAdult')?.setValue(true);
        duiControl?.setValidators(Validators.required);
      } else {
        this.duiLabel = 'Carnet de Minoridad';
        this.duiMask = '';
        this.duiPlaceholder = '';
        this.profileForm.get('isAdult')?.setValue(false);
        duiControl?.clearValidators();
      }
    
      duiControl?.updateValueAndValidity();
    });
  }
  
  //? Helper Function to check if user is over 18
  isAdult(birthdate: string | Date): boolean {
    if (!birthdate) return false;
  
    const dob = new Date(birthdate);
    const today = new Date();
  
    let age = today.getFullYear() - dob.getFullYear();  
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
  
    // If birthday hasn't occurred yet this year, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    return age >= 18;
  }
  

}
