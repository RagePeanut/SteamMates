import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SteamGamesService {

  constructor(private http: HttpClient) { }

  getGames(steamid: string) {

    const params = new HttpParams()
      .set('steamid', steamid);

    return this.http
      .get('/api/get_games', {params: params})
      .toPromise();

  }

  private getGamesByTag(tag: string) {

    const params = new HttpParams()
      .set('tag', tag);

    return this.http
      .get('/api/get_games_by_tag', {params: params})
      .toPromise();

  }

  async getGamesByTags(tags: string[]) {

    const gamesLists = [];
    let i = 0;

    for (const tag of tags) {
      gamesLists[i] = await this.getGamesByTag(tags[i]);
      i++;
    }

    return gamesLists;

  }

}
