export class User {
    email:string = '';
    name:string = '';
    surname:string = '';
    phoneNumber:number = 0;
    password:string = '';

    constructor(email:string = '', name:string = '', surname:string = '', phoneNumber:number = 0, password:string = '') {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}