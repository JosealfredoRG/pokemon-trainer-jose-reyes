import {  Component, OnInit } from '@angular/core';
import { Gen1Pokemon } from 'src/app/core/models/gen1-pokemon.model';
import { PokemonApiService } from 'src/app/core/services/pokemon-api.service';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.scss']
})
export class TeamSummaryComponent implements OnInit{
  selectedPokemons: Gen1Pokemon[] = [];

  readonly statMax = {
    hp: 255,
    attack: 190,
    defense: 230,
    specialAttack: 194,
    specialDefense: 230,
    speed: 180
  };

  constructor(private pokemonService: PokemonApiService) {}

  ngOnInit(): void {
    this.selectedPokemons = this.pokemonService.getPokemonSelection();
  }
  

}
