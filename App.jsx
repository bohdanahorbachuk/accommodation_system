// App.jsx (У корені проєкту)

import React, { useState } from 'react';
import { CssBaseline, Box } from "@mui/material";

// Імпорти сторінок та компонентів
import HomePage from "./src/pages/HomePage"; 
import ApplicationForm from "./src/components/ApplicationForm"; 
import ConfirmationPage from "./src/pages/ConfirmationPage"; 
import StatusPage from "./src/pages/StatusPage"; 
import ApplicationsList from "./src/components/ApplicationsList";
import Header from "./src/components/Header"; 
import LoginPage from "./src/pages/LoginPage"; // Нова сторінка входу
import RegisterPage from "./src/pages/RegisterPage"; // Нова сторінка реєстрації

// Всі можливі стани сторінок
const PAGE_STATES = {
    HOME: 'home',
    LOGIN: 'login',      // Новий стан
    REGISTER: 'register', // Новий стан
    LIST: 'list',
    FORM: 'form',
    CONFIRMATION: 'confirmation',
    STATUS: 'status'
};

function App() {
    const [currentPage, setCurrentPage] = useState(PAGE_STATES.HOME);
    const [currentReservationId, setCurrentReservationId] = useState(null);
    
    // --- Функції перемикання ---
    
    const handleViewHome = () => {
        setCurrentPage(PAGE_STATES.HOME);
    }
    
    // Перехід на сторінку входу
    const handleLoginClick = () => {
        setCurrentPage(PAGE_STATES.LOGIN);
    };

    // Перехід на сторінку реєстрації
    const handleRegisterClick = () => {
        setCurrentPage(PAGE_STATES.REGISTER);
    };

    // Обробник після успішного входу/реєстрації (можна перенаправляти на іншу сторінку)
    const handleAuthSuccess = () => {
        // Після входу/реєстрації можна перейти, наприклад, на список заявок
        setCurrentPage(PAGE_STATES.LIST); 
    };

    // Перехід на форму (з HomePage, або ApplicationsList)
    const handleNewApplication = () => {
        setCurrentPage(PAGE_STATES.FORM);
        setCurrentReservationId(null);
    };

    // Перехід на список заявок
    const handleViewList = () => {
        setCurrentPage(PAGE_STATES.LIST);
    };

    // 1. З форми до підтвердження 
    const handleFormSubmit = (reservationId) => {
        setCurrentReservationId(reservationId);
        setCurrentPage(PAGE_STATES.CONFIRMATION);
    };

    // 2. З підтвердження або списку до статусу
    const handleViewStatus = (reservationId) => {
        if (reservationId && (typeof reservationId === 'number' || typeof reservationId === 'string')) {
            setCurrentReservationId(reservationId);
        }
        setCurrentPage(PAGE_STATES.STATUS);
    };

    // Для посилання "Забули пароль?"
    const handleForgotPassword = () => {
        console.log("Перехід до відновлення пароля");
        // Тут може бути перехід на окрему сторінку відновлення пароля
    };


    let PageContent;

    switch (currentPage) {
        case PAGE_STATES.HOME:
            PageContent = <HomePage onStartApplication={handleRegisterClick} />; // "Подати заявку" веде на реєстрацію
            break;
        case PAGE_STATES.LOGIN:
            PageContent = <LoginPage 
                            onLoginSuccess={handleAuthSuccess} 
                            onForgotPassword={handleForgotPassword}
                            onRegisterClick={handleRegisterClick} // Додано для переходу на реєстрацію
                          />;
            break;
        case PAGE_STATES.REGISTER:
            PageContent = <RegisterPage 
                            onRegisterSuccess={handleAuthSuccess} 
                            onLoginClick={handleLoginClick} // Додано для переходу на вхід
                          />;
            break;
        case PAGE_STATES.FORM:
            PageContent = <ApplicationForm onSuccess={handleFormSubmit} />;
            break;
        case PAGE_STATES.CONFIRMATION:
            PageContent = <ConfirmationPage onViewStatus={handleViewStatus} />;
            break;
        case PAGE_STATES.STATUS:
            PageContent = <StatusPage reservationId={currentReservationId} />;
            break;
        case PAGE_STATES.LIST:
            PageContent = <ApplicationsList 
                            onNewApplication={handleNewApplication} 
                            onStatusView={handleViewStatus} 
                        />;
            break;
        default:
            PageContent = <HomePage onStartApplication={handleRegisterClick} />;
    }

    return (
        <>
            <CssBaseline /> 
            
            <Header 
                onLogoClick={handleViewHome} 
                onLoginClick={handleLoginClick} // Тепер веде на сторінку входу
                onRegisterClick={handleRegisterClick} // Тепер веде на сторінку реєстрації
                onViewList={handleViewList} // Можна додати кнопку "Мої заявки" у шапку
            />
            
            <Box sx={{ flexGrow: 1 }}>
                {PageContent}
            </Box>
        </>
    );
}

export default App;