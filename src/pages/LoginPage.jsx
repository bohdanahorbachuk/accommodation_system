import { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, TextField, Button, Link } from '@mui/material';
import HomeIllustration from '../components/HomeIllustration';

const LoginPage = ({ onLoginSuccess, onForgotPassword, onRegisterClick }) => {
    const darkBlue = '#001f3f'; // Темно-синій для кнопок
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            email: email,
            password: password
        };

        try {
            var response = await axios.post('https://localhost:7193/api/auth/login', postData);

            console.log(response.data);

            const responseData = {
                accessToken: response.data.accessToken,
                userId: response.data.user.id,
                userRole: response.data.user.roleId
            }

            localStorage.setItem('accessToken', responseData.accessToken);
            
            setEmail('');
            setPassword('');

            onLoginSuccess(responseData);
        } catch (error) {
            console.error(`Помилка під час надсилання: ${error.message}`);
        }
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
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                sx={{ mb: 2 }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                required
                                sx={{ mb: 3 }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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