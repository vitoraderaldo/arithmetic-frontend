import { FC, ComponentType } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { isAuthenticated } from '../util/auth/is-authenticated';

const PrivateRoute: FC<{ component: ComponentType }> = ({ component: Component, ...rest }) => {
  if (isAuthenticated()) {
    return <Component {...rest} />;
  }
  return <Navigate to="/login" />;
};

const UnauthenticatedRoute: FC<{ component: ComponentType }> = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    return <Component {...rest} />;
  }
  return <Navigate to="/" />;
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute component={DashboardPage} />} />
        <Route path="/login" element={<UnauthenticatedRoute component={LoginPage} />} />
      </Routes>
    </Router>
  );
};
