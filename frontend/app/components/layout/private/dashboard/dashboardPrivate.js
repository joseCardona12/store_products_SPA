import { NavbarComponent } from "../../../navbar/navbar.component";

export const DashboardPrivate = (pageContentPrivate, logicPageContentPrivate) =>{
    const $root = document.getElementById("root");
    const navbarData = [
        {href: "/dashboard-admin", name: "Home"},
        {href: "/login",name: "Logout"}
    ]

    const {pageContentNavbarComponent,logicPageContentNavbarComponent} = NavbarComponent(navbarData); //Destructure function navbarCOmponent. Content and logic


    $root.innerHTML = 
    `
        <header>${pageContentNavbarComponent}</header>
        <hr>
        <main>${pageContentPrivate}</main>
        <hr>
        <footer>
            <p>@joseCardona. All rights reserved</p>
        </footer>
    
    `
    logicPageContentNavbarComponent();
    logicPageContentPrivate();
}