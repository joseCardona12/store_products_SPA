import { NavigateTo } from "../../../../Router";
import { MessageConsole } from "../../../../helpers/messageConsole";
import { verifyForm } from "../../../../helpers/verifyForm";
import { createProduct } from "./createProduct.model";

export const CreateProductView = () =>{
    const pageContentPrivate = 
    `
    <form class="edit-form" id="formCreate">
        <div class="form-title">
            <h2 class="title">Create Product</h2>
        </div>
        <div class="form-name">
            <label class="name-label form-label" for="name">Name:</label>
            <input class="name-input form-control" type="text" name="name" id="nameCreate">
        </div>
        <div class="form-url">
            <label class="url-label form-label" for="url">Url:</label>
            <input class="url-input form-control" type="text" name="url" id="urlCreate">
        </div>
        <div class="form-description">
            <label class="description-label form-label" for="description">Description:</label>
            <textarea class="description-textarea form-control" name="description" id="descriptionCreate"></textarea>
        </div>
        <div class="form-price-before">
            <label class="price-before-label form-label" for="price-before">Price before:</label>
            <input class="price-before-input form-control" type="number" name="price-before" id="priceBeforeCreate">
        </div>
        <div class="form-price">
            <label class="price-label form-label" for="price">Price:</label>
            <input class="price-input form-control" type="number" name="price" id="priceCreate">
        </div>
        <input class="form-button btn btn-success mt-2" type="submit" id="buttonCreate" value="Create">
    </form>
    
    `;
    const logicPageContentPrivate = () =>{
        const $formCreate = document.getElementById("formCreate");
        $formCreate.addEventListener("click", async(e)=>{
            e.preventDefault();
            const $nameProduct = document.getElementById("nameCreate");
            const $urlProduct = document.getElementById("urlCreate");
            const $descriptionProduct = document.getElementById("descriptionCreate");
            const $priceBeforeProduct = document.getElementById("priceBeforeCreate");
            const $priceProduct = document.getElementById("priceCreate");
            
            const formVerify = verifyForm($nameProduct.value, $urlProduct.value, $descriptionProduct.value,
                                          $priceBeforeProduct.value, $priceProduct.value);
            if(!formVerify){
                MessageConsole("Fill all fields. Please. Try again!");
                return;
            }
            await createProduct($nameProduct.value, $urlProduct.value, $descriptionProduct.value,
                                $priceBeforeProduct.value, $priceProduct.value);
            NavigateTo("/dashboard-admin");
        })
    }
    return {
        pageContentPrivate,
        logicPageContentPrivate
    }
}