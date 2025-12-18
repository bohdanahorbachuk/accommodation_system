import { CheckCircle, Cancel, NewReleases } from '@mui/icons-material';
import { 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Button, 
    Chip
} from '@mui/material';

const ApplicationCard = ({ reservationId, createdAt, reservationStartDate, reservationStatusName, onStatusView }) => {
    const DateDisplay = (dateString) => {
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        return formattedDate;
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Прийнято':
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
            case 'Створено':
            default:
                return {
                    color: '#2196f3',
                    bgcolor: '#e3f2fd',
                    icon: <NewReleases sx={{ fontSize: 16, mr: 0.5 }} />
                };
        }
    };

    const statusConfig = getStatusConfig(reservationStatusName);

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
                        label={reservationStatusName}
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

export default ApplicationCard;