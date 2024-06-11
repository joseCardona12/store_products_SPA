import { Router } from "./Router";

export const App = () =>{
    const root = document.getElementById("root"); //Obtain element root. This is div and file index.html
    if(!root){ //If not exist element root, execute message error and finish program
        console.log({message: "Error: Root not found"});
        return;
    }
    Router(); //If exist element, execute Function Router
}