export default class userDTO {
    constructor(user){
        this.first_name = user.name,
        this.las_name = user.last_name,
        this.email = user.email;
    }
}