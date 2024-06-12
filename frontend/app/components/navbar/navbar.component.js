import { NavigateTo } from '../../Router';
import { decryptData } from '../../helpers/encrypt';
import { getUserForId } from './navbar.component.model';
import styles from './navbar.styles.css';
export const NavbarComponent = (navbarData = []) =>{
    const pageContentNavbarComponent = 
    `
        <nav class="${styles["navbar"]}">
            <ul class="${styles["navbar-list"]}">
                ${navbarData.map(item=>
                    `
                        <li class="${styles["list-item"]}">
                            <button class="item-button btn btn-primary" id="${item.href}">${item.name}</button>
                        </li>
                    `
                ).join("")}
            </ul>
            <div class="${styles["navbar-name"]}">
                <h5 class="${styles["navbar-title"]}">Dashboard</h5>
                <div class="${styles["name-content"]}">
                    <h5 class="${styles["content-title"]}" id="nameUser"></h5>
                    <div class="${styles["content-circle"]}">
                        <h6 class="circle-name" id="nameUserCircle"></h6>
                    </div>
                </div>
            </div>
        </nav>

    `;
    const logicPageContentNavbarComponent = async() =>{
        const $buttons = document.querySelectorAll(".item-button");
        const idRole   = localStorage.getItem("id_role");
        const idUser = localStorage.getItem("idUser");
        $buttons.forEach(button=>{
            button.addEventListener("click", ()=>{
                const hrefButton = button.getAttribute("id");
                if(hrefButton === "/dashboard-admin" && idRole === "1"){
                    NavigateTo("/dashboard-admin");
                    console.log("Loading...");
                    return;
                }
                if(hrefButton === "/dashboard-admin" && idRole === "2"){
                    NavigateTo("/dashboard-user");
                    console.log("Loading...");
                    return;
                }
                if(hrefButton === "/login"){//If user onclick button logout deleted items on localstorage ----->
                    localStorage.removeItem("token");
                    localStorage.removeItem("id_role");
                    NavigateTo("/login");
                    return;
                }; 
                
            })
        })
        //Logic for show name user
        const {name_user} = await getUserForId(decryptData(idUser)); //Obtain data of user for id
        const $elementNameUser = document.getElementById("nameUser");
        const $elementNameUserCircle = document.getElementById("nameUserCircle");
        ShowNameUser($elementNameUser,name_user);
        showNameUserCircle($elementNameUserCircle,name_user);
    }
    return {
        pageContentNavbarComponent,
        logicPageContentNavbarComponent
    }
}

function ShowNameUser($elementNameUser, name){
    $elementNameUser.textContent = name;
} 

function showNameUserCircle($elementNameUserCircle,name_user){
    const arrayNameUser = name_user.toUpperCase().split("");
    console.log(name_user)
    if(name_user === "jose"){
        $elementNameUserCircle.textContent = `${arrayNameUser[0]}${arrayNameUser[2]}`
        return;
    }
    $elementNameUserCircle.textContent = `${arrayNameUser[0]}${arrayNameUser[1]}`
    
}