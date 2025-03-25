import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gen1Pokemon } from 'src/app/core/models/gen1-pokemon.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { PokemonApiService } from 'src/app/core/services/pokemon-api.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.scss']
})
export class TeamSelectComponent implements AfterViewInit {
  pokemonList: Gen1Pokemon[] = [];
  groupedPokemonList: Gen1Pokemon[][] = [];
  selectedTeam: Gen1Pokemon[] = [];

  searchTerm: string = '';

  constructor(
    private pokeApi: PokemonApiService,
    private generalService: GeneralService,
    private cd: ChangeDetectorRef,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.pokeApi.getGen1PokemonWithSprites().subscribe(pokemons => {
      this.pokemonList = pokemons;
      this.groupedPokemonList = this.generateDataChunk(pokemons, 3);    
      this.generalService.showLoader$.emit(false);
      this.cd.detectChanges()
    });

  }

  onSearch(event: Event ): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim().toLowerCase();    
    this.searchTerm = value;    
  
    const filtered = this.pokemonList.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm) ||
      p.id.toString().includes(this.searchTerm)
    );

    console.log(filtered);
  
    this.groupedPokemonList = this.generateDataChunk(filtered, 3);
  }

  //? convert my pokemonList to an array of 3 elements each
  generateDataChunk(pokemons: Gen1Pokemon[], chunkSize = 3): Gen1Pokemon[][] {
    const chunks: Gen1Pokemon[][] = [];
    for (let i = 0; i < pokemons.length; i += chunkSize) {
      chunks.push(pokemons.slice(i, i + chunkSize));
    }
  
    return chunks;
  }

  toggleSelect(pokemon: Gen1Pokemon): void {
    const index = this.selectedTeam.findIndex(p => p.id === pokemon.id);
  
    if (index > -1) {
      this.selectedTeam.splice(index, 1); // deselect
    } else if (this.selectedTeam.length < 3) {
      this.selectedTeam.push(pokemon); // select
    }
  }

  isSelected(pokemon: Gen1Pokemon): boolean {
    return this.selectedTeam.some(p => p.id === pokemon.id);
  }

  isMaxSelected(): boolean {
    return this.selectedTeam.length >= 3;
  }

  saveSelection():void{
    this.pokeApi.savePokemonSelection(this.selectedTeam);
    
    //? Fake loading time
    this.generalService.showLoader$.emit(true);
    setTimeout(() => {
      this.router.navigate(['/summary']);
    }, 1000);
    
  }
}
