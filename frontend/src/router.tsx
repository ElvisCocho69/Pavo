import { createBrowserRouter } from 'react-router-dom'
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader} from "./views/Products.tsx";
import NewProduct, { action as newProductAction } from "./views/NewProduct.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            }
        ]
    }
])