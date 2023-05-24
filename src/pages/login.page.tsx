import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { apiService } from '../api/api.service';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const localStorage = window.localStorage;

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await apiService.login({ email, password })
      localStorage.setItem('authentication', JSON.stringify(response));
      navigator('/');
    } catch (err) {
      setErrorMessage('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="5rem"
        padding="2rem"
        border="1px solid #ccc"
        borderRadius="4px"
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
         {errorMessage && (
          <Typography color="error" align="center" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          style={{ marginTop: '1rem' }}
        > 
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
