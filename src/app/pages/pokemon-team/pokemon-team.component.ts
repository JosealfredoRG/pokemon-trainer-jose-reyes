import { Component } from '@angular/core';
import { ViewEnum } from 'src/app/core/models/view.enum';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent {
  currentView: ViewEnum = ViewEnum.Team;

}
