import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from './components/ProductsList';
import UserList from './components/UserList';
import HomePage from './components/HomePage';
import CategoryList from './components/CategoryList';
import BrandsList from './components/BrandsList';
import OrderList from './components/OrderList';
import { ProductDetail } from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: '/products',
            element: <ProductList />
          },
          {
            path: "/product/detail/:productId",
            element: <ProductDetail />,
          },
          {
            path: "/product/add",
            element: <ProductCreate />,
          },
          {
            path: '/users',
            element: <UserList />
          },
          {
            path: '/categories',
            element: <CategoryList />
          },
          {
            path: '/brands',
            element: <BrandsList />
          },
          {
            path: '/orders',
            element: <OrderList />
          },
        ]
      },

    ]
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
