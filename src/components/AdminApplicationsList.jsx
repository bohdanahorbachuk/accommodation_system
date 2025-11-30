import { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Chip
} from '@mui/material';
import { Sort as SortIcon, FilterList as FilterListIcon, CheckCircle, Cancel, NewReleases } from '@mui/icons-material';

const DateDisplay = (dateString) => {
  const dateObject = new Date(dateString);

  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};

const ApplicationCard = ({ reservationId, createdAt, reservationStartDate, reservationStatusName, onStatusView }) => {
    // Визначення кольору та іконки для статусу
    const getStatusConfig = (status) => {
        switch (status) {
            case 'Схвалено':
                return {
                    color: '#4caf50',
                    bgcolor: '#e8f5e9',
                    icon: <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />
                };
            case 'Відхилено':
                return {
                    color: '#f44336',
                    bgcolor: '#ffebee',
                    icon: <Cancel sx={{ fontSize: 16, mr: 0.5 }} />
                };
            case 'Нова':
            default:
                return {
                    color: '#2196f3',
                    bgcolor: '#e3f2fd',
                    icon: <NewReleases sx={{ fontSize: 16, mr: 0.5 }} />
                };
        }
    };

    const statusConfig = getStatusConfig(reservationStatusName || 'Нова');

    return (
        <Card 
            sx={{ 
                borderRadius: '12px', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: 3,
                minHeight: 220
            }}
        >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 1.5 }}>
                    Заявка на поселення {DateDisplay(createdAt)}
                </Typography>
                
                {/* Головна дата */}
                <Typography variant="h5" component="div" sx={{ color: '#001f3f', fontWeight: 'bold', mb: 2 }}>
                    {DateDisplay(reservationStartDate)}
                </Typography>
                
                {/* Статус */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <Chip
                        icon={statusConfig.icon}
                        label={reservationStatusName || 'Нова'}
                        sx={{
                            bgcolor: statusConfig.bgcolor,
                            color: statusConfig.color,
                            fontWeight: 'bold',
                            border: `1px solid ${statusConfig.color}`,
                            fontSize: '0.75rem',
                            height: 28,
                            '& .MuiChip-icon': {
                                color: statusConfig.color,
                                fontSize: 16
                            }
                        }}
                        size="small"
                    />
                </Box>
                
                {/* Кнопка статусу */}
                <Button 
                    variant="outlined" 
                    onClick={() => onStatusView(reservationId)}
                    fullWidth
                    sx={{ 
                        borderColor: '#001f3f',
                        color: '#001f3f',
                        mt: 'auto',
                        '&:hover': {
                            borderColor: '#003366',
                            bgcolor: 'rgba(0, 31, 63, 0.04)'
                        }
                    }}
                >
                    Переглянути заявку
                </Button>
            </CardContent>
        </Card>
    );
};

// Компонент сторінки "Всі заявки" для адміністратора
const AdminApplicationsList = ({ onStatusView }) => {
    const [reservations, setReservations] = useState([]);
    const [filteredAndSortedReservations, setFilteredAndSortedReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('dateDesc'); // 'dateDesc', 'dateAsc', 'createdDesc', 'createdAsc'
    const [statusFilter, setStatusFilter] = useState('Нова'); // 'Нова', 'Схвалено', 'Відхилено', 'Всі'

    useEffect(() => {
        // Захардкоджений список заявок
        const hardcodedReservations = [
            {
                reservationId: 1,
                createdAt: '2024-01-15T10:30:00Z',
                reservationStartDate: '2024-02-01T00:00:00Z',
                reservationStatusName: 'Нова'
            },
            {
                reservationId: 2,
                createdAt: '2024-01-20T14:20:00Z',
                reservationStartDate: '2024-02-15T00:00:00Z',
                reservationStatusName: 'Схвалено'
            },
            {
                reservationId: 3,
                createdAt: '2024-01-10T09:15:00Z',
                reservationStartDate: '2024-01-25T00:00:00Z',
                reservationStatusName: 'Відхилено'
            },
            {
                reservationId: 4,
                createdAt: '2024-01-25T16:45:00Z',
                reservationStartDate: '2024-03-01T00:00:00Z',
                reservationStatusName: 'Нова'
            },
            {
                reservationId: 5,
                createdAt: '2024-01-05T11:00:00Z',
                reservationStartDate: '2024-01-20T00:00:00Z',
                reservationStatusName: 'Схвалено'
            },
            {
                reservationId: 6,
                createdAt: '2024-01-30T13:30:00Z',
                reservationStartDate: '2024-03-15T00:00:00Z',
                reservationStatusName: 'Відхилено'
            }
        ];

        setIsLoading(true);
        // Симулюємо затримку завантаження
        setTimeout(() => {
            setReservations(hardcodedReservations);
            setIsLoading(false);
        }, 500);
    }, []);

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
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        label="Фільтр за статусом"
                        startAdornment={<FilterListIcon sx={{ mr: 1, color: '#001f3f' }} />}
                    >
                        <MenuItem value="Нова">Нові</MenuItem>
                        <MenuItem value="Схвалено">Схвалені</MenuItem>
                        <MenuItem value="Відхилено">Відхилені</MenuItem>
                        <MenuItem value="Всі">Всі заявки</MenuItem>
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
            {filteredAndSortedReservations.length === 0 ? (
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                    Заявок з обраним статусом не знайдено
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredAndSortedReservations.map((reservation) => (
                        <Grid item xs={12} sm={6} md={4} key={reservation.reservationId}>
                            <ApplicationCard {...reservation} onStatusView={onStatusView} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default AdminApplicationsList;

