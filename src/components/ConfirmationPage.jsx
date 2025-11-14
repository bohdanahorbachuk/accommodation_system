import React from 'react';
import { Container, Box, Typography, Link, Paper } from '@mui/material';

// Компонент сторінки підтвердження приймає пропс onViewStatus
const ConfirmationPage = ({ onViewStatus }) => {
    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5, height: '70vh', display: 'flex', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Ліва частина: текст */}
                    <Box sx={{ flexGrow: 1, minWidth: '300px', mb: { xs: 3, sm: 0 } }}>
                        <Typography variant="h4" component="h1" sx={{ color: '#8b0000', fontWeight: 'bold', mb: 2 }}>
                            Вітаємо!
                        </Typography>
                        <Typography variant="h5" component="p" sx={{ color: '#001f3f', fontWeight: 'medium', mb: 3 }}>
                            Вашу заявку на тимчасове поселення в гуртожиток прийнято!
                        </Typography>
                        
                        {/* Посилання, що перемикає стан на 'status' */}
                        <Link 
                            component="button" // Використовуємо Link як кнопку для обробки onClick
                            onClick={onViewStatus} 
                            variant="body1" 
                            sx={{ color: '#001f3f', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            Переглянути статус заявки
                        </Link>
                    </Box>

                    {/* Права частина: іконка успіху */}
                    <Box
                        sx={{
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            border: '4px solid #001f3f',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            bgcolor: 'rgba(255, 255, 0, 0.1)',
                            ml: { sm: 4 },
                            mr: { xs: 'auto', sm: 0 }, 
                            ml: { xs: 'auto', sm: 0 },
                        }}
                    >
                        {/* Жовта галочка */}
                        <Typography variant="h1" sx={{ color: '#ffb300', fontSize: '100px' }}>
                            &#x2713;
                        </Typography>

                        {/* Елементи дизайну на фоні */}
                        <Box
                            sx={{
                                position: 'absolute',
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: '#ffb300',
                                top: 10,
                                right: 10,
                                opacity: 0.7,
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                fontSize: '20px',
                                color: '#cccccc',
                                bottom: 10,
                                left: 10,
                                transform: 'rotate(45deg)',
                                opacity: 0.7,
                            }}
                        >
                            +
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                fontSize: '20px',
                                color: '#cccccc',
                                top: 30,
                                left: -20,
                                transform: 'rotate(45deg)',
                                opacity: 0.7,
                            }}
                        >
                            x
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default ConfirmationPage;