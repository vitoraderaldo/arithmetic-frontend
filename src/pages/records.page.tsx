import { Container, Typography } from "@mui/material";
import { LeftMenu } from "../components/left-menu";
import { Fragment } from "react";

export const RecordsPage = () => {
  return (
    <Fragment>
      <LeftMenu />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Records
        </Typography>
      </Container>
    </Fragment>
  );
}
