import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
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
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
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
