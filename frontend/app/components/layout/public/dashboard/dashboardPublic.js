export const DashboardPublic = (pageContentPublic,logicPageContentPublic) => {
    const root = document.getElementById("root");
    root.innerHTML = 
    `
    <header></header>
    <main>${pageContentPublic}</main>
    <hr>
    <footer>@joseCardona</footer>
    `
    logicPageContentPublic();

}