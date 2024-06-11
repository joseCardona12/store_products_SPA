import { decryptData } from "../../../helpers/encrypt";
import { FetchApi } from "../../../helpers/fetchApi"
import { MessageConsole } from "../../../helpers/messageConsole";

export const verifyExistsUser = async(email,password) =>{
    const usersGet = await FetchApi("http://localhost:3000/users");
    const userFound = usersGet.find(user=> user.email_user === email && decryptData(user.password_user) === password);
    if(!userFound){
        MessageConsole("Error. User not found...");
        return [false,2];
    }
    MessageConsole("User found...");
    console.log("Loading...");
    return [true,userFound.id_role];
}