import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

const Header = ({ onLogoClick, onLoginClick, onRegisterClick, onViewList }) => {
    
    const registerButtonStyle = {
        backgroundColor: '#001f3f', 
        color: 'white',
        '&:hover': {
            backgroundColor: '#003366',
        },
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        ml: 2, 
        px: 2, 
        py: 0.8, 
    };
    
    const loginLinkStyle = {
        color: '#001f3f', 
        fontWeight: 'bold',
        textDecoration: 'none',
        ml: 2, 
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        }
    };

    return (
        <AppBar 
            position="static" 
            sx={{ 
                bgcolor: 'white', 
                boxShadow: 'none', 
                borderBottom: '1px solid #e0e0e0' 
            }}
        >
            <Toolbar sx={{ 
                maxWidth: 'lg', 
                width: '100%', 
                margin: '0 auto', 
                py: 1.5 
            }}>
                
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
                
                {/* Навігація */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Кнопка "Увійти" */}
                    <Link onClick={onLoginClick} sx={loginLinkStyle}>
                        Увійти
                    </Link>
                    
                    {/* Кнопка "Зареєструватись" */}
                    <Button 
                        variant="contained" 
                        onClick={onRegisterClick}
                        sx={registerButtonStyle}
                    >
                        Зареєструватись
                    </Button>
                    
                    {/* Тимчасова кнопка "Головна" для навігації з авторизації */}
                    <Button
                        variant="outlined"
                        onClick={onLogoClick} // Кнопка Головна завжди веде на Home
                        sx={{
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
                        }}
                    >
                        Головна
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;