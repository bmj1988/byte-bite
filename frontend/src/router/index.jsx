import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import NewRestaurantPage from '../components/NewRestaurantPage/NewRestaurantPage';
import MainPage from '../components/MainPage/MainPage';
import StorePage from '../components/StorePage/StorePage';
import CurrentReviewsPage from '../components/CurrentReviewsPage/CurrentReviewsPage';
import CurrentRestaurantsPage from '../components/CurrentRestaurantsPage'

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
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/store",
        children: [
          {
            path: ':name',
            element: <StorePage/>
          },
          {
            path: 'my-stores',
            element: <CurrentRestaurantsPage />
          }
        ]
      },
      {
        path: "/reviews/current",
        element: <CurrentReviewsPage />
      }
    ],
  },
]);
