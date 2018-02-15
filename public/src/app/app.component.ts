import { User } from './user.model';

import { SteamUsersService } from './steam-users.service';

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('analyze') analyze: ElementRef;

  filters = {
    online: true,
    lan: true,
    multiplayer: true,
    'co-op': true
  };
  state: boolean;
  playerID: string;
  playersIDs = [];
  players = [];

  constructor(private usersService: SteamUsersService) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    document.getElementById('filters').style.width = this.analyze.nativeElement.offsetWidth + 'px';
  }

  addPlayer() {

    if (!this.playersIDs.includes(this.playerID)) {
      this.usersService
      .getUser(this.playerID)
      .then(
        (steamid: string) => {
          // If the steamid is not a number, then the user doesn't exist
          if (isNaN(parseFloat(steamid))) {
            console.log('User doesn\'t seem to exist');
          } else {
            this.playersIDs.push(steamid);
          }
          this.usersService
            .getUsersInformations(this.playersIDs)
            .then(
              (result: Object) => {
                // If the players array is empty, then there are no users
                const playersJSON = result['response']['players'];
                for (let i = 0; i < playersJSON.length; i++) {
                  const player = playersJSON[i];
                  // tslint:disable-next-line:max-line-length
                  this.players[i] = new User(player['avatar'], player['avatarfull'], player['avatarmedium'], player['personaname'], player['personastate'], player['profileurl'], player['steamid']);
                }
              }
          );
        }
      );
    }
    this.playerID = '';

  }

  changeState() {

    this.state = !this.state;

  }

}
