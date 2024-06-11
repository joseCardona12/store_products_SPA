import { NavigateTo } from '../../Router';
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
            <h5 class="navbar-title">Dashboard</h5>
        </nav>

    `;
    const logicPageContentNavbarComponent = () =>{
        const $buttons = document.querySelectorAll(".item-button");
        const idRole   = localStorage.getItem("id_role");
        $buttons.forEach(button=>{
            button.addEventListener("click", ()=>{
                const hrefButton = button.getAttribute("id");
                if(hrefButton === "/dashboard-admin" && idRole === "1"){
                    NavigateTo("/dashboard-admin");
                    console.log("Loading...");
                    return;
                }
                if(hrefButton === "/dashboard-admin" && idRole === "2"){
                    NavigateTo("/dashoard-user");
                    console.log("Loading...");
                    return;
                }
                if(hrefButton === "/login"){//If user onclick button logout deleted items on localstorage ----->
                    NavigateTo("/login");
                    localStorage.removeItem("token");
                    localStorage.removeItem("id_role");
                    return;
                }; 
                
            })
        })
    }
    return {
        pageContentNavbarComponent,
        logicPageContentNavbarComponent
    }
}