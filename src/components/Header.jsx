// src/components/Header.jsx (ФІНАЛЬНА ВЕРСІЯ ДЛЯ АВТЕНТИФІКАЦІЇ)

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

// Додаємо currentPage до пропсів
const Header = ({ onLogoClick, onLoginClick, onRegisterClick, onLogout, isLoggedIn, isAdmin, currentPage }) => { 
    
    // ... (Стилі залишаються незмінними) ...
    
    const registerButtonStyle = {
        backgroundColor: '#001f3f', 
        color: 'white',
        '&:hover': { backgroundColor: '#003366' },
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        ml: 2, px: 2, py: 0.8, 
    };
    
    const loginLinkStyle = {
        color: '#001f3f', 
        fontWeight: 'bold',
        textDecoration: 'none',
        ml: 2, 
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' }
    };
    
    const generalButtonStyle = {
        ml: 2,
        borderColor: '#001f3f',
        color: '#001f3f',
        '&:hover': {
            borderColor: '#003366',
            color: '#003366',
            bgcolor: 'rgba(0,31,63,0.05)',
        },
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 2,
        py: 0.8,
    };


    // Динамічний блок навігації
    const AuthContent = isLoggedIn ? (
        // === СТАН: АВТОРИЗОВАНИЙ КОРИСТУВАЧ (Вихід) ===
        <Button
            variant="outlined"
            onClick={onLogout} 
            sx={generalButtonStyle}
        >
            Вихід
        </Button>
    ) : (
        // === СТАН: НЕАВТОРИЗОВАНИЙ КОРИСТУВАЧ ===
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            {/* 1. КНОПКА "УВІЙТИ" (Відображається лише, якщо ми НЕ на сторінці входу) */}
            {currentPage !== 'login' && (
                <Link onClick={onLoginClick} sx={loginLinkStyle}>
                    Увійти
                </Link>
            )}
            
            {/* 2. КНОПКА "ЗАРЕЄСТРУВАТИСЬ" (Відображається лише, якщо ми НЕ на сторінці реєстрації) */}
            {currentPage !== 'register' && (
                <Button 
                    variant="contained" 
                    onClick={onRegisterClick}
                    sx={registerButtonStyle}
                >
                    Зареєструватись
                </Button>
            )}
            
            {/* 3. КНОПКА "ГОЛОВНА" (Відображається, якщо ми не на HOME) */}
            {currentPage !== 'home' && (
                <Button
                    variant="outlined"
                    onClick={onLogoClick} 
                    sx={generalButtonStyle}
                >
                    Головна
                </Button>
            )}
        </Box>
    );

    return (
        <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
            <Toolbar sx={{ maxWidth: 'lg', width: '100%', margin: '0 auto', py: 1.5 }}>
                
                {/* Логотип LNU DormStay */}
                <Box 
                    sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }} 
                    onClick={onLogoClick}
                >
                    <CottageIcon sx={{ color: '#001f3f', mr: 1, fontSize: 28 }} /> 
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ color: '#001f3f', fontWeight: 'bold' }}
                    >
                        LNU DormStay
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {AuthContent}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;