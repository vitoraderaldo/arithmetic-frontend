import React from 'react';
import { FC, ComponentType } from 'react';
import { Grid } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { isAuthenticated } from '../util/auth/authentication.util';
import { RecordsPage } from '../pages/records.page';
import { LeftMenu } from '../components/left-menu';

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

const Page: React.FC<any> = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={4} sm={3} md={2}>
        <LeftMenu />
      </Grid>
      <Grid item xs={8} sm={9} md={10} style={{marginTop: 20}}>
        {children}
      </Grid>
    </Grid>
  )
};

const recordPage = () => <Page><RecordsPage /></Page>
const dashboardPage = () => <Page><DashboardPage /></Page>


export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute component={dashboardPage} />} />
        <Route path="/records" element={<PrivateRoute component={recordPage} />} />
        <Route path="/login" element={<UnauthenticatedRoute component={LoginPage} />} />
      </Routes>
    </Router>
  );
};
