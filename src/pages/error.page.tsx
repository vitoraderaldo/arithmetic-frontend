import { Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError() as any;
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="body1" paragraph>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" paragraph>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </>
  );
}
