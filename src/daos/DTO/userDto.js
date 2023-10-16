export default class userDTOResp {
    constructor(user){
        this.first_name = user.first_name,
        this.las_name = user.last_name,
        this.email = user.email;
    }
}