import { encryptData } from "../../../helpers/encrypt";
import { FetchApi } from "../../../helpers/fetchApi"
import { MessageConsole } from "../../../helpers/messageConsole";

export const registerUser = async(name,email,password,role="2") =>{
    const userRegister = await FetchApi("http://localhost:3000/users",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name_user: name,
            email_user: email,
            password_user: encryptData(password),
            id_role: role
        })
    });
    if(!userRegister){
        MessageConsole("Error. User not register. Try again");
        return;
    }
    MessageConsole("Registered user ..");

}

export const getUsers = async(email) =>{
    const usersGet = await FetchApi("http://localhost:3000/users");
    const userFound = usersGet.find(user=> user.email_user === email);
    if(userFound){
        MessageConsole("Error. Registered user. Try again...");
        return;
    }
    return true;
}