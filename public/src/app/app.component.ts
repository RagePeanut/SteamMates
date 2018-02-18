import { User } from './user.model';

import { SteamUsersService } from './steam-users.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tags = {
    'Online Co-op': true,
    'Online Multiplayer': true,
    'Local Co-op': true,
    'Local Multiplayer': true
  };
  state: boolean;
  playerID: string;
  playersIDs = [];
  players = [];

  constructor(private usersService: SteamUsersService) {}

  ngOnInit() {

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

  changeFiltersPointerEvents(newEvent: string) {
    document.getElementById('filters').style.pointerEvents = newEvent;
  }

  changeState() {
    this.state = !this.state;
  }

  setTags() {
    function setTagsState(state: boolean, tags: any) {
      tags[firstPart + ' Co-op'] = state;
      tags[firstPart + ' Multiplayer'] = state;
      return tags;
    }
    const firstPart = event.target['id'][0].toUpperCase() + event.target['id'].slice(1);
    // tslint:disable-next-line:max-line-length
    this.tags = setTagsState(!this.tags[firstPart + ' Co-op'] || !this.tags[firstPart + ' Multiplayer'], this.tags);
  }

  setParentCheckboxState() {
    const parentCheckbox = event.target['parentNode'].parentNode.parentNode.parentNode.children[0];
    const firstPart = parentCheckbox.id[0].toUpperCase() + parentCheckbox.id.slice(1);
    // tslint:disable-next-line:no-bitwise
    parentCheckbox.indeterminate = this.tags[firstPart + ' Co-op'] ^ this.tags[firstPart + ' Multiplayer'];
  }

  removePlayer() {
    // Getting the index from the hidden input
    let index = event.target['parentNode'].parentNode.firstElementChild.attributes.value.nodeValue;
    // Verifying that the index is possible
    if (index >= 0 && index < this.playersIDs.length) {
      // Removing the player from the players array
      const steamid = this.players[index].steamid;
      this.players.splice(index, 1);
      // Removing the steamid from the playersIDs array
      index = this.playersIDs.indexOf(steamid);
      this.playersIDs.splice(index, 1);
    }
  }

}
