import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'; // App.jsx знаходиться поруч з AppRouter.jsx у папці src/
import StatusPage from './components/StatusPage'; // ВИПРАВЛЕНО: StatusPage знаходиться у src/components/
import { CssBaseline, Box, Typography } from "@mui/material";

// Обгортка для StatusPage, щоб додати шапку
const StatusCheckWrapper = () => (
    <>
        <CssBaseline />
        {/* Шапка тут (якщо AppRouter відповідає за зовнішній вигляд) */}
        <Box sx={{ bgcolor: '#001f3f', color: 'white', p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>LNU DormStay</Typography>
        </Box>
        {/* Рендеринг StatusPage */}
        <StatusPage /> 
    </>
);

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Основний потік: Мої заявки -> Форма -> Підтвердження -> Статус */}
                <Route path="/" element={<App />} />
                
                {/* 2. Тимчасовий шлях для прямого тестування StatusPage */}
                <Route path="/status-check" element={<StatusCheckWrapper />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;