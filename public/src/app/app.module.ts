import { SteamUsersService } from './steam-users.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { SteamGamesService } from './games/steam-games.service';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SteamUsersService,
    SteamGamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
