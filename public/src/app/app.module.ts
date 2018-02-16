import { SteamUsersService } from './steam-users.service';
import { SteamGamesService } from './games/steam-games.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [
    SteamUsersService,
    SteamGamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
