export class User{
    user_id:number;
    user_email:string = "";
    user_password:string = "";
    // TODO SI DA PROBLEMAS CREO QUE ESTE CAMPO ES PORQUE SE AUTOGENERA
    last_password_gen:string;
    // TODO SI DA PROBLEMAS POR DEFECTO userType es un tinyInt
    user_type:number;

    constructor(user_id:number, user_email:string = "", user_password:string, last_password_gen:string, user_type:number){
        this.user_id = user_id;
        this.user_email = user_email;
        this.user_password = user_password;
        this.last_password_gen = last_password_gen;
        this.user_type = user_type;
    }
}