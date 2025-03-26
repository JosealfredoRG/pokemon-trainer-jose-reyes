import {  AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Gen1Pokemon } from 'src/app/core/models/gen1-pokemon.model';
import { PokemonSpec } from 'src/app/core/models/pokemon-species.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { PokemonApiService } from 'src/app/core/services/pokemon-api.service';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.scss']
})
export class TeamSummaryComponent implements AfterViewInit{
  selectedPokemons: Gen1Pokemon[] = [];

  readonly statMax = {
    hp: 255,
    attack: 190,
    defense: 230,
    specialAttack: 194,
    specialDefense: 230,
    speed: 180
  };

  pokemonSpeciesInfo!: PokemonSpec[];

  constructor(
    private generalService: GeneralService,
    private pokemonService: PokemonApiService,
    private cd: ChangeDetectorRef
    
  ) {}

  ngAfterViewInit(): void {
    //? load pokemons
    this.selectedPokemons = this.pokemonService.getPokemonSelection();
    this.cd.detectChanges()
    this.generalService.showLoader$.emit(false);
    
    //? load pokemon colors for stats
    this.pokemonService.getSelectedPokemonColor().subscribe((responses) => {
      this.pokemonSpeciesInfo = responses

    });
  }

  getColorByPokemonId(id:string | number):string {
    return this.pokemonSpeciesInfo?.find((ps)=> ps.id === parseInt(id.toString(),10))?.color.name ?? '';
  }
  

}
