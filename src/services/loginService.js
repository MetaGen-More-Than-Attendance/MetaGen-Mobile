import axios from "axios"


export default class loginService {

    login(loginRequest) {
        return axios.post("https://meta-gen.herokuapp.com/login", loginRequest);
    };

}
