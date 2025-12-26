import { CheckCircle, Cancel, NewReleases } from '@mui/icons-material';

export const getStatusConfig = (status) => {
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