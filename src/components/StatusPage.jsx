import React from 'react';
import { Container, Grid, Typography, Box, Paper, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description'; // Іконка документа
import CheckIcon from '@mui/icons-material/Check'; // Іконка галочки для статусу

// Компонент сторінки статусу заявки
const StatusPage = () => {
    // Дані для відображення (в реальному додатку вони будуть отримані з API)
    const applicationData = {
        name: "Петренко Іван Іванович",
        room: "№2",
        place: "№3",
        phone: "+380667864532",
        date: "29.11.2025",
        status: "Схвалено" // 'Схвалено', 'На розгляді', 'Відхилено'
    };

    // Визначення кольору статусу
    let statusColor;
    if (applicationData.status === 'Схвалено') {
        statusColor = '#4caf50'; // Зелений
    } else if (applicationData.status === 'На розгляді') {
        statusColor = '#ff9800'; // Помаранчевий
    } else {
        statusColor = '#f44336'; // Червоний
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Статус заявки
            </Typography>

            <Grid container spacing={4} alignItems="center">
                {/* Ліва частина: Картка з даними */}
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', bgcolor: '#f0f0f0' }}>
                        {/* Блок ПІБ */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, bgcolor: 'white', borderRadius: '8px' }}>
                            <DescriptionIcon sx={{ color: '#001f3f', fontSize: 30, mr: 1 }} />
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#001f3f' }}>
                                {applicationData.name}
                            </Typography>
                        </Box>

                        {/* Інформація про кімнату та телефон */}
                        <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                            Кімната **{applicationData.room}**, місце **{applicationData.place}**
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                            {applicationData.phone}
                        </Typography>

                        {/* Дата поселення */}
                        <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                            Дата поселення
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                            {applicationData.date}
                        </Typography>

                        {/* Статус */}
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            bgcolor: statusColor,
                            color: 'white',
                            p: '4px 12px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            mb: 3
                        }}>
                            <CheckIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            {applicationData.status}
                        </Box>

                        {/* Кнопка завантаження PDF */}
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#8b0000', // Темно-бордовий колір
                                '&:hover': { bgcolor: '#6e0000' },
                                color: 'white',
                                fontWeight: 'bold',
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none'
                            }}
                            fullWidth
                            // У реальному додатку тут була б функція завантаження
                            onClick={() => console.log('Завантаження PDF...')}
                        >
                            Завантажити підтвердження про поселення (PDF)
                        </Button>
                    </Paper>
                </Grid>

                {/* Права частина: Ілюстрація будівлі */}
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Цей блок імітує ілюстрацію гуртожитку з лупою */}
                    <Box sx={{ position: 'relative', width: '100%', maxWidth: 300, height: 300 }}>
                        {/* Ви можете замінити цей блок на реальне SVG або зображення */}
                                            </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default StatusPage;