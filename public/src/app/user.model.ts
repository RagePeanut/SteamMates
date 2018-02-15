export class User {

    avatar: string;
    avatarfull: string;
    avatarmedium: string;
    personaname: string;
    personastate: number;
    profileurl: string;
    steamid: string;

    constructor(avatar: string,
                avatarfull: string,
                avatarmedium: string,
                personaname: string,
                personastate: number,
                profileurl: string,
                steamid: string) {
        this.avatar = avatar;
        this.avatarfull = avatarfull;
        this.avatarmedium = avatarmedium;
        this.personaname = personaname;
        this.personastate = personastate;
        this.profileurl = profileurl;
        this.steamid = steamid;
    }

}
