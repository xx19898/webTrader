export default class User {
    
    private username: string;

    constructor(username: string){
        this.username = username;
    }
    public getName(): string{ 
        return this.username;
    }
}