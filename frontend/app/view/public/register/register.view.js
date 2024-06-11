import { NavigateTo } from '../../../Router';
import { MessageConsole } from '../../../helpers/messageConsole';
import { verifyForm } from '../../../helpers/verifyForm';
import { getUsers, registerUser } from './register.model';
import styles from './register.styles.css'
export const RegisterView = () =>{
    //Variable with content html or elements 
    const pageContentPublic = 
    `<section class="${styles["section-form"]}">
        <form class="${styles["form-register"]}" id="formRegister">
            <h2 class="${styles["register-title"]}">Register</h2>
            <div class="register-name mb-3">
                <label class="name-label" for="name">Name: </label>
                <input class="name-input form-control" id="nameRegister" type="text" name="name" maxlength="8" minlength="1">
            </div>
            <div class="register-email mb-3">
                <label class="email-label" for="email">Email: </label>
                <input class="email-input form-control" id="emailRegister" type="email" name="email">
            </div>
            <div class="register-password mb-3">
                <label class="password-label" for="password">Password: </label>
                <input class="password-input form-control" id="passwordRegister" type="password" maxlength="8" minlength="1">
            </div>
            <a href="#" id="backLogin">Login</a>
            <input class="${styles["register-button"]} btn btn-primary mt-2" type="submit">
        </form>
    </section>
    `;
    const logicPageContentPublic = () =>{ //Function with the logic of the elements html
        const formRegister = document.getElementById("formRegister");
        formRegister.addEventListener("submit", async(e)=>{ //Form event submit
            e.preventDefault();
            const $nameUser     = document.getElementById("nameRegister"); //Obtain elements html with js
            const $emailUser    = document.getElementById("emailRegister");
            const $passwordUser = document.getElementById("passwordRegister");

            const formVerify = verifyForm($nameUser.value,$emailUser.value,$passwordUser.value); //Verify field of form
            if(!formVerify){ //If form is not complete. Show error for object
                MessageConsole("Fill all fields. Plase. Try again");
                return;
            }
            MessageConsole("Loading...");
            const usersGet = await getUsers($emailUser.value); // Obtain boolean of users found with equall email 
            if(usersGet){
                await registerUser($nameUser.value,$emailUser.value,$passwordUser.value); // Register user
                NavigateTo("/login");
                return;
            } 
        })

        //Obtain elements a - navigate
        const $backLogin = document.getElementById("backLogin");
        $backLogin.addEventListener("click", (e)=>{
            e.preventDefault();
            NavigateTo("/login");
            return;
        })
    }
    return {
        pageContentPublic,
        logicPageContentPublic
    }
}