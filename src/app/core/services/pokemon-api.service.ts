import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Gen1Pokemon } from '../models/gen1-pokemon.model';
import { Pokemon, pokemonType, Stat } from '../models/pokemon.model';
import { PokemonGeneration, PokemonSpecies } from '../models/gen.model';
import { GeneralService } from './general.service';

const GEN1_CACHE_KEY = 'gen1PokemonCache';
const POKEMON_SELECTION_CACHE_KEY = 'PokemonSelectionCache';


@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) { }
  
  //? Get the first generation of Pokemons, then for each pokemon retrieve its id, name and sprite
  getGen1PokemonWithSprites(): Observable<Gen1Pokemon[]> {
    this.generalService.showLoader$.emit(true);

    //? Store it in local storage to avoid multiple requests
    const cached = localStorage.getItem(GEN1_CACHE_KEY);
    if (cached) {
      return of(JSON.parse(cached));
    }

    //? First retrieve all pokemons from the first generation
    return this.http.get<PokemonGeneration>('https://pokeapi.co/api/v2/generation/1').pipe(
      switchMap(res => {

        //? Create an array with the names of the pokemons
        const names = res.pokemon_species.map((p: PokemonSpecies) => p.name);

        //? For each pokemon, create a http get request and define the response
        const requests = names.map((name:String) =>
          this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
            map((pokemon) => {

              const hp = pokemon.stats.find((s: Stat) => s.stat.name === 'hp')?.base_stat || 0;
              const attack = pokemon.stats.find((s: Stat) => s.stat.name === 'attack')?.base_stat || 0;
              const defense = pokemon.stats.find((s: Stat) => s.stat.name === 'defense')?.base_stat || 0;
              const specialAttack = pokemon.stats.find((s: Stat) => s.stat.name === 'special-attack')?.base_stat || 0;
              const specialDefense = pokemon.stats.find((s: Stat) => s.stat.name === 'special-defense')?.base_stat || 0;
              const speed = pokemon.stats.find((s: Stat) => s.stat.name === 'speed')?.base_stat || 0;
              const types = pokemon.types.map((t: pokemonType) => t.type.name );


              return {
                id: pokemon.id.toString().padStart(3, '0'),
                name: pokemon.name,
                sprite: pokemon.sprites.other.home.front_default || '',                
                hp,
                attack,
                defense,
                specialAttack,
                specialDefense,
                speed,
                types
              }
            })
          )
        );

        //? Combine all pokemon info requests and store the result in local storage
        return forkJoin(requests).pipe(
          map((pokemonList: Gen1Pokemon[]) => {
            const sortedPokemonList = pokemonList.sort((a, b) => +a.id - +b.id);
            localStorage.setItem(GEN1_CACHE_KEY, JSON.stringify(sortedPokemonList));
            return sortedPokemonList;
          })
        );
      })
    );
  }

  savePokemonSelection(pokemons: Gen1Pokemon[]) {
    localStorage.setItem(POKEMON_SELECTION_CACHE_KEY, JSON.stringify(pokemons));
  }

  getPokemonSelection():Gen1Pokemon[] {
    const pokeSelec = localStorage.getItem(POKEMON_SELECTION_CACHE_KEY) ;
    if (pokeSelec) {
      return JSON.parse(pokeSelec);
    }else{
      return []
    }
  }

  getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
