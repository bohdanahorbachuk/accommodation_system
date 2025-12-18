import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, 
    Grid, 
    Typography, 
    Box,
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
} from '@mui/material';
import { Sort as SortIcon, FilterList as FilterListIcon} from '@mui/icons-material';
import ApplicationCard from '../../components/ApplicationCard';

const AdminApplicationsListPage = ({ onStatusView }) => {
    const StatusMap = {
        New: 1,
        Approved: 3,
        Rejected: 4,
        All: null
    };

    const [reservations, setReservations] = useState([]);
    const [filteredAndSortedReservations, setFilteredAndSortedReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('dateDesc'); // 'dateDesc', 'dateAsc', 'createdDesc', 'createdAsc'
    const [statusFilter, setStatusFilter] = useState(StatusMap.New); 

    
     useEffect(() => {        
        const loadApplications = async () => {
            try {
                setIsLoading(true);
                const queryParam = statusFilter !== null ? `?statusId=${statusFilter}` : '';
                const apiUrl = `https://localhost:7193/api/reservations${queryParam}`;
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
    }, [statusFilter]);


    // Фільтрація та сортування заявок
    useEffect(() => {
        if (reservations.length === 0) {
            setFilteredAndSortedReservations([]);
            return;
        }

        // Фільтрація за статусом
        let filtered = [...reservations];
        if (statusFilter !== 'Всі') {
            filtered = reservations.filter(res => res.reservationStatusName === statusFilter);
        }

        // Сортування
        const sorted = filtered.sort((a, b) => {
            switch (sortBy) {
                case 'dateDesc':
                    return new Date(b.reservationStartDate) - new Date(a.reservationStartDate);
                case 'dateAsc':
                    return new Date(a.reservationStartDate) - new Date(b.reservationStartDate);
                case 'createdDesc':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'createdAsc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return 0;
            }
        });

        setFilteredAndSortedReservations(sorted);
    }, [reservations, sortBy, statusFilter]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

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
                    Всі заявки
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    Наразі немає жодних заявок.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
            {/* Заголовок сторінки */}
            <Typography variant="h3" component="h1" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 4 }}>
                Всі заявки
            </Typography>
            
            {/* Фільтри та сортування */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                {/* Фільтр за статусом */}
                <FormControl 
                    variant="outlined" 
                    sx={{ 
                        minWidth: 200,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        }
                    }}
                >
                    <InputLabel id="filter-select-label">Фільтр за статусом</InputLabel>
                    <Select
                        labelId="filter-select-label"
                        id="filter-select"
                        value={statusFilter ?? ''} // Тут тепер буде зберігатися ID (наприклад, 1, 2)
                        onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
                        label="Фільтр за статусом"
                        startAdornment={<FilterListIcon sx={{ mr: 1, color: '#001f3f' }} />}
                    >
                        <MenuItem value={1}>Нові</MenuItem>
                        <MenuItem value={3}>Схвалені</MenuItem>
                        <MenuItem value={4}>Відхилені</MenuItem>
                        <MenuItem value="">Всі заявки</MenuItem> 
                    </Select>
                </FormControl>
                
                {/* Селектор сортування */}
                <FormControl 
                    variant="outlined" 
                    sx={{ 
                        minWidth: 250,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        }
                    }}
                >
                    <InputLabel id="sort-select-label">Сортувати за</InputLabel>
                    <Select
                        labelId="sort-select-label"
                        id="sort-select"
                        value={sortBy}
                        onChange={handleSortChange}
                        label="Сортувати за"
                        startAdornment={<SortIcon sx={{ mr: 1, color: '#001f3f' }} />}
                    >
                        <MenuItem value="dateDesc">Дата початку (новіші спочатку)</MenuItem>
                        <MenuItem value="dateAsc">Дата початку (старіші спочатку)</MenuItem>
                        <MenuItem value="createdDesc">Дата створення (новіші спочатку)</MenuItem>
                        <MenuItem value="createdAsc">Дата створення (старіші спочатку)</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Сітка з картками заявок */}
            <Grid container spacing={3}>
                {reservations.map((reservation) => (
                    <Grid item xs={12} sm={6} md={4} key={reservation.reservationId}>
                        <ApplicationCard {...reservation} onStatusView={onStatusView} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AdminApplicationsListPage;

