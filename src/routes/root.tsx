import { FC, ComponentType } from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/login.page';
import { ErrorPage } from '../pages/error.page';
import { DashboardPage } from '../pages/dashboard.page';
import { isAuthenticated } from '../util/auth/is-authenticated';

const PrivateRoute: FC<{ component: ComponentType }> = ({ component: Component, ...rest }) => {
  if (isAuthenticated()) {
    return <Component {...rest} />;
  }
  return <LoginPage />
};

const UnauthenticatedRoute: FC<{ component: ComponentType }> = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    return <Component {...rest} />;
  }
  return <DashboardPage />
};

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <PrivateRoute component={DashboardPage}/>
  },
  {
    path: "/login",
    element: <UnauthenticatedRoute component={LoginPage} />
  }
]);
