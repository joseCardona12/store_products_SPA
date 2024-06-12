import { FetchApi } from "../../../helpers/fetchApi"
import { MessageConsole } from "../../../helpers/messageConsole"

export const addShopping = async(id_product,idUser = "0", quantityProduct = 1) =>{
    const shoppingAdd = await FetchApi("http://localhost:3000/shopping",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date_shopping: new Date(),
            quantity_product: quantityProduct,
            id_user: idUser,
            id_product: id_product 
        })
    })

    if(!shoppingAdd){
        MessageConsole("Error to add shopping. Try again!");
        return;
    }

    MessageConsole("Add shopping correctly");
}

export const getShopping = async(idProduct) =>{
    const shoppingGet = await FetchApi("http://localhost:3000/shopping");
    const shoppingFound = shoppingGet.find(shopping=> shopping.id_product === idProduct);
    if(!shoppingFound){
        MessageConsole("Product not found");
        return [false,0];
    }
    return [true,shoppingFound.id];

}

// export const updateQuantityShopping = async(idShopping,quantityShopping = 1) =>{
//     const quantityShoppingUpdate = await FetchApi(`http://localhost:3000/shopping/${idShopping}`,{
//         method: "PATCH",
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             quantity_product: quantityShopping
//         })
//     })

//     if(!quantityShoppingUpdate){
//         MessageConsole("Error to update quantity shopping");
//         return;
//     }
//     MessageConsole("Updated quantity correctly");
// }
