import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Pokemon } from '../types/pokemon.type';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public allFavoritePokemon: Pokemon[] = [];

  constructor(private storage: Storage) {}

  public async loadFromStorage(): Promise<void> {
    const favoritePokemon = (await this.storage.get('favoritePokemon')) as Pokemon[];
    if (favoritePokemon && this.allFavoritePokemon.length < 1) {
      this.allFavoritePokemon.push(...favoritePokemon);
    }
  }

  public setStorage(): void {
    this.storage.set('favoritePokemon', this.allFavoritePokemon);
  }

  public handleFav(pokemonToFavorite: Pokemon): Pokemon[] {
    if (this.checkFav(pokemonToFavorite)) {
      this.allFavoritePokemon = this.allFavoritePokemon.filter(
        (favoritePokemon) => favoritePokemon.id !== pokemonToFavorite.id
      );
    } else {
      this.allFavoritePokemon.push(pokemonToFavorite);
    }
    this.setStorage();
    return this.allFavoritePokemon;
  }

  public checkFav(pokemonToCheck: Pokemon): boolean {
    return this.allFavoritePokemon.map((p) => p.id).includes(pokemonToCheck.id);
  }
}
