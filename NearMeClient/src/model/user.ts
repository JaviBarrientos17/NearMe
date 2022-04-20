export class User {
    username:string = '';
    email:string = '';
    name:string = '';
    surname:string = '';
    phone:number = 0;
    password:string = '';

    constructor(email:string = '', name:string = '', surname:string = '', phone:number = 0, password:string = '') {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.password = password;
    }
}