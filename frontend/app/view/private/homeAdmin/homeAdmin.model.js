import { FetchApi } from "../../../helpers/fetchApi"
import { MessageConsole } from "../../../helpers/messageConsole";

export const getProducts = async()=>{
    const productsGet = await FetchApi("http://localhost:3000/products");
    if(!productsGet){
        MessageConsole("Error with get products...");
        return;
    }
    return productsGet;
}

export const deleteProduct = async(idProduct)=>{
    const productDelete = await FetchApi(`http://localhost:3000/products/${idProduct}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    })
    if(!productDelete){
        MessageConsole("Error delete product. Try again!");
        return;
    }
    MessageConsole("Delete product correctly...");
}