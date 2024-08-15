import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { action as changeAvaibilityAction, loader as getListProductLoader } from "./views/Products";
import EditProduct ,{ loader as editProductLoader, action as editProductAction} from "./views/EditProduct";
import NewProduct, { action as addNewProductAction } from "./views/NewProduct";
import { action as deleteProductAction } from "./components/ProductDetail";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: getListProductLoader,
                action: changeAvaibilityAction
            },
            {
                path: 'producto/nuevo',
                element: <NewProduct />,
                action: addNewProductAction
            },
            {
                path: 'producto/:id/editar', //ROA pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }

        ]
    }
])