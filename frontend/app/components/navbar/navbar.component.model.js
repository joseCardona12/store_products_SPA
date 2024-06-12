import { FetchApi } from "../../helpers/fetchApi"
import { MessageConsole } from "../../helpers/messageConsole";

export const getUserForId = async(idUser) =>{
    const userForIdGet = await FetchApi(`http://localhost:3000/users/${idUser}`);
    if(!userForIdGet){
        MessageConsole("Error. User not found");
        return;
    }
    MessageConsole("User found");
    return userForIdGet;
}