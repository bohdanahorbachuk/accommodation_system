import { useState , useEffect} from 'react';
import axios from 'axios';
import { Container, Grid, Typography, TextField, Button, Box, Paper, FormControl, Select, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReturnButton from '../../components/ReturnButton';

const ApplicationFormPage = ({ userId, onSuccess, onBack }) => {
    const [room, setRoom] = useState('');
    const [place, setPlace] = useState('');
    const [reason, setReason] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const [availableOptions, setAvailableOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const dateToISO = (dateString) => {
        if (!dateString) return null;
        
        const date = new Date(dateString + 'T00:00:00.000Z');
        
        return date.toISOString();
    };

    useEffect(() => {
        const fetchAvailable = async () => {
            if (checkInDate && checkOutDate) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://localhost:7193/api/reservations/available-options`, {
                        params: { startDate: dateToISO(checkInDate), endDate: dateToISO(checkOutDate) }
                    });
                    setAvailableOptions(response.data);
                } catch (error) {
                    console.error("Помилка завантаження кімнат", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAvailable();
    }, [checkInDate, checkOutDate]);

    const inputStyle = {
        '& .MuiInputBase-root': {
            borderRadius: '8px',
            backgroundColor: '#f0f0f0', // Світло-сірий фон
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f0f0f0', // Прибрати видимий бордер, якщо він стандартний
        },
        marginBottom: 2, // Відступ знизу для кожного поля
    };
    
    const handleSubmit = async (e) => {
        const postData = {
            userId: userId,
            roomId: room,
            bedId: place,
            reservationReason: reason,
            reservationStartDate: dateToISO(checkInDate),
            reservationEndDate: dateToISO(checkOutDate)
        };

        var newReservationId = null

        try {
            const response = await axios.post('https://localhost:7193/api/reservations', postData);

            newReservationId = response.data.reservationId;

        } catch (error) {
            console.log(`Помилка під час надсилання: ${error.message}`);
        }

        setRoom('');
        setReason('');
        setPlace('');
        setCheckInDate('');
        setCheckOutDate('');

        if (newReservationId) {
            onSuccess(newReservationId); 
        } else {
            console.error("Помилка: Не вдалося отримати reservationId з відповіді.");
        }
    };

    const currentRoomData = availableOptions.find(r => r.roomId === room);
    const availableBeds = currentRoomData ? currentRoomData.availableBeds : [];

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', overflow: 'hidden' }}>
                {/* Заголовок */}
                <Typography variant="h4" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 3 }}>
                    Подача заявки
                </Typography>

                <Grid container spacing={4} columns={{ xs: 2 }}>
                    {/* Ліва колонка */}
                    <Grid size={{ xs: 1 }}>
                        {/* Період поселення */}
                        <Typography variant="subtitle1" fontWeight="bold">Дата заселення</Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Дата заселення"
                            size="small"
                            type="date"
                            sx={inputStyle}
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />

                        {/* Обрати кімнату */}
                        <Typography variant="subtitle1" fontWeight="bold">Обрати кімнату</Typography>
                        <FormControl fullWidth size="small" sx={inputStyle}>
                            <Select
                                value={room}
                                displayEmpty
                                disabled={!checkInDate || !checkOutDate || loading}
                                onChange={(e) => {
                                    setRoom(e.target.value);
                                    setPlace('');
                                }}
                            >
                                <MenuItem value="" disabled>Оберіть кімнату</MenuItem>
                                {availableOptions.map((opt) => (
                                    <MenuItem key={opt.roomId} value={opt.roomId}>Кімната №{opt.roomNumber}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Причина бронювання */}
                        <Typography variant="subtitle1" fontWeight="bold">Причина бронювання</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputStyle}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Grid>

                    {/* Права колонка */}
                    <Grid size={{ xs: 1 }}>

                        {/* Період поселення */}
                        <Typography variant="subtitle1" fontWeight="bold">Дата виселення</Typography>

                        {/* Дата виселення */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Дата виселення"
                            size="small"
                            type ="date"
                            sx={inputStyle}
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />

                        {/* Обрати місце */}
                        <Typography variant="subtitle1" fontWeight="bold">Обрати місце</Typography>
                        <FormControl fullWidth size="small" sx={inputStyle}>
                            <Select
                                value={place}
                                displayEmpty
                                disabled={!room}
                                onChange={(e) => setPlace(e.target.value)}
                            >
                                <MenuItem value="" disabled>Оберіть місце</MenuItem>
                                {availableBeds.map((bed) => (
                                    <MenuItem key={bed.bedId} value={bed.bedId}>Місце №{bed.bedNumber}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={4} columns={{ xs: 2 }}>
                    <Grid size={{ xs: 1 }}>
                        {/* Адреса гуртожитку та кнопка */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" sx={{ color: '#8b0000', mb: 1 }}>
                                Гуртожиток знаходиться за адресою <br/> вул. Медової печери, 39В
                            </Typography>
                            <Button
                                variant="contained"
                                // Додано обробник кліку, який викликає handleSubmit
                                onClick={handleSubmit} 
                                sx={{
                                    backgroundColor: '#001f3f', // Темно-синій колір
                                    '&:hover': {
                                        backgroundColor: '#003366',
                                    },
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '10px 30px',
                                    borderRadius: '8px',
                                    width: '100%',
                                }}
                            >
                                Подати заявку
                            </Button>

                            <ReturnButton onClick={onBack} />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 1 }}>
                        {/* Блок з карткою "APPLY" */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '150px', // Висота для імітації блоку на зображенні
                                mt: 3,
                            }}
                        >
                            {/* Імітація картки - для реального використання потрібен SVG або зображення */}
                            <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon sx={{ fontSize: 40, color: '#001f3f' }} />
                                    <Box sx={{ ml: 2 }}>
                                        <Box sx={{ width: 100, height: 5, bgcolor: '#ccc', mb: 1 }} />
                                        <Box sx={{ width: 80, height: 5, bgcolor: '#ccc', mb: 1 }} />
                                        <Box sx={{ width: 120, height: 5, bgcolor: '#ccc' }} />
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                backgroundColor: '#ffb300', // Жовтий колір
                                                '&:hover': { backgroundColor: '#e69900' },
                                                color: '#001f3f',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                borderRadius: '5px',
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            </Container>
    );
}

export default ApplicationFormPage;