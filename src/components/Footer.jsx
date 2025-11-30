// src/components/Footer.jsx (ВИПРАВЛЕНО ПОСИЛАННЯ)

import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

// НОВИЙ КОРЕКТНИЙ URL
const FPMI_URL = "https://ami.lnu.edu.ua/"; 

const Footer = ({ onFaqClick }) => {
    
    const sectionTitleStyle = {
        fontWeight: 'bold',
        color: '#001f3f',
        mb: 1.5
    };

    const linkStyle = {
        color: 'text.secondary',
        textDecoration: 'none',
        mb: 0.8,
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
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 6 } }}> 
                
                <Grid container spacing={4} justifyContent="space-between"> 
                    
                    {/* КОЛОНКА 1: ЛОГОТИП */}
                    <Grid item xs={12} sm={6} md={3}> 
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <CottageIcon sx={{ color: '#001f3f', mr: 1, fontSize: 28 }} />
                            <Typography variant="h6" sx={{ color: '#001f3f', fontWeight: 'bold' }}>
                                LNU DormStay
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                            LNU DormStay
                        </Typography>
                    </Grid>
                    
                    {/* КОЛОНКА 2: ДІЗНАТИСЬ БІЛЬШЕ (ЛІВО-ЦЕНТР) */}
                    <Grid item xs={12} sm={6} md={3}> 
                        <Typography variant="subtitle1" sx={sectionTitleStyle}>
                            Дізнатись більше
                        </Typography>
                        
                        <Link component="button" onClick={onFaqClick} sx={linkStyle}>
                            Поширені запитання
                        </Link>
                        
                        {/* Посилання на Офіційний сайт ФПМІ з новим URL */}
                        <Link href={FPMI_URL} target="_blank" rel="noopener" sx={linkStyle}>
                            Офіційний сайт ФПМІ
                        </Link>
                    </Grid>

                    {/* КОЛОНКА 3: КОНТАКТИ (ПРАВОРУЧ) */}
                    <Grid item xs={12} sm={6} md={3}> 
                        <Typography variant="subtitle1" sx={sectionTitleStyle}>
                            Контакти
                        </Typography>
                        
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