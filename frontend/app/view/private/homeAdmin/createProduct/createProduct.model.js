import { FetchApi } from "../../../../helpers/fetchApi"
import { MessageConsole } from "../../../../helpers/messageConsole"

export const createProduct = async(name, url, description, priceBefore, price) =>{
    const productCreate = await FetchApi("http://localhost:3000/products",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name_product: name,
            url_product: url,
            description_product: description,
            price_before_product: priceBefore,
            price_product: price
        })
    })
    if(!productCreate){
        MessageConsole("Error to create product. Try again!");
        return;
    }
    MessageConsole("Product create correctly...");
    
}