import { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, TextField, Button, Link, Paper } from '@mui/material';
import HomeIllustration from '../components/HomeIllustration';

const LoginPage = ({ onLoginSuccess, onForgotPassword, onRegisterClick }) => {
    const darkBlue = '#001f3f'; // Темно-синій для кнопок
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputStyle = {
        '& .MuiInputBase-root': {
            borderRadius: '8px',
            backgroundColor: '#f0f0f0', // Світло-сірий фон
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f0f0f0', // Прибрати видимий бордер, якщо він стандартний
        },
        marginBottom: 2, // Відступ знизу для кожного поля
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            email: email,
            password: password
        };

        try {
            var response = await axios.post('https://localhost:7193/api/auth/login', postData);

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
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', overflow: 'hidden' }}>
                <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 3 }}>
                    Увійти
                </Typography>

                <Grid container spacing={4} columns={{ xs: 2 }}>
                    {/* Ліва колонка */}
                    <Grid size={{ xs: 1 }}>
            
                    <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={inputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <Typography variant="subtitle1" fontWeight="bold">Пароль</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type ="password"
                        sx={inputStyle}
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
                            onClick={handleSubmit}
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
                    </Grid>

                    {/* Права частина: Ілюстрація */}
                    <Grid size={{ xs: 1 }} >
                        <HomeIllustration />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginPage;