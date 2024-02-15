import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NewRestaurantPage from '../components/NewRestaurantPage/NewRestaurantPage';
import UpdateRestaurantPage from '../components/UpdateRestaurantPage/UpdateRestaurantPage';
import Layout from './Layout';
import MainPage from '../components/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage/>,
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

      // {
      //   path: "/store",
      //   children: [
      //     {
      //       path: ':id',
      //       element: <StorePage/>
      //     }
      //   ]
      // }
    ],
  },
]);
