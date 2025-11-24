// src/pages/RegisterPage.jsx

import React from 'react';
import { Container, Grid, Typography, Box, TextField, Button, Link, MenuItem } from '@mui/material';

const RegisterPage = ({ onRegisterSuccess, onLoginClick }) => {
    const darkBlue = '#001f3f'; // Темно-синій для кнопок

    const handleSubmit = (event) => {
        event.preventDefault();
        // Тут буде логіка реєстрації
        console.log('Спроба реєстрації...');
        onRegisterSuccess(); // Викликаємо успішну реєстрацію (для App.jsx)
    };

    const roles = [
        { value: 'student', label: 'Студент' },
        { value: 'admin', label: 'Адміністратор' },
        // Можливо, інші ролі
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8, minHeight: '70vh' }}>
            <Box 
                sx={{ 
                    bgcolor: 'white', 
                    p: 4, 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    maxWidth: 800, // Обмежуємо ширину форми
                    margin: '0 auto' // Центруємо форму
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
                    Зареєструватись
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="*Ім'я" variant="outlined" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="*Пароль" variant="outlined" type="password" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="*Прізвище" variant="outlined" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="*Повторити пароль" variant="outlined" type="password" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="*email" variant="outlined" type="email" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                select
                                fullWidth 
                                label="*Роль" 
                                variant="outlined" 
                                defaultValue="student"
                                required
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Номер телефону" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="*Ідентифікатор (admin)" variant="outlined" />
                        </Grid>
                    </Grid>
                    
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
                            mt: 4,
                        }}
                    >
                        Зареєструватись
                    </Button>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Link 
                            href="#" 
                            onClick={onLoginClick} 
                            variant="body2" 
                            sx={{ 
                                color: darkBlue, 
                                textDecoration: 'none', 
                                '&:hover': { textDecoration: 'underline' } 
                            }}
                        >
                            Вже маєте обліковий запис? Увійти
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;