import { CreateProductView } from "./view/private/homeAdmin/createProduct/createProduct.view";
import { EditProductView } from "./view/private/homeAdmin/editProduct/editProduc.view";
import { HomeAdminView } from "./view/private/homeAdmin/homeAdmin.view";
import { HomeUserView } from "./view/private/homeUser/homeUser.view";
import { LoginView } from "./view/public/login/login.view";
import { NotFoundView } from "./view/public/notFound/notFound.view";
import { RegisterView } from "./view/public/register/register.view";

export const routes = {
    public: [
        {path: "/register", view: RegisterView},
        {path: "/login", view: LoginView},
        {path: "/not-found", view: NotFoundView}
    ],
    private: [
        {path: "/dashboard-admin", view: HomeAdminView},
        {path: "/dashboard-user", view: HomeUserView},
        {path: "/dashboard-admin/edit-product", view: EditProductView},
        {path: "/dashboard-admin/create-product", view: CreateProductView}
    ]
}