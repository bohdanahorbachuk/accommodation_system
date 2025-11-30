// src/pages/ConfirmationPage.jsx (ОНОВЛЕНО)

import { Container, Box, Typography, Link, Paper, Button } from '@mui/material'; // Додано Button
import React from 'react';

// Компонент приймає onViewStatus та onViewList
const ConfirmationPage = ({ onViewStatus, onViewList }) => { 

    const secondaryButtonStyle = {
        borderColor: '#001f3f',
        color: '#001f3f',
        '&:hover': {
            borderColor: '#003366',
            color: '#003366',
            bgcolor: 'rgba(0,31,63,0.05)',
        },
        fontWeight: 'bold',
        padding: '8px 20px',
        borderRadius: '8px',
        textTransform: 'none',
        ml: 2
    };

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
                        
                        {/* Контейнер для кнопок / посилань */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {/* Посилання на Status */}
                            <Link 
                                component="button" 
                                onClick={onViewStatus} 
                                variant="body1" 
                                sx={{ 
                                    color: '#001f3f', 
                                    fontWeight: 'bold', 
                                    textDecoration: 'underline', 
                                    cursor: 'pointer' 
                                }}
                            >
                                Переглянути статус заявки
                            </Link>

                             {/* НОВА КНОПКА: Повернутися до списку */}
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={onViewList} // <--- Викликає перехід до списку
                                sx={secondaryButtonStyle}
                            >
                                До списку заявок
                            </Button>
                        </Box>
                    </Box>

                    {/* Права частина: іконка успіху (залишається без змін) */}
                    <Box 
                        sx={{
                            // ... існуючі стилі ...
                            width: 200, height: 200, borderRadius: '50%', border: '4px solid #001f3f',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            position: 'relative', bgcolor: 'rgba(255, 255, 0, 0.1)', ml: { sm: 4 },
                            mr: { xs: 'auto', sm: 0 }, ml: { xs: 'auto', sm: 0 },
                        }}
                    >
                        <Typography variant="h1" sx={{ color: '#ffb300', fontSize: '100px' }}>
                            &#x2713;
                        </Typography>
                        {/* ... Елементи дизайну ... */}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default ConfirmationPage;