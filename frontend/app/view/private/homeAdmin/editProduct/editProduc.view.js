import { NavigateTo } from "../../../../Router";
import { MessageConsole } from "../../../../helpers/messageConsole";
import { verifyForm } from "../../../../helpers/verifyForm";
import { editProduct, getProductForId } from "./editProduct.model";

export const EditProductView = () => {
    const pageContentPrivate = 
    `
    <form class="edit-form" id="formEdit">
        
    </form>
    
    `;
    const logicPageContentPrivate = async() =>{
        const $formEdit = document.getElementById("formEdit"); //Obtain form element
        const urlParams = new URLSearchParams(window.location.search); // new instance url search for obtain id
        const idProduct = urlParams.get("id"); // Obtain id of params

        const productForIfGet = await getProductForId(idProduct); // Obtain product for Id
        showContentFormHtml($formEdit,productForIfGet); // Show content of form or inject elements

        //Lofic form edit
        $formEdit.addEventListener("submit",async(e)=>{
            e.preventDefault();
            const $nameProduct = document.getElementById("nameEdit");
            const $urlProduct = document.getElementById("urlEdit");
            const $descriptionProduct = document.getElementById("descriptionEdit");
            const $priceBeforeProduct = document.getElementById("priceBeforeEdit");
            const $priceProduct = document.getElementById("priceEdit");

            const formVerify = verifyForm($nameProduct.value, $urlProduct.value, $descriptionProduct.value,
                                            $priceBeforeProduct.value, $priceProduct.value);
            if(!formVerify){
                MessageConsole("Fill all fields. Try again!...");
                return;
            }
            await editProduct(idProduct, $nameProduct.value, $urlProduct.value, $descriptionProduct.value,
                                $priceBeforeProduct.value, $priceProduct.value);
            NavigateTo("/dashboard-admin");
            return;
        })
    }
    return {
        pageContentPrivate,
        logicPageContentPrivate
    }
}

function showContentFormHtml($formEdit,productForIfGet){ // Add content to form 
    const {id, name_product,url_product,description_product,price_before_product, price_product} = productForIfGet;
    $formEdit.innerHTML = 
    `
    <div class="form-title">
        <h2 class="title">Edit Product</h2>
    </div>
    <div class="form-name">
        <label class="name-label form-label" for="name">Name:</label>
        <input class="name-input form-control" type="text" name="name" id="nameEdit" value="${name_product}">
    </div>
    <div class="form-url">
        <label class="url-label form-label" for="url">Url:</label>
        <input class="url-input form-control" type="text" name="url" id="urlEdit" value="${url_product}">
    </div>
    <div class="form-description">
        <label class="description-label form-label" for="description">Description:</label>
        <textarea class="description-textarea form-control" name="description" id="descriptionEdit">${description_product}</textarea>
    </div>
    <div class="form-price-before">
        <label class="price-before-label form-label" for="price-before">Price before:</label>
        <input class="price-before-input form-control" type="number" name="price-before" id="priceBeforeEdit" value="${price_before_product}">
    </div>
    <div class="form-price">
        <label class="price-label form-label" for="price">Price:</label>
        <input class="price-input form-control" type="number" name="price" id="priceEdit" value="${price_product}">
    </div>
    <input class="form-button btn btn-success mt-2" type="submit" id="buttonUpdate" value="Update">
    `
}