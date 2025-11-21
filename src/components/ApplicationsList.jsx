import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, Card, CardContent, Button, Divider } from '@mui/material';

const DateDisplay = (dateString) => {
  const dateObject = new Date(dateString);

  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};

const ApplicationCard = ({ reservationId, createdAt, reservationStartDate, onStatusView }) => (
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Заявка на послення {DateDisplay(createdAt)}
            </Typography>
            
            {/* Головна дата */}
            <Typography variant="h4" component="div" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 2 }}>
                {DateDisplay(reservationStartDate)}
            </Typography>
            
            {/* Кнопка статусу */}
            <Button 
                variant="outlined" 
                onClick={() => onStatusView(reservationId)}
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
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadApplications = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://localhost:7193/api/reservations`);
                setReservations(response.data);
            } catch (err) {
                console.error("Помилка завантаження заявок:", err);
                setError('Не вдалося завантажити дані. Спробуйте пізніше.');
            } finally {
                setIsLoading(false);
            }
        };

        loadApplications();
    }, []);

    if (isLoading) {
        return (
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h5" sx={{ color: '#001f3f' }}>
                    Завантаження заявок...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
                <Button onClick={() => window.location.reload()} sx={{ mt: 2 }}>
                    Оновити сторінку
                </Button>
            </Container>
        );
    }

    if (!isLoading && !error && reservations.length === 0) {
        return (
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h3" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                    Мої заявки
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    Наразі у вас немає активних заявок.
                </Typography>
                <Button
                    variant="contained"
                    onClick={onNewApplication}
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
                    Подати першу заявку
                </Button>
            </Container>
        );
    }
    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            {/* Заголовок сторінки */}
            <Typography variant="h3" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Мої заявки
            </Typography>

            {/* Сітка з картками заявок */}
            <Grid container spacing={3}>
                {reservations.map((reservation) => (
                    <Grid item xs={12} sm={6} md={4} key={reservation.reservationId}>
                        <ApplicationCard {...reservation} onStatusView={onStatusView} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Button
                    variant="contained"
                    onClick={onNewApplication}
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