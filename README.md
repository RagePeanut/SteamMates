# SteamMates
SteamMates is an Open-Source project that makes it easier than ever to find multiplayer and co-op games you and your friends have in common.

SteamMates lets you decide what kind of games you want to play thanks to these four filters: **Online Co-op**, **Online Multiplayer**, **Local Co-op** and **Local Multiplayer**.

## Demo
You can find a live demo of this project at the following address:
https://steammates.herokuapp.com/

## Preview
Here are some previews of what the interface currently looks like.
### Home page
![Home](https://res.cloudinary.com/hpiynhbhq/image/upload/v1518812969/utosaogojkefqaq2p5ru.png)
### Result page
![Result](https://res.cloudinary.com/hpiynhbhq/image/upload/v1518812846/n3ryxhmmazrfwynrrymo.png)

## Deploy
**Required:** [Git](https://git-scm.com/), [NPM](https://www.npmjs.com/), [Node.js](https://nodejs.org/), [Angular](https://angular.io/), a [Steam](http://store.steampowered.com/) account
If you wish to deploy your own version of SteamMates on your local machine or online, follow these steps carefully.
1. **Cloning**
```
git clone https://github.com/RagePeanut/SteamMates.git
```
2. **Getting and using your Steam dev API key**

Get your API key [here](https://steamcommunity.com/dev/apikey), the domain name can be anything, it doesn't matter. This key **cannot** be shown to anyone. Check the lines 6 and 7 of the **app.js** file to see what to do with it.

3. **Building the front-end**

This step should not be necessary with the current state of the project. However, if you encounter some problems with the front-end, try the following lines
```
cd steammates\public
npm install
ng build -prod
```
4. **Building the back-end**
```
cd ..
npm install
```
5. **Starting the app**

Check the lines 10 and 11 of the **app.js** file to see how to configure your port. Then just start the app !
```
npm start
```

## Special thanks to
* **Steam** for allowing web developers to query data from their service through their API. 
This API was used to easily get users informations (profiles and game libraries).
[Read more about it here.](https://developer.valvesoftware.com/wiki/Steam_Web_API)
* **SteamSpy** for allowing web developers to query data from their service through their API. This API was used to easily get lists of games by tags (Multiplayer, Local Multiplayer, Co-op, Local Co-op).
[Read more about it here.](https://steamspy.com/api.php)
* **My friends** for being so bad at finding games to play that it forced me to code this app.

## Social networks
**Steemit:** https://steemit.com/@ragepeanut

**Busy:** https://busy.org/@ragepeanut

**Twitter:** https://twitter.com/RagePeanut_

**Steam:** http://steamcommunity.com/id/ragepeanut/

### Follow me on [Steemit](https://steemit.com/@ragepeanut) or [Busy](https://busy.org/@ragepeanut) to be informed on the new releases and projects.
