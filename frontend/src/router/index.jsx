import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import StorePage from '../components/StorePage';
import Layout from './Layout';
import NewRestaurantPage from '../components/NewRestaurantPage/NewRestaurantPage';
import UpdateRestaurantPage from '../components/UpdateRestaurantPage/UpdateRestaurantPage';
import MainPage from '../components/MainPage/MainPage';
import StorePage from '../components/StorePage/StorePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/new",
        element: <NewRestaurantPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/update",
        children: [
          {
            path: ':restaurantId',
            element: <UpdateRestaurantPage />
          }
        ]
      },
      {
        path: "/store",
        children: [
          {
            path: ':name',
            element: <StorePage/>
          }
        ]
      }
    ],
  },
]);
