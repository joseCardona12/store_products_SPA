import { NavigateTo } from "../../../Router";
import { deleteProduct, getProducts } from "./homeAdmin.model"
import styles from './homeAdmin.styles.css';

export const HomeAdminView = () =>{
    const pageContentPrivate = 
    `
    <section class="${styles["container-products"]}" id="coontainer-products">
        <div class="${styles["products-title"]}">
            <h1 class="title">Available Products</h1>
        </div>
        <div class="${styles["products"]}" id="products">
        
        </div>
        <button class="${styles["products-create"]} btn btn-success" id="createProduct">
            <i class="bi bi-bag-plus-fill"></i>
            Create product
        </button>
    </section>
    `
    const logicPageContentPrivate = async() =>{
        const $containerProducts = document.getElementById("products");
        const productsGet = await getProducts(); //Obtain all products
        showProductsHtml($containerProducts,productsGet); // Show products html

        //Logic for button update and remove of the articles
        const $footerButtons = document.querySelectorAll(`.${styles["footer-button"]}`);
        const $createProduct = document.getElementById("createProduct");
        $footerButtons.forEach(button=>{
            button.addEventListener("click", async()=>{
                const idProduct = button.getAttribute("id");
                if(button.textContent === "Update"){
                    NavigateTo(`/dashboard-admin/edit-product?id=${idProduct}`); //Send id for url. Method get
                    return;
                }
                if(button.textContent === "Remove"){
                    console.log(idProduct)
                    const confirmDelete = confirm("Do you want delete the product?");
                    if(!confirmDelete){
                        console.log("false");
                        return;
                    }
                    await deleteProduct(idProduct); //Delete product
                    NavigateTo("/dashboard-admin");
                }
            })
        })

        $createProduct.addEventListener("click", ()=>{
            NavigateTo(`/dashboard-admin/create-product`);
            return;
        })
    }
    return {
        pageContentPrivate,
        logicPageContentPrivate
    }
}

function showProductsHtml($containerProduct,productsGet) {
    $containerProduct.innerHTML = 
    `
        ${productsGet.map(product=>
            `
            <article class="${styles["products-article"]} card">
                <div class="${styles["article-header"]} card-header" >
                    <img src="${product.url_product}"></img>
                    <h4 class="${styles["header-title"]}">${product.name_product}</h4>
                </div>
                <div class="${styles["article-body"]} card-body">
                    <p class="${styles["body-paragraph"]}">${product.description_product}</p>
                    <span class="${styles["body-price"]}">${new Intl.NumberFormat("es-CO").format(parseFloat(product.price_before_product))}</span>
                    <span class="${styles["body-price"]}">${new Intl.NumberFormat("es-CO").format(parseFloat(product.price_product))}</span>
                </div>
                <div class="${styles["article-footer"]} card-footer">
                    <button class="${styles["footer-button"]} btn btn-primary" id="${product.id}">Update</button>
                    <button class="${styles["footer-button"]} btn btn-danger" id="${product.id}">Remove</button>
                </div>
            </article>
            
            `
        ).join("")}
    `
}