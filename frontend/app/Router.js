import { DashboardPrivate } from "./components/layout/private/dashboard/dashboardPrivate";
import { DashboardPublic } from "./components/layout/public/dashboard/dashboardPublic";
import { routes } from "./routes";

export const Router = () =>{
    const roleUser = localStorage.getItem("id_role");
    const path = window.location.pathname;
    const publicRoute = routes.public.find(route=> route.path === path);
    const privateRoute = routes.private.find(route=>route.path === path);

    if(path === "/"){
        NavigateTo("/login");
        return;
    }

    if(path === "/login" || path === "/register" || path === "/"){ //Verify path url basic login and register
        if(localStorage.getItem("token") && roleUser === "2"){ //If exist token and role is 2 = user navigate to dashboard user
            NavigateTo("/dashboard-user");
            return;
        }
        if(localStorage.getItem("token") && roleUser === "1"){ // If exist tojen adn role is 1 = admin navigate to dashboard admin
            NavigateTo("/dashboard-admin");
            return;
        }
    }

    if(path === "/dashboard-admin" && roleUser === "2"){ //if path is dashboard admin and role is 2 = user navigate to dashboard-user
        NavigateTo("/dashboard-user");
        return; 
    }
    if(path === "/dashboard-user" && roleUser === "1"){ //if path is dashboard user and role is 1 = user navigate to dashboard-admin    
        NavigateTo("/dashboard-admin");
        return;
    }

    if(publicRoute){
       const {pageContentPublic, logicPageContentPublic} = publicRoute.view();
       DashboardPublic(pageContentPublic,logicPageContentPublic);
       return;
    }
    if(privateRoute){
        if(localStorage.getItem("token")){
            const {pageContentPrivate, logicPageContentPrivate} = privateRoute.view();
            DashboardPrivate(pageContentPrivate, logicPageContentPrivate);
            return;
        }
        NavigateTo("/login");
        return;
    }

    NavigateTo("/not-found");
}

export function NavigateTo(path){ //function navigate to user 
    window.history.pushState({}, "", window.location.origin + path); //Api for controller url 
    Router();
}