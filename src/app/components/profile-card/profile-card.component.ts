import { Component, EventEmitter, Output, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TrainerProfileService } from 'src/app/core/services/trainer-profile.service';
import { ViewEnum } from 'src/app/core/models/view.enum';
import { TrainerProfile } from 'src/app/core/models/trainer-profile.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements AfterViewInit{
  @Input() currentView: ViewEnum = ViewEnum.Profile;
  ViewEnum = ViewEnum; 
  imgName:String = "Adjunta una foto";
  imageSrc: string | null = null;
  fileSelected: string | null = null;
  trainerProfile:TrainerProfile | undefined;
  duiLabel:String = 'Carne de Minoridad';

  constructor(
    private trainerProfileService: TrainerProfileService,
    private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // check if there is an image stored in local storage
    const trainerProfile = this.trainerProfileService.getProfile();
    if (trainerProfile) {
      this.trainerProfile = trainerProfile;
      this.imageSrc = trainerProfile.profileImg;
      this.imgName = trainerProfile.profileImgName;
      this.cd.detectChanges();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;    
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    this.imgName = file.name;
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.cd.detectChanges();
    };

    this.trainerProfileService.imageChange$.emit(file);
    reader.readAsDataURL(file);
  }

  calculateAge(): string {
    const trainerBirthDate = this.trainerProfile?.birthdate;
    if (!trainerBirthDate) return '';
  
    const birthdate = new Date(trainerBirthDate);
    const today = new Date();
  
    let age = today.getFullYear() - birthdate.getFullYear();
  
    const hasNotHadBirthdayThisYear =
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate());
  
    if (hasNotHadBirthdayThisYear) {
      age--;
    }
  
    return `${age} años`;
  }
  
}
