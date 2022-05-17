export class User {
    id: string;
    username: string;
    idErp: string;
    token: string;
    loginAs?: string;
    loginAsManager?: string;
    name?: string;
    surname?: string;

    constructor(id: string, username: string, idErp: string, token: string, loginAs?: string, loginAsManager?: string, name?: string, surname?: string) {
        this.id = id;
        this.username = username;
        this.idErp = idErp;
        this.token = token;
        this.loginAs = loginAs;
        this.loginAsManager = loginAsManager;
        this.name = name;
        this.surname = surname;
    }



}
