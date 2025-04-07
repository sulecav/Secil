'use client';
import { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const VALID_USERNAME = 'sulenur_cavusoglu@hotmail.com';
  const VALID_PASSWORD = 'T4kZZ8@s9NNVgWqwv9e9';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    // Kullanıcı adı ve şifre kontrolü
    if (email === VALID_USERNAME && password === VALID_PASSWORD) {
      // Başarılı giriş
      setError('');
      console.log('Login successful with:', { email, password, rememberMe });

      
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
      }

      
      router.push('/collections');

    } else {
      // Hatalı giriş
      setError('Kullanıcı adı veya şifre yanlış');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', width: '100%' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ color: '#666', mb: 4 }}>
          LOGO
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Posta"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Beni Hatırla"
            sx={{ mb: 2, justifyContent: 'flex-start' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 2, 
              mb: 2, 
              backgroundColor: '#000', 
              color: '#fff', 
              '&:hover': { backgroundColor: '#333' },
              textTransform: 'none',
              fontSize: '16px',
              padding: '10px 0'
            }}
          >
            Giriş Yap
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login