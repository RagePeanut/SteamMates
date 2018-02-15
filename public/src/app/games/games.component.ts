import { Component, OnInit, Input} from '@angular/core';
import { SteamGamesService } from './steam-games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  gamesReady = false;
  objectKeys = Object.keys;
  shownGames = {};
  games = [];
  @Input() players = [];
  @Input() filters: {
    online: boolean,
    lan: boolean,
    multiplayer: boolean,
    'co-op': boolean
  };

  constructor(private gamesService: SteamGamesService) {}

  ngOnInit() {

    const tags = [];
    // If online and lan are unchecked, the final result should be the same as both checked
    if (this.filters.online === false && this.filters.lan === false) {
      this.filters.online = true;
      this.filters.lan = true;
    }
    // If multiplayer and co-op are unchecked, the final result should be the same as both checked
    if (this.filters.multiplayer === false && this.filters['co-op'] === false) {
      this.filters.multiplayer = true;
      this.filters['co-op'] = true;
    }
    // Pushing the corresponding tags to the tags array
    if (this.filters.online) {
      if (this.filters.multiplayer) {
        tags.push('Multiplayer');
      }
      if (this.filters['co-op']) {
        tags.push('Co-op');
      }
    }
    if (this.filters.lan) {
      if (this.filters.multiplayer) {
        tags.push('Local Multiplayer');
      }
      if (this.filters['co-op']) {
        tags.push('Local Co-op');
      }
    }
    // Starting by querying for X lists of games by tags
    this.gamesService
      .getGamesByTags(tags)
      .then(
        (gamesLists: Object[]) => {
          // Get the games owned by each player
          for (let p = 0; p < this.players.length; p++) {

            this.gamesService
              .getGames(this.players[p]['steamid'])
              .then(
                (result: Object) => {

                  this.games = result['response']['games'];
                  // For each game owned by the player
                  for (let i = 0; i < result['response']['game_count']; i++) {

                    const appid = this.games[i]['appid'];
                    let contained: boolean;
                    let j = 0;

                    // Check if the game is already in the shown games
                    if (appid in this.shownGames) {
                      this.shownGames[appid]['players'][p] = true;
                      this.shownGames[appid]['player_count']++;
                    } else {
                      // Check if the game is in one of the games lists
                      do {
                        contained = gamesLists[j].hasOwnProperty(appid);
                        j++;
                      } while (!contained && j < gamesLists.length);
                      // If it is, add it to the games to show
                      if (contained) {
                        this.shownGames[appid] = this.games[i];
                        this.shownGames[appid]['players'] = Array(this.players.length).fill(false);
                        this.shownGames[appid]['players'][p] = true;
                        this.shownGames[appid]['player_count'] = 1;
                      }
                    }

                  }

                }
              );

          }

        }
      );

  }

  // Returns an array of games sorted by number of players owning them
  getSortedGames() {

    const arr = Object.values(this.shownGames);

    arr.sort(this.compareGames);

    this.gamesReady = arr.length !== 0;

    return arr;

  }

  compareGames(a: Object, b: Object) {
    return b['player_count'] - a['player_count'];
  }

}
