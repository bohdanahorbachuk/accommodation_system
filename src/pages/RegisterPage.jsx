import { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, TextField, Button, Link, MenuItem } from '@mui/material';

const RegisterPage = ({ onRegisterSuccess }) => {
    const darkBlue = '#001f3f'; // Темно-синій для кнопок
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [role, setRole] = useState('');
    const [adminIdentifier, setAdminIdentifier] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            name: name,
            surname: surname,
            patronymic: "",
            email: email,
            phoneNumber: phone,
            password: password,
            roleId: role,
            adminIdentifier: adminIdentifier
        };

        try {
            await axios.post('https://localhost:7193/api/auth/register', postData);
            
            setName('');
            setSurname('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmedPassword('');
            setRole('');
            setAdminIdentifier('');

            onRegisterSuccess();
        } catch (error) {
            console.error(`Помилка під час надсилання: ${error.message}`);
        }
    };

    const roles = [
        { id: 1, value: 'student', label: 'Студент' },
        { id: 2, value: 'admin', label: 'Адміністратор' },
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
                    <Grid container spacing={4} columns={{ xs: 2 }}>
                        {/* Ліва колонка */}
                        <Grid size={{ xs: 1 }}>
                            <TextField
                                fullWidth
                                label="Ім'я"
                                variant="outlined"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            
                            <TextField
                                fullWidth
                                label="Прізвище"
                                variant="outlined"
                                required
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Номер телефону"
                                variant="outlined"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>

                        {/* Права колонка */}
                        <Grid size={{ xs: 1 }}>
                            <TextField
                                fullWidth
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Повторити пароль"
                                variant="outlined"
                                type="password"
                                required
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                            />
                        
                            <TextField 
                                select
                                fullWidth 
                                label="Роль" 
                                variant="outlined"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        
                            <TextField
                                fullWidth
                                label="Ідентифікатор (адміністратор)"
                                variant="outlined"
                                value={adminIdentifier}
                                onChange={(e) => setAdminIdentifier(e.target.value)}
                            />
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
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;