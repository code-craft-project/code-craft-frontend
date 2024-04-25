import { createContext } from "react";

export default createContext<UserSession>({
    access_token: '',
    user: {
        username:'',
        first_name:'',
        last_name:'',
        email:'',
        password:''
    }
});
