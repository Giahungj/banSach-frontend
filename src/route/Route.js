import { createBrowserRouter} from 'react-router-dom';
import App from '../App.js';
import Login from '../components/user/Login.js';
import Home from '../components/home/Home.js';
import Product from '../components/product/Product.js';
import DetailProduct from '../components/product/DetailProduct.js';
import DetailUser from '../components/user/DetailUser.js';
import Register from '../components/user/Register.js';
import Logout  from '../components/user/Logout.js';
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:"/home", 
                element: <Home />
            },
            {
                path:"/product",
                element: <Product />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {   path: "/logout", 
                element: <Logout /> 
            },
            {
                path: "/detail-product/:id",
                element: <DetailProduct />
            },
            {
                path: "/detail-user/:userid",
                element: <DetailUser />
            }
        ]
    },
    {
        path: "*",
        element: <div>Không tìm thấy web theo yêu cầu</div>
    }
]);
