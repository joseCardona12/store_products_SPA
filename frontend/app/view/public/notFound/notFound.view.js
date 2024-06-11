
import { NavigateTo } from '../../../Router';
import styles from './notFound.styles.css'
export const NotFoundView = () =>{
    const pageContentPublic = 
    `
    <section class="${styles["section"]}">
        <article class="${styles["section-article"]} card">
            <div class="card-header">
                <h2>Oops!...</h2>
            </div>
            <div class="card-body">
                <p class="body-paragraph">We can't find the page.</p>
            </div>
            <div class="card-footer">
                <p>Error 404. Not found</p>
                <button class="footer-button btn btn-primary" id="backLogin">Back Login</button>
            </div>
        </article>
    </section>
    
    `
    const logicPageContentPublic = () =>{
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