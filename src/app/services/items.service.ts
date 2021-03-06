import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../types/item.type';
import { PokedexService } from './pokedex.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  public allItems: Item[] = [];

  public isItemOnList(item: Item): boolean {
    return this.allItems.map((item) => item.id).includes(item.id);
  }

  public async fillItemsList(results: any): Promise<void> {
    for (let result of results) {
      let item = await this.http.get<Item>(result.url).toPromise();
      !this.isItemOnList(item) ? this.allItems.push(item) : '';
    }
  }

  public async getItemsList(): Promise<void> {
    const response = await this.pokedexService.P.getItemsList(
      this.pokedexService.itemsInterval
    );
    this.fillItemsList(response.results);
  }

  public loadItems(event: any): void {
    if (this.pokedexService.itemsInterval.limit < 250) {
      this.pokedexService.itemsInterval.limit += 40;
      this.getItemsList();
      setTimeout(() => {
        event.target.complete();
      }, 500);
    } else {
      event.target.complete();
    }
  }

  constructor(
    private pokedexService: PokedexService,
    private http: HttpClient
  ) {}
}
