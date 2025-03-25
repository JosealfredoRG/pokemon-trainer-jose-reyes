import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerProfile } from 'src/app/core/models/trainer-profile.model';
import { ViewEnum } from 'src/app/core/models/view.enum';
import { TrainerProfileService } from 'src/app/core/services/trainer-profile.service';

@Component({
  selector: 'app-pokemon-team-summary',
  templateUrl: './pokemon-team-summary.component.html',
  styleUrls: ['./pokemon-team-summary.component.scss']
})
export class PokemonTeamSummaryComponent implements OnInit{

  currentView: ViewEnum = ViewEnum.Summary;
  trainerProfile!: TrainerProfile;

  constructor(
    private trainerService: TrainerProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.trainerProfile = this.trainerService.getProfile();
  }

}
