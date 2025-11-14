import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, Button, Divider } from '@mui/material';

// Дані-заглушки для відображення карток
const applications = [
    { id: 1, dateLabel: 'Заявка на поселення 20.10.25', mainDate: '22.10.25' },
    { id: 2, dateLabel: 'Заявка на поселення 18.10.25', mainDate: '20.10.25' },
    { id: 3, dateLabel: 'Заявка на поселення 31.10.25', mainDate: '01.11.25' },
];

// Компонент однієї картки заявки
const ApplicationCard = ({ id, dateLabel, mainDate, onStatusView }) => (
    <Card 
        sx={{ 
            borderRadius: '12px', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            boxShadow: 3
        }}
    >
        <CardContent sx={{ flexGrow: 1 }}>
            {/* Заголовок картки */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Id {id}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {dateLabel}
            </Typography>
            
            {/* Головна дата */}
            <Typography variant="h4" component="div" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 2 }}>
                {mainDate}
            </Typography>
            
            {/* Кнопка статусу */}
            <Button 
                variant="outlined" 
                onClick={() => onStatusView(id)} // Перехід на сторінку статусу для цієї заявки
                sx={{ 
                    borderColor: '#001f3f',
                    color: '#001f3f',
                    '&:hover': {
                        borderColor: '#003366',
                        bgcolor: 'rgba(0, 31, 63, 0.04)'
                    }
                }}
            >
                Переглянути статус
            </Button>
        </CardContent>
    </Card>
);

// Компонент сторінки "Мої заявки"
const ApplicationsList = ({ onNewApplication, onStatusView }) => {
    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            {/* Заголовок сторінки */}
            <Typography variant="h3" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Мої заявки
            </Typography>

            {/* Сітка з картками заявок */}
            <Grid container spacing={3}>
                {applications.map((app) => (
                    <Grid item xs={12} sm={6} md={4} key={app.id}>
                        <ApplicationCard {...app} onStatusView={onStatusView} />
                    </Grid>
                ))}
            </Grid>

            {/* Кнопка подачі нової заявки */}
            <Box sx={{ mt: 5 }}>
                <Button
                    variant="contained"
                    onClick={onNewApplication} // Повернення на сторінку форми
                    sx={{
                        backgroundColor: '#001f3f', 
                        '&:hover': { backgroundColor: '#003366' },
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '10px 30px',
                        borderRadius: '8px',
                        textTransform: 'none'
                    }}
                >
                    Подати нову заявку
                </Button>
            </Box>
        </Container>
    );
}

export default ApplicationsList;