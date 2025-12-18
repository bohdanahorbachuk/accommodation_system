import { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, TextField, Button, MenuItem, Paper } from '@mui/material';

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

    const inputStyle = {
    '& .MuiInputBase-root': {
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        height: '45px', // Встановіть конкретну висоту, яка вам підходить
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Краще використовувати border: 'none', щоб повністю приховати лінію
    },
    // Важливо для селекта: прибираємо зайвий паддінг у самого інпута всередині
    '& .MuiSelect-select': {
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    marginBottom: 2,
};

    const isIdentifierRequired = (role === 1 || role === 2);
    const isGuestRole = role === 3;

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
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', overflow: 'hidden' }}>
                <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 3 }}>
                    Зареєструватись
                </Typography>

                {error && (
                    <Typography color="error" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {error}
                    </Typography>
                )}

                <Grid container spacing={4} columns={{ xs: 2 }}>
                    {/* Ліва колонка */}
                    <Grid size={{ xs: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">Ім'я</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Typography variant="subtitle1" fontWeight="bold">Прізвище</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputStyle}
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />

                        <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Typography variant="subtitle1" fontWeight="bold">Номер телефону</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputStyle}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>

                    {/* Права колонка */}
                    <Grid size={{ xs: 1 }}>

                        {/* Період поселення */}
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

                        {/* Обрати місце */}
                        <Typography variant="subtitle1" fontWeight="bold">Повторити пароль</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="password"
                            sx={inputStyle}
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />

                        <Typography variant="subtitle1" fontWeight="bold">Роль</Typography>
                        <TextField 
                            select
                            fullWidth
                            variant="outlined"
                            required
                            sx={inputStyle}
                            value={role}
                            SelectProps={{
                                sx: { 
                                    paddingTop: 0, 
                                    paddingBottom: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            }}
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
                            <>
                                <Typography variant="subtitle1" fontWeight="bold">Ідентифікатор</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    sx={inputStyle}
                                    required={isIdentifierRequired}
                                    value={adminIdentifier}
                                    onChange={(e) => setAdminIdentifier(e.target.value)}
                                    />
                            </>
                            ) : (
                            <Box sx={{ height: 56, mb: 3 }} />
                        )}
                    </Grid>
                </Grid>
                
                <Button
                    fullWidth
                    onClick={handleSubmit}
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

            </Paper>
        </Container>
    );
};

export default RegisterPage;