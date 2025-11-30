// App.jsx (ЧИСТА ВЕРСІЯ З ІНТЕГРАЦІЄЮ FOOTER)

import React, { useState } from 'react'; 
import { CssBaseline, Box, Typography } from "@mui/material"; // Додано Typography для заглушки

// ІМПОРТИ
import HomePage from "./src/pages/HomePage"; 
import ApplicationForm from "./src/components/ApplicationForm"; 
import ConfirmationPage from "./src/pages/ConfirmationPage"; 
import StatusPage from "./src/pages/StatusPage"; 
import ApplicationsList from "./src/components/ApplicationsList";
import Header from "./src/components/Header"; 
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import Footer from "./src/components/Footer"; // ІМПОРТ ФУТЕРА

const USER_ROLES = {
    STUDENT: 1,
    // ADMIN: 2, // ВИДАЛЕНО
};

const PAGE_STATES = {
    HOME: 'home',
    LOGIN: 'login',
    REGISTER: 'register',
    LIST: 'list',
    FORM: 'form',
    CONFIRMATION: 'confirmation',
    STATUS: 'status',
    // ADMIN_DASHBOARD: 'admin_dashboard', // ВИДАЛЕНО
    FAQ: 'faq' // Стан для сторінки Поширених запитань
};

function App() {
    // ТИМЧАСОВА ЗМІНА: Форсуємо сторінку HOME (або LOGIN)
    const [currentPage, setCurrentPage] = useState(PAGE_STATES.LOGIN); 
    
    const [currentReservationId, setCurrentReservationId] = useState(null);
    const [authData, setAuthData] = useState(null); 
    
    // --- Допоміжні змінні ---
    const isLoggedIn = !!authData; 
    // const isAdmin = false; // Більше не потрібно
    
    // --- Функції перемикання ---
    
    const handleViewHome = () => { setCurrentPage(PAGE_STATES.HOME); };
    const handleLogout = () => { setAuthData(null); setCurrentPage(PAGE_STATES.HOME); };
    const handleLoginClick = () => { setCurrentPage(PAGE_STATES.LOGIN); };
    const handleRegisterClick = () => { setCurrentPage(PAGE_STATES.REGISTER); };
    
    const handleLoginSuccess = (data) => {
        setAuthData(data); 
        // Після входу завжди ведемо на список заявок (LIST)
        setCurrentPage(PAGE_STATES.LIST);
    };
    
    const handleRegisterSuccess = () => { setCurrentPage(PAGE_STATES.HOME); };
    const handleNewApplication = () => { setCurrentPage(PAGE_STATES.FORM); setCurrentReservationId(null); };
    const handleViewList = () => { setCurrentPage(PAGE_STATES.LIST); };
    const handleFormSubmit = (reservationId) => { setCurrentReservationId(reservationId); setCurrentPage(PAGE_STATES.CONFIRMATION); };
    const handleViewStatus = (reservationId) => {
        if (reservationId) setCurrentReservationId(reservationId);
        setCurrentPage(PAGE_STATES.STATUS);
    };
    const handleForgotPassword = () => { console.log("Перехід до відновлення пароля"); };
    
    // НОВА ФУНКЦІЯ: Перехід на сторінку Поширених запитань
    const handleFaqClick = () => {
        setCurrentPage(PAGE_STATES.FAQ);
    };
    
    // --- Відображення сторінки ---

    let PageContent;

    switch (currentPage) {
        case PAGE_STATES.HOME:
            PageContent = <HomePage onStartApplication={handleRegisterClick} />;
            break;
        case PAGE_STATES.LOGIN:
            PageContent = <LoginPage 
                            onLoginSuccess={handleLoginSuccess} 
                            onForgotPassword={handleForgotPassword}
                            onRegisterClick={handleRegisterClick}
                          />;
            break;
        case PAGE_STATES.REGISTER:
            PageContent = <RegisterPage 
                            onRegisterSuccess={handleRegisterSuccess} 
                            onLoginClick={handleLoginClick}
                          />;
            break;
        case PAGE_STATES.FORM:
            PageContent = <ApplicationForm userId={authData?.userId} onSuccess={handleFormSubmit} />;
            break;
        case PAGE_STATES.CONFIRMATION:
            PageContent = <ConfirmationPage onViewStatus={handleViewStatus} onViewList={handleViewList} />; 
            break;
        case PAGE_STATES.STATUS:
            PageContent = <StatusPage reservationId={currentReservationId} onViewList={handleViewList} />; 
            break;
        case PAGE_STATES.LIST:
            PageContent = <ApplicationsList userId={authData?.userId} onNewApplication={handleNewApplication} onStatusView={handleViewStatus} />;
            break;
        case PAGE_STATES.FAQ: // НОВИЙ CASE ДЛЯ FOOTER
            PageContent = <Typography variant="h3" sx={{ m: 5, textAlign: 'center' }}>Поширені запитання (FAQ) - TODO</Typography>;
            break;
        default:
            PageContent = <HomePage onStartApplication={handleRegisterClick} />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline /> 
            
            {/* 1. HEADER (Надсилаємо лише потрібні пропси) */}
            <Header 
                isLoggedIn={isLoggedIn}
                currentPage={currentPage}
                onLogoClick={handleViewHome} 
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
                onLogout={handleLogout} 
            />
            
            {/* 2. ОСНОВНИЙ КОНТЕНТ (Займає весь простір) */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {PageContent}
            </Box>
            
            {/* 3. FOOTER */}
            <Footer 
                onFaqClick={handleFaqClick} // Обробка кліку на "Поширені запитання"
            />
        </Box>
    );
}

export default App;