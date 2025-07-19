import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from './components/ProductsList';
import UserList from './components/UserList';
import HomePage from './components/HomePage';
import CategoryList from './components/CategoryList';
import BrandsList from './components/BrandsList';

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
