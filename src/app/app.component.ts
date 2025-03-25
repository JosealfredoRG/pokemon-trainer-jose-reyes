import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerProfileService } from './core/services/trainer-profile.service';
import { TrainerProfile } from './core/models/trainer-profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pokemon-trainer-jose-reyes';
  userName:string = ''; 
  
  constructor(
    private router: Router,
    private trainerProfileService: TrainerProfileService,
  ) {}

  ngOnInit(): void {
    const storedProfile:TrainerProfile = this.trainerProfileService.getProfile();
    if(this.trainerProfileService.getProfile()){
      this.userName = storedProfile.name
    }
      this.trainerProfileService.userName$.subscribe((name: string) => {
        this.userName = name;
      });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    
  }

}
