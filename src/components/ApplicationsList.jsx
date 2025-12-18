import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import ApplicationCard from './ApplicationCard';


const ApplicationsList = ({ userId, onNewApplication, onStatusView }) => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
                setIsLoading(false);
                setError('Не вдалося визначити користувача. Перевірте статус входу.');
                return;
        }
        
        const loadApplications = async () => {
            try {
                setIsLoading(true);
                const apiUrl = `https://localhost:7193/api/reservations?userId=${userId}`;
                const response = await axios.get(apiUrl);
                setReservations(response.data);
            } catch (err) {
                console.error("Помилка завантаження заявок:", err);
                setError('Не вдалося завантажити дані. Спробуйте пізніше.');
                setReservations([]); // Очищуємо список у разі помилки
            } finally {
                setIsLoading(false);
            }
        };

        loadApplications();
    }, [userId]);

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