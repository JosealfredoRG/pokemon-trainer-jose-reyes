import { Stat } from "./pokemon.model";

export interface Gen1Pokemon {
  id: number | string;
  name: string
  sprite: string
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  types: Array<string>
}
