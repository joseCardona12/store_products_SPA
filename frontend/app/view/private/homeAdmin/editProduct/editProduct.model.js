import { FetchApi } from "../../../../helpers/fetchApi"
import { MessageConsole } from "../../../../helpers/messageConsole"

export const editProduct = async(idProduct, name,url,description,priceBefore,price) =>{
    const productEdit = await FetchApi(`http://localhost:3000/products/${idProduct}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idProduct,
            name_product: name,
            url_product: url,
            description_product: description,
            price_before_product: priceBefore,
            price_product: price
        })
    })

    if(!productEdit){
        MessageConsole("Error to update the product. Try again...");
        return;
    }
    MessageConsole("Update product...");
    return;
}

export const getProductForId = async(idProduct) =>{
    const productForIdGet = await FetchApi(`http://localhost:3000/products/${idProduct}`);
    if(!productForIdGet){
        MessageConsole("Error. Product not found...");
        return;
    }
    return productForIdGet;
}