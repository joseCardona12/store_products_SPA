import { MessageConsole } from "./messageConsole";

export const FetchApi = async(url,options) =>{
    const response = await fetch(url,options);
    if(!response.ok){
        MessageConsole("Error. Response not ok. Try again!...");
        return;
    }
    const data = await response.json();
    return data;
}