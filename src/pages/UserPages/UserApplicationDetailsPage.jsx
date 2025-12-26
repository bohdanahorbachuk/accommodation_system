import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, Paper, Button, CircularProgress, Chip, Tooltip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ReturnButton from '../../components/ReturnButton';
import { formatDate } from '../../utils/dateUtils';
import { getStatusConfig } from '../../utils/statusUtils';

const UserApplicationDetailsPage = ({ reservationId, onBack }) => {
    const [applicationData, setApplicationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!reservationId || reservationId == null) {
            setError("ID заявки не знайдено.");
            setLoading(false);
            return;
        }

        const fetchReservationDetails = async () => {
            try {
                const response = await axios.get(`https://localhost:7193/api/reservations/${reservationId}`);
                setApplicationData(response.data);
                setError(null);
            } catch (err) {
                console.error("Помилка при отриманні деталей:", err);
                setError("Не вдалося завантажити деталі заявки.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservationDetails();
    }, [reservationId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>;
    }

    const statusConfig = getStatusConfig(applicationData.reservationStatusName);

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Деталі заявки
            </Typography>

            <Grid container spacing={4} alignItems="center">
                {/* Ліва частина: Картка з даними */}
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', bgcolor: '#f0f0f0' }}>
                        {/* Блок ПІБ */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, bgcolor: 'white', borderRadius: '8px' }}>
                            <DescriptionIcon sx={{ color: '#001f3f', fontSize: 30, mr: 1 }} />
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#001f3f' }}>
                                {applicationData.fullName}
                            </Typography>
                        </Box>

                        {/* Інформація про кімнату та телефон */}
                        <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                            Кімната № {applicationData.roomNumber}, місце № {applicationData.bedNumber}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                            {applicationData.phoneNumber}
                        </Typography>

                        {/* Дата поселення */}
                        <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                            Дата поселення
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                            {formatDate(applicationData.reservationStartDate)}
                        </Typography>

                         {/* Дата виселення */}
                        <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                            Дата виселення
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                            {formatDate(applicationData.reservationEndDate)}
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                            Статус
                        </Typography>
                        
                        {/* Статус */}
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                            <Tooltip 
                                title={applicationData.adminComment} 
                                arrow 
                                placement="right"
                                enterDelay={150}
                                slotProps={{
                                    tooltip: {
                                    sx: {
                                        bgcolor: statusConfig.color,
                                        color: '#ffffff',
                                        fontSize: '0.7rem',
                                        boxShadow: 3, 
                                        p: 1.5, 
                                        '& .MuiTooltip-arrow': {
                                        color: statusConfig.color,
                                        },
                                    },
                                    },
                                }}
                            >
                                <Chip
                                    icon={statusConfig.icon}
                                    label={applicationData.reservationStatusName}
                                    sx={{
                                        bgcolor: statusConfig.bgcolor,
                                        color: statusConfig.color,
                                        fontWeight: 'bold',
                                        border: `1px solid ${statusConfig.color}`,
                                        fontSize: '1.1rem',
                                        height: 28,
                                        '& .MuiChip-icon': {
                                            color: statusConfig.color,
                                            fontSize: 20
                                        }
                                    }}
                                    size="small"
                                />
                            </Tooltip>
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

                        <ReturnButton onClick={onBack} />
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

export default UserApplicationDetailsPage;