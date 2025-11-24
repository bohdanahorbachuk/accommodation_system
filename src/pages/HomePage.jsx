import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import Header from '../components/Header';
// import DormIllustration from './DormIllustration'; // Для реальної ілюстрації
import HomeIllustration from '../components/HomeIllustration'; // Використовуємо тимчасову ілюстрацію

const HomePage = ({ onStartApplication }) => {
    const primaryColor = '#8b0000'; // Бордовий колір для заголовка
    const darkBlue = '#001f3f'; // Темно-синій для кнопки

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8, minHeight: '70vh' }}>
            <Grid container spacing={4} alignItems="center">
                
                {/* Ліва частина: Текст та CTA */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: { md: 4 } }}>
                        <Typography 
                            variant="h2" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                                color: primaryColor, 
                                fontWeight: 'bold', 
                                lineHeight: 1.1,
                                mb: 3
                            }}
                        >
                            Електронне поселення в гуртожиток
                        </Typography>
                        
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            Подай заявку на тимчасове проживання в гуртожитку онлайн швидко та зручно!
                        </Typography>
                        
                        {/* Кнопка "Подати нову заявку" */}
                        <Button
                            variant="contained"
                            size="large"
                            onClick={onStartApplication} // Викликаємо функцію App.jsx
                            sx={{
                                backgroundColor: darkBlue,
                                '&:hover': { backgroundColor: '#003366' },
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                textTransform: 'none',
                                py: 1.5,
                                px: 3,
                            }}
                        >
                            Подати нову заявку
                        </Button>
                    </Box>
                </Grid>

                {/* Права частина: Ілюстрація */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                     {/* Тут буде ваша ілюстрація */}
                    <HomeIllustration />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;