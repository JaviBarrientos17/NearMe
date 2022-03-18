export class User{
    private user_id:number;
    private user_email:string = "";
    private user_password:string = "";
    // TODO SI DA PROBLEMAS CREO QUE ESTE CAMPO ES PORQUE SE AUTOGENERA
    private last_password_gen:string;
    // TODO SI DA PROBLEMAS POR DEFECTO userType es un tinyInt
    private user_type:number;

    constructor(user_id:number, user_email:string = "", user_password:string, last_password_gen:string, user_type:number){
        this.user_id = user_id;
        this.user_email = user_email;
        this.user_password = user_password;
        this.last_password_gen = last_password_gen;
        this.user_type = user_type;
    }

    /**
     * Getter $user_id
     * @return {number}
     */
	public get $user_id(): number {
		return this.user_id;
	}

    /**
     * Setter $user_id
     * @param {number} value
     */
	public set $user_id(value: number) {
		this.user_id = value;
	}

    /**
     * Getter $user_email
     * @return {string }
     */
	public get $user_email(): string  {
		return this.user_email;
	}

    /**
     * Setter $user_email
     * @param {string } value
     */
	public set $user_email(value: string ) {
		this.user_email = value;
	}

    /**
     * Getter $user_password
     * @return {string }
     */
	public get $user_password(): string  {
		return this.user_password;
	}

    /**
     * Setter $user_password
     * @param {string } value
     */
	public set $user_password(value: string ) {
		this.user_password = value;
	}

    /**
     * Getter $last_password_gen
     * @return {string}
     */
	public get $last_password_gen(): string {
		return this.last_password_gen;
	}

    /**
     * Setter $last_password_gen
     * @param {string} value
     */
	public set $last_password_gen(value: string) {
		this.last_password_gen = value;
	}

    /**
     * Getter $user_type
     * @return {number}
     */
	public get $user_type(): number {
		return this.user_type;
	}

    /**
     * Setter $user_type
     * @param {number} value
     */
	public set $user_type(value: number) {
		this.user_type = value;
	}
}