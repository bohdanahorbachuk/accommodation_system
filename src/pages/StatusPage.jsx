// src/pages/StatusPage.jsx (ОНОВЛЕНО)

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, Paper, Button, CircularProgress } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';

// Додаємо onViewList до пропсів
const StatusPage = ({ reservationId, onViewList }) => { 
    const [applicationData, setApplicationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Стилі для кнопки "Повернутись до списку"
    const backButtonStyle = {
        mt: 4,
        borderColor: '#001f3f',
        color: '#001f3f',
        '&:hover': {
            borderColor: '#003366',
            color: '#003366',
            bgcolor: 'rgba(0,31,63,0.05)',
        },
        fontWeight: 'bold',
        padding: '10px 30px',
        borderRadius: '8px',
        textTransform: 'none',
    };

    useEffect(() => {
        if (!reservationId || reservationId == null) {
            // Тимчасова заглушка для відображення, якщо ID немає
            setApplicationData({
                fullName: 'Тестовий Користувач',
                phoneNumber: '+38066XXXXXXX',
                roomId: 101,
                bedId: 1,
                reservationStartDate: '2025-12-01',
                reservationEndDate: '2026-06-30',
                reservationStatusName: 'Створено',
            });
            setError("ID заявки не знайдено. Відображено заглушку.");
            setLoading(false);
            return;
        }

        const fetchReservationDetails = async () => {
            try {
                // ... (API запит залишається без змін) ...
                const response = await axios.get(`https://localhost:7193/api/reservations/${reservationId}`);
                setApplicationData(response.data);
                setError(null);
            } catch (err) {
                console.error("Помилка при отриманні деталей:", err);
                setError("Не вдалося завантажити деталі заявки.");
                // Тимчасова заглушка для перевірки вигляду сторінки
                setApplicationData({
                    fullName: 'Тестовий Користувач',
                    phoneNumber: '+38066XXXXXXX',
                    roomId: 101,
                    bedId: 1,
                    reservationStartDate: '2025-12-01',
                    reservationEndDate: '2026-06-30',
                    reservationStatusName: 'Створено',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchReservationDetails();
    }, [reservationId]);

    // ... (Loading та Error рендеринг залишається) ...

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    let statusColor;
    if (applicationData.reservationStatusName === 'Прийнято') {
        statusColor = '#4caf50';
    } else if (applicationData.reservationStatusName === 'Створено') {
        statusColor = '#ff9800';
    } else {
        statusColor = '#f44336';
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            {/* ... (Заголовок та Картка з даними залишаються без змін) ... */}
            <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Деталі заявки
            </Typography>

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', bgcolor: '#f0f0f0' }}>
                         {/* ... (Існуючі поля ПІБ, Дати, Статус) ... */}
                        
                        {/* Кнопка завантаження PDF */}
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#8b0000',
                                '&:hover': { bgcolor: '#6e0000' },
                                color: 'white',
                                fontWeight: 'bold',
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                mt: 3, // Відступ зверху
                                mb: 2,
                            }}
                            fullWidth
                            onClick={() => console.log('Завантаження PDF...')}
                        >
                            Завантажити підтвердження про поселення (PDF)
                        </Button>
                        
                        {/* НОВА КНОПКА: Повернутись до списку заявок */}
                        <Button
                            variant="outlined"
                            onClick={onViewList} // <--- КЛЮЧОВА ЗМІНА
                            sx={backButtonStyle}
                            fullWidth
                        >
                            Повернутись до списку заявок
                        </Button>
                    </Paper>
                </Grid>

                {/* Права частина: Ілюстрація будівлі */}
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative', width: '100%', maxWidth: 300, height: 300 }}>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default StatusPage;