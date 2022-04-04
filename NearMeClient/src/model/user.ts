export class User {
    user_name:string = '';
    user_surname:string = '';
    user_email:string = '';
    user_phoneNumber:number = 0;
    user_password:string = '';
    user_password2:string = '';

    constructor(user_name:string = '', user_surname:string = '', user_email:string = '', user_phoneNumber:number = 0, user_password:string = '', user_password2:string = '') {
        this.user_name = user_name;
        this.user_surname = user_surname;
        this.user_email = user_email;
        this.user_phoneNumber = user_phoneNumber;
        this.user_password = user_password;
        this.user_password2 = user_password2;
    }
}