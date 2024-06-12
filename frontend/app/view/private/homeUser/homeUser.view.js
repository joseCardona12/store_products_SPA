import { MessageConsole } from '../../../helpers/messageConsole';
import { getProducts } from '../homeAdmin/homeAdmin.model';
import styles from '../homeAdmin/homeAdmin.styles.css';
import style from './homeUser.styles.css';
import { addShopping, getShopping, updateQuantityShopping } from './homeUser.model';
import { decryptData } from '../../../helpers/encrypt';
import { NavigateTo } from '../../../Router';

export const HomeUserView = () =>{
    const pageContentPrivate = 
    `
    <section class="${styles["container-products"]}" id="container-products">
        <div class="${styles["products-title"]}">
            <h1 class="title">Available Products</h1>
        </div>
        <div class="${styles["products"]}" id="products">
        
        </div>
        <div class="${style["products-cart"]} btn btn-success" id="content-cart">
            <i class="bi bi-cart-fill"></i>
            <span class="${style["cart-span"]}" id="cart-count"></span>
        </div>
        
    </section>
    `
    const logicPageContentPrivate = async() =>{
        const idUser = localStorage.getItem("idUser");
        const $containerProducts = document.getElementById("products");
        const productsGet = await getProducts();
        showProductsHtml($containerProducts, productsGet); 

        const $buttons = document.querySelectorAll(`.${styles["footer-button"]}`);
        const $cartCount = document.getElementById("cart-count");
        let count = 1;
        $buttons.forEach(button=>{
            button.addEventListener("click", async()=>{
                const idProduct = button.getAttribute("id");
                const confirmBuy = confirm("Do you want buy product?");
                if(!confirmBuy){
                    MessageConsole("Canceled buy")
                    return;
                }
                $cartCount.textContent = count;
                count+=1;
                await addShopping(idProduct, decryptData(idUser)); //Add shopping 
                // const [shoppingGet,idShopping] = await getShopping(idProduct); // Obtain shoppping
                // if(!shoppingGet){
                    
                //     return;
                // }
                // MessageConsole("Product exists");
                // await updateQuantityShopping(idShopping)
            })
        })
        
        const $contentCart = document.getElementById("content-cart");
        $contentCart.addEventListener("click", ()=>{
            if(parseInt($contentCart.textContent) > 0){
                NavigateTo("/dashboard-user/cart-products");
                return;
            }
            MessageConsole("Error. there are not products buy");
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
                    <h4 class="${style["header-title"]}" id="${product.name_product}">${product.name_product}</h4>
                </div>
                <div class="${styles["article-body"]} card-body">
                    <p class="${styles["body-paragraph"]}">${product.description_product}</p>
                    <span class="${styles["body-price"]}">${new Intl.NumberFormat("es-CO").format(parseFloat(product.price_before_product))}</span>
                    <span class="${styles["body-price"]}">${new Intl.NumberFormat("es-CO").format(parseFloat(product.price_product))}</span>
                </div>
                <div class="${styles["article-footer"]} card-footer">
                    <button class="${styles["footer-button"]} btn btn-primary" id="${product.id}">Buy</button>
                </div>
            </article>
            
            `
        ).join("")}
    `
}