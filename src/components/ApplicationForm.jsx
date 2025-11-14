import React from 'react';
import { Container, Grid, Typography, TextField, Button, Box, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Використовуємо іконку для стилізації

// Компонент форми приймає пропс onSuccess
const ApplicationForm = ({ onSuccess }) => { 
    // Стилі для імітації сірого поля, як на зображенні
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
    
    // Функція, яка імітує відправку форми та перемикає сторінку
    const handleSubmit = () => {
        // У реальному додатку тут була б логіка валідації та API-запиту.
        // Ми просто викликаємо функцію для перемикання сторінки.
        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', overflow: 'hidden' }}>
                {/* Заголовок */}
                <Typography variant="h4" component="h1" sx={{ color: '#8b0000', fontWeight: 'bold', mb: 3 }}>
                    Подача заявки
                </Typography>

                <Grid container spacing={4}>
                    {/* Ліва колонка */}
                    <Grid item xs={12} sm={6}>
                        {/* ПІБ */}
                        <Typography variant="subtitle1" fontWeight="bold">ПІБ</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Введіть ПІБ"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* Номер телефону */}
                        <Typography variant="subtitle1" fontWeight="bold">Номер телефону</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Введіть номер"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* email */}
                        <Typography variant="subtitle1" fontWeight="bold">email</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Введіть email"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* Обрати кімнату */}
                        <Typography variant="subtitle1" fontWeight="bold">Обрати кімнату</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="№ кімнати"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* Адреса гуртожитку та кнопка */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" sx={{ color: '#8b0000', mb: 1 }}>
                                Гуртожиток знаходиться за адресою <br/> вул. Медової печери, 39В
                            </Typography>
                            <Button
                                variant="contained"
                                // Додано обробник кліку, який викликає handleSubmit
                                onClick={handleSubmit} 
                                sx={{
                                    backgroundColor: '#001f3f', // Темно-синій колір
                                    '&:hover': {
                                        backgroundColor: '#003366',
                                    },
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '10px 30px',
                                    borderRadius: '8px',
                                }}
                            >
                                Подати заявку
                            </Button>
                        </Box>
                    </Grid>

                    {/* Права колонка */}
                    <Grid item xs={12} sm={6}>
                        {/* Причини бронювання */}
                        <Typography variant="subtitle1" fontWeight="bold">Причини бронювання</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* Період поселення */}
                        <Typography variant="subtitle1" fontWeight="bold">Період поселення</Typography>
                        {/* Дата заселення */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Дата заселення"
                            size="small"
                            sx={inputStyle}
                        />
                        {/* Дата виселення */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Дата виселення"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* Обрати місце */}
                        <Typography variant="subtitle1" fontWeight="bold">Обрати місце</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="№ місця"
                            size="small"
                            sx={inputStyle}
                        />

                        {/* Блок з карткою "APPLY" */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '150px', // Висота для імітації блоку на зображенні
                                mt: 3,
                            }}
                        >
                            {/* Імітація картки - для реального використання потрібен SVG або зображення */}
                            <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon sx={{ fontSize: 40, color: '#001f3f' }} />
                                    <Box sx={{ ml: 2 }}>
                                        <Box sx={{ width: 100, height: 5, bgcolor: '#ccc', mb: 1 }} />
                                        <Box sx={{ width: 80, height: 5, bgcolor: '#ccc', mb: 1 }} />
                                        <Box sx={{ width: 120, height: 5, bgcolor: '#ccc' }} />
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                backgroundColor: '#ffb300', // Жовтий колір
                                                '&:hover': { backgroundColor: '#e69900' },
                                                color: '#001f3f',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                borderRadius: '5px',
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ApplicationForm;