import { useState } from 'react';
import ApplicationForm from "./src/components/ApplicationForm"; 
import ConfirmationPage from "./src/pages/ConfirmationPage"; 
import StatusPage from "./src/pages/StatusPage"; 
// import ApplicationsList from "./src/components/ApplicationsList";
import { CssBaseline, Box, Typography, Button } from "@mui/material";

function App() {
    // Початковий стан: 'form'
    const [currentPage, setCurrentPage] = useState('form');
    const [currentReservationId, setCurrentReservationId] = useState(null);
    
    // 1. З форми до підтвердження 
    const handleFormSubmit = (reservationId) => {
        setCurrentReservationId(reservationId);
        setCurrentPage('confirmation');
    };

    // 2. З підтвердження до статусу
    const handleViewStatus = () => {
        setCurrentPage('status');
    };

    let PageContent;

    switch (currentPage) {
        case 'form':
            PageContent = <ApplicationForm onSuccess={handleFormSubmit} />;
            break;
        case 'confirmation':
            PageContent = <ConfirmationPage onViewStatus={handleViewStatus} />;
            break;
        case 'status':
            PageContent = <StatusPage reservationId={currentReservationId} />;
            break;
        default:
            PageContent = <ApplicationForm onSuccess={handleFormSubmit} />;
    }

    return (
        <>
            <CssBaseline /> 
            
            <Box sx={{ bgcolor: '#001f3f', color: 'white', p: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>LNU DormStay</Typography>
                
                {/* Тимчасова кнопка для скидання стану на 'form' */}
                {currentPage !== 'form' && (
                    <Button 
                        onClick={() => setCurrentPage('form')} 
                        sx={{ ml: 'auto', color: 'white', border: '1px solid white' }}
                        size="small"
                        variant="outlined"
                    >
                        Початок
                    </Button>
                )}
            </Box>
            
            {PageContent}
        </>
    );
}

export default App;