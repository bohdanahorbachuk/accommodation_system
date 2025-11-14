// App.jsx (Файл у корені, зі скоригованими шляхами до src/components)

import React, { useState } from 'react';
import ApplicationForm from "./src/components/ApplicationForm"; 
import ConfirmationPage from "./src/components/ConfirmationPage"; 
import StatusPage from "./src/components/StatusPage"; 
// import ApplicationsList from "./src/components/ApplicationsList"; // ВИДАЛЕНО
import { CssBaseline, Box, Typography, Button } from "@mui/material";

function App() {
    // Початковий стан: 'form'
    const [currentPage, setCurrentPage] = useState('form'); 
    
    // Ми більше не потребуємо currentApplicationId, оскільки StatusPage використовує заглушки

    // --- Функції переходу ---
    
    // 1. З форми до підтвердження 
    const handleFormSubmit = () => {
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
            PageContent = <StatusPage />;
            break;
        default:
            // Якщо щось піде не так, показуємо форму
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