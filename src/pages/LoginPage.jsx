// src/pages/LoginPage.jsx

import React from 'react';
import { Container, Grid, Typography, Box, TextField, Button, Link } from '@mui/material';
import HomeIllustration from '../components/HomeIllustration'; // Зберігаємо ілюстрацію

const LoginPage = ({ onLoginSuccess, onForgotPassword, onRegisterClick }) => {
    const darkBlue = '#001f3f'; // Темно-синій для кнопок

    const handleSubmit = (event) => {
        event.preventDefault();
        // Тут буде логіка авторизації
        console.log('Спроба входу...');
        onLoginSuccess(); // Викликаємо успішний вхід (для App.jsx)
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8, minHeight: '70vh' }}>
            <Grid container spacing={4} alignItems="center">
                
                {/* Ліва частина: Форма Входу */}
                <Grid item xs={12} md={6}>
                    <Box 
                        sx={{ 
                            pr: { md: 4 }, 
                            bgcolor: 'white', 
                            p: 4, 
                            borderRadius: '12px', 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
                        }}
                    >
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                                color: darkBlue, 
                                fontWeight: 'bold', 
                                mb: 4 
                            }}
                        >
                            Увійти
                        </Typography>
                        
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Логін"
                                variant="outlined"
                                margin="normal"
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                required
                                sx={{ mb: 3 }}
                            />
                            <Link 
                                href="#" 
                                onClick={onForgotPassword} 
                                variant="body2" 
                                sx={{ 
                                    color: darkBlue, 
                                    textDecoration: 'none', 
                                    '&:hover': { textDecoration: 'underline' },
                                    mb: 3, 
                                    display: 'block' 
                                }}
                            >
                                Забули пароль?
                            </Link>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: darkBlue,
                                    '&:hover': { backgroundColor: '#003366' },
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    py: 1.5,
                                    mt: 2,
                                }}
                            >
                                Вхід
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Права частина: Ілюстрація */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <HomeIllustration />
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;