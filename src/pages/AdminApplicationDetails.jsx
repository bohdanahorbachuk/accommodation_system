import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Button, 
    CircularProgress, 
    Stack,
    TextField
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import ReturnButton from '../components/ReturnButton';

const AdminApplicationDetails = ({ reservationId, onBack }) => {
    const [applicationData, setApplicationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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

    const updateStatus = async (statusId, statusName) => {
        try {
            const payload = {
                statusId: statusId,
                adminComment: comment
            };

            await axios.put(`https://localhost:7193/api/reservations/${reservationId}`, payload);

            // Update local state to reflect changes without a full refresh
            setApplicationData({
                ...applicationData,
                reservationStatusName: statusName,
                adminComment: comment // assuming you want to store the comment locally too
            });
            
            setIsEditing(false);
            setComment('');
            alert("Статус успішно оновлено");
        } catch (err) {
            console.error("Update error:", err);
            alert("Помилка при збереженні даних.");
        } finally {
        }
    };

    // 3. Action Handlers mapping to your specific Status IDs
    const handleApprove = () => {
        updateStatus(3, 'Схвалено'); 
    };

    const handleReject = () => {
        updateStatus(4, 'Відхилено');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setComment('');
    };

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

    if (!applicationData) {
        return <Typography color="error" align="center" sx={{ mt: 4 }}>Дані заявки не знайдено</Typography>;
    }

    // Перевірка, чи заявка вже оброблена
    const isProcessed = applicationData.reservationStatusName === 'Схвалено' || 
                        applicationData.reservationStatusName === 'Прийнято' ||
                        applicationData.reservationStatusName === 'Відхилено';

    // Визначення кольору статусу
    let statusColor;
    let statusIcon;
    if (applicationData.reservationStatusName === 'Схвалено' || applicationData.reservationStatusName === 'Прийнято') {
        statusColor = '#4caf50';
        statusIcon = <CheckCircleIcon sx={{ fontSize: 18, mr: 0.5 }} />;
    } else if (applicationData.reservationStatusName === 'Відхилено') {
        statusColor = '#f44336';
        statusIcon = <CancelIcon sx={{ fontSize: 18, mr: 0.5 }} />;
    } else {
        statusColor = '#2196f3';
        statusIcon = <CheckIcon sx={{ fontSize: 18, mr: 0.5 }} />;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Деталі заявки
            </Typography>

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
                    Кімната № {applicationData.roomId}, місце № {applicationData.bedId}
                </Typography>
                <Typography variant="body1" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                    {applicationData.phoneNumber}
                </Typography>

                {/* Дата поселення */}
                <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                    Дата поселення
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                    {applicationData.reservationStartDate}
                </Typography>

                {/* Дата виселення */}
                <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                    Дата виселення
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#001f3f', mb: 2 }}>
                    {applicationData.reservationEndDate}
                </Typography>

                <Typography variant="body1" sx={{ color: '#001f3f', mb: 0.5 }}>
                    Статус
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
                    {statusIcon}
                    {applicationData.reservationStatusName}
                </Box>

                {/* Коментар та кнопки дій (для нових заявок або в режимі редагування) */}
                {(!isProcessed || isEditing) && (
                    <>
                        {/* Коментар (опціонально) */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Коментар (опціонально)"
                                placeholder="Залиште коментар до заявки..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        bgcolor: 'white',
                                    }
                                }}
                            />
                        </Box>

                        {/* Кнопки дій для адміністратора */}
                        <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
                            {/* Кнопка "Прийняти" - показуємо якщо не схвалено або редагуємо відхилену */}
                            {(!isEditing && applicationData.reservationStatusName !== 'Схвалено') || 
                             (isEditing && applicationData.reservationStatusName === 'Відхилено') ? (
                                <Button
                                    variant="contained"
                                    startIcon={<CheckCircleIcon />}
                                    onClick={handleApprove}
                                    sx={{
                                        flex: 1,
                                        bgcolor: '#4caf50',
                                        '&:hover': { bgcolor: '#45a049' },
                                        color: 'white',
                                        fontWeight: 'bold',
                                        py: 1.5,
                                        borderRadius: '8px',
                                        textTransform: 'none'
                                    }}
                                >
                                    {isEditing && applicationData.reservationStatusName === 'Відхилено' ? 'Змінити на Схвалено' : 'Прийняти заявку'}
                                </Button>
                            ) : null}
                            
                            {/* Кнопка "Відхилити" - показуємо якщо не відхилено або редагуємо схвалену */}
                            {(!isEditing && applicationData.reservationStatusName !== 'Відхилено') || 
                             (isEditing && applicationData.reservationStatusName === 'Прийнято') ? (
                                <Button
                                    variant="contained"
                                    startIcon={<CancelIcon />}
                                    onClick={handleReject}
                                    sx={{
                                        flex: 1,
                                        bgcolor: '#f44336',
                                        '&:hover': { bgcolor: '#da190b' },
                                        color: 'white',
                                        fontWeight: 'bold',
                                        py: 1.5,
                                        borderRadius: '8px',
                                        textTransform: 'none'
                                    }}
                                >
                                    {isEditing && applicationData.reservationStatusName === 'Прийнято' ? 'Змінити на Відхилено' : 'Відхилити заявку'}
                                </Button>
                            ) : null}
                            
                            {isEditing && (
                                <Button
                                    variant="outlined"
                                    onClick={handleCancelEdit}
                                    sx={{
                                        borderColor: '#001f3f',
                                        color: '#001f3f',
                                        '&:hover': {
                                            borderColor: '#003366',
                                            bgcolor: 'rgba(0, 31, 63, 0.04)'
                                        },
                                        fontWeight: 'bold',
                                        py: 1.5,
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        minWidth: 120
                                    }}
                                >
                                    Скасувати
                                </Button>
                            )}
                        </Stack>
                    </>
                )}

                {/* Кнопка редагування для оброблених заявок */}
                {isProcessed && !isEditing && (
                    <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            fullWidth
                            sx={{
                                bgcolor: '#001f3f',
                                '&:hover': { bgcolor: '#003366' },
                                color: 'white',
                                fontWeight: 'bold',
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none'
                            }}
                        >
                            Редагувати
                        </Button>
                    </Stack>
                )}

                {/* Кнопка повернення */}
                <ReturnButton onClick={onBack} />
            </Paper>
        </Container>
    );
}

export default AdminApplicationDetails;

