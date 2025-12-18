import { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, TextField, Button, MenuItem } from '@mui/material';

const RegisterPage = ({ onRegisterSuccess }) => {
    const darkBlue = '#001f3f'; // Темно-синій для кнопок
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [role, setRole] = useState(1); // Встановлюємо дефолтну роль на Студент
    const [adminIdentifier, setAdminIdentifier] = useState('');
    const [error, setError] = useState('');

    const roles = [
        { id: 1, value: 'student', label: 'Студент' },
        { id: 2, value: 'admin', label: 'Адміністратор' },
        { id: 3, value: 'guest', label: 'Гість' }, // Додано Гість
    ];

    const isIdentifierRequired = (role === 1 || role === 2);
    const isGuestRole = role === 3;

    const getIdentifierLabel = () => {
        if (role === 2) return "Ідентифікатор (адміністратор)";
        if (role === 1) return "Ідентифікатор (студента)";
        return "Ідентифікатор"; 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (password !== confirmedPassword) {
            setError("Паролі не співпадають.");
            return;
        }

        if (isIdentifierRequired && !adminIdentifier) {
            setError("Поле ідентифікатора є обов'язковим для обраної ролі.");
            return;
        }

        const postData = {
            name: name,
            surname: surname,
            patronymic: "",
            email: email,
            phoneNumber: phone,
            password: password,
            roleId: role,
            adminIdentifier: isIdentifierRequired ? adminIdentifier : null
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
            setError(`Помилка реєстрації: ${error.response?.data || error.message}`);
        }
    };

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

                {error && (
                    <Typography color="error" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {error}
                    </Typography>
                )}
                
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
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    if (e.target.value === 3) setAdminIdentifier(''); // Очищаємо ID для Гостя
                                }}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        
                            {!isGuestRole ? (
                                <TextField
                                    fullWidth
                                    label={getIdentifierLabel()}
                                    variant="outlined"
                                    required={isIdentifierRequired}
                                    value={adminIdentifier}
                                    onChange={(e) => setAdminIdentifier(e.target.value)}
                                />
                            ) : (
                                <Box sx={{ height: 56, mb: 3 }} /> // Пустий блок
                            )}
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