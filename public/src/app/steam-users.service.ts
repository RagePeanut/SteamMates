import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SteamUsersService {

  constructor(private http: HttpClient) { }

  private getSteamID64(user: string) {

    const params = new HttpParams()
      .set('customurl', user);

    return this.http
      .get('/api/get_steamid64', {params: params})
      .toPromise();

  }

  getUser(userID: string) {

    userID = userID.replace(/^.*\/([^\/]+)\/?$/, '$1');
    userID = userID.replace(/\//g, '');

    // Converting the result to a steamid64
    return this.getSteamID64(userID).then(

      (result: Object) => {

        const response = result['response'];

        switch (response['success']) {
          // The vanityurl has been successfully turned into a steamid64
          case 1:
            userID = response['steamid'];
            break;
          // Assuming that we were already dealing with a steamid64
          case 42:
            break;
          // The userID was an empty string
          case 0:
            console.log(response['message']);
            break;
          default:
            console.log('Unknown error');
        }

        return userID;

      }


    );

  }

  getUsersInformations(steamids64: string[] | number[]) {

    const params = new HttpParams()
      .set('steamids', steamids64.join());

    return this.http
      .get('/api/get_users', {params: params})
      .toPromise();

  }

}
