// src/components/Footer.jsx (ВИПРАВЛЕНО)

import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

// URL для Офіційного сайту ФПМІ
const FPMI_URL = "https://ami.lnu.edu.ua/";

// Компонент приймає функцію для переходу на сторінку поширених запитань
const Footer = ({ onFaqClick }) => {
    
    const sectionTitleStyle = {
        fontWeight: 'bold',
        color: '#001f3f',
        mb: 1
    };

    const linkStyle = {
        color: 'text.secondary',
        textDecoration: 'none',
        mb: 0.5,
        display: 'block',
        fontSize: '0.9rem',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        }
    };

    return (
        <Box 
            component="footer"
            sx={{
                width: '100%',
                bgcolor: 'white', 
                borderTop: '1px dotted #ccc', 
                py: 5, 
                mt: 'auto', 
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    
                    {/* КОЛОНКА 1: Логотип та Простір */}
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CottageIcon sx={{ color: '#001f3f', mr: 1, fontSize: 28 }} />
                            <Typography variant="h6" sx={{ color: '#001f3f', fontWeight: 'bold' }}>
                                LNU DormStay
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            LNU DormStay
                        </Typography>
                    </Grid>

                    {/* КОЛОНКА 2: ДІЗНАТИСЬ БІЛЬШЕ (FAQ, Сайт) */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" sx={sectionTitleStyle}>
                            Дізнатись більше
                        </Typography>
                        
                        {/* Поширені запитання (Перехід на окрему сторінку) */}
                        <Link component="button" onClick={onFaqClick} sx={linkStyle}>
                            Поширені запитання
                        </Link>
                        
                        {/* Офіційний сайт ФПМІ (Зовнішнє посилання) */}
                        <Link href={FPMI_URL} target="_blank" rel="noopener" sx={linkStyle}>
                            Офіційний сайт ФПМІ
                        </Link>
                    </Grid>

                    {/* КОЛОНКА 3: КОНТАКТИ */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" sx={sectionTitleStyle}>
                            Контакти {/* <--- ЗМІНЕНО ЗАГОЛОВОК */}
                        </Typography>
                        
                        {/* ВИДАЛЕНО: зайве посилання "Контакти" */}
                        
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.primary">
                                Адреса: вулиця Медової Печери, 39, Львів
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                Номер телефону: 0322 514 541
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;