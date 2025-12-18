import { Container, Grid, Typography, Box } from '@mui/material';
import HomeIllustration from '../components/HomeIllustration';

const HomePage = () => {
    const primaryColor = '#8b0000';

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