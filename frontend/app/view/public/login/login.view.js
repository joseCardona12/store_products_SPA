import { NavigateTo } from '../../../Router';
import { encryptData } from '../../../helpers/encrypt';
import { MessageConsole } from '../../../helpers/messageConsole';
import { verifyForm } from '../../../helpers/verifyForm';
import { verifyExistsUser } from './login.model';
import styles from './login.styles.css'
export const LoginView = () =>{
    const pageContentPublic = 
    `
    <section class="${styles["section-form"]}">
        <form class="${styles["form-login"]}" id="formLogin">
            <h2 class="${styles["login-title"]}">Login</h2>
            <div class="login-email mb-3">
                <label class="email-label" for="email">Email: </label>
                <input class="email-input form-control" id="emailLogin" type="email" name="email">
            </div>
            <div class="login-password mb-3">
                <label class="password-label" for="password">Password: </label>
                <input class="password-input form-control" id="passwordLogin" type="password" maxlength="8" minlength="1">
            </div>
            <a href="#" id="backLogin">Do you want register?</a>
            <input class="${styles["login-button"]} btn btn-primary mt-2" type="submit">
        </form>
    </section>
    `;

    const logicPageContentPublic = () =>{
        const $formLogin = document.getElementById("formLogin");
        $formLogin.addEventListener("submit", async(e)=>{
            e.preventDefault();
            const $emailUser = document.getElementById("emailLogin");
            const $passwordUser = document.getElementById("passwordLogin");
            const formVerify = verifyForm($emailUser.value,$passwordUser.value); //Verify field of form
            if(!formVerify){ //If form is not complete. Show error for object
                MessageConsole("Fill all fields. Plase. Try again");
                return;
            }
            MessageConsole("Loading...");
            const [userVerifyExists,id_role,id_user] = await verifyExistsUser($emailUser.value, $passwordUser.value);
            if(userVerifyExists){
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("token", token); //Set item to localstorage
                localStorage.setItem("id_role", id_role);
                localStorage.setItem("idUser", encryptData(id_user)); //Send id user to localstorage with hash.
                console.log("Wellcome");
                if(id_role === "2"){
                    NavigateTo("/dashboard-user");
                    return;
                }
                if(id_role === "1"){
                    NavigateTo("/dashboard-admin")
                    return;
                }
                return;
            }
        })

        //Obtain elements a - navigate
        const $backRegister = document.getElementById("backLogin");
        $backRegister.addEventListener("click", (e)=>{
            e.preventDefault();
            NavigateTo("/register");
            return;
        })

    }
    return {
        pageContentPublic,
        logicPageContentPublic
    }
}