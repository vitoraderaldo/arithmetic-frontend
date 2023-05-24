import { Container, Typography } from "@mui/material";
import { LeftMenu } from "../components/left-menu";
import { Fragment } from "react";

export const DashboardPage = () => {
  return (
    <Fragment>
      <LeftMenu />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Arithmetic Calculator
        </Typography>
      </Container>
    </Fragment>
  );
}
