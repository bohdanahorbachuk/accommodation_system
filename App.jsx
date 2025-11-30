// App.jsx (ФІНАЛЬНИЙ ЧИСТИЙ РОБОЧИЙ ФАЙЛ)

import React, { useState } from 'react'; 
import { CssBaseline, Box } from "@mui/material";

// ІМПОРТИ: Виходячи з наданої архітектури
import HomePage from "./src/pages/HomePage"; 
import ApplicationForm from "./src/components/ApplicationForm"; 
import ConfirmationPage from "./src/pages/ConfirmationPage"; 
import StatusPage from "./src/pages/StatusPage"; 
import ApplicationsList from "./src/components/ApplicationsList";
import Header from "./src/components/Header"; 
import AdminDashboard from "./src/components/AdminDashboard";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";

const USER_ROLES = {
    STUDENT: 1,
    ADMIN: 2,
};

const PAGE_STATES = {
    HOME: 'home',
    LOGIN: 'login',
    REGISTER: 'register',
    LIST: 'list',
    FORM: 'form',
    CONFIRMATION: 'confirmation',
    STATUS: 'status',
    ADMIN_DASHBOARD: 'admin_dashboard'
};

function App() {
    // ТИМЧАСОВА ЗМІНА: Форсуємо сторінку CONFIRMATION для перевірки
    const [currentPage, setCurrentPage] = useState(PAGE_STATES.CONFIRMATION); 
    
    // Єдине оголошення для ID та AuthData
    const [currentReservationId, setCurrentReservationId] = useState(12345); // Тестовий ID
    const [authData, setAuthData] = useState({ userId: 'test_user', userRole: USER_ROLES.STUDENT }); // Тестова авторизація
    
    // --- Допоміжні змінні ---
    const isLoggedIn = !!authData; 
    const isAdmin = authData?.userRole === USER_ROLES.ADMIN;
    
    // --- Функції перемикання ---
    
    const handleViewHome = () => { setCurrentPage(PAGE_STATES.HOME); };
    const handleLogout = () => { setAuthData(null); setCurrentPage(PAGE_STATES.HOME); };
    const handleLoginClick = () => { setCurrentPage(PAGE_STATES.LOGIN); };
    const handleRegisterClick = () => { setCurrentPage(PAGE_STATES.REGISTER); };
    
    const handleLoginSuccess = (data) => {
        setAuthData(data); 
        data.userRole === USER_ROLES.STUDENT ? setCurrentPage(PAGE_STATES.LIST) : setCurrentPage(PAGE_STATES.ADMIN_DASHBOARD);
    };
    
    const handleRegisterSuccess = () => { setCurrentPage(PAGE_STATES.HOME); };
    const handleNewApplication = () => { setCurrentPage(PAGE_STATES.FORM); setCurrentReservationId(null); };
    const handleViewList = () => { setCurrentPage(PAGE_STATES.LIST); };
    
    const handleFormSubmit = (reservationId) => { setCurrentReservationId(reservationId); setCurrentPage(PAGE_STATES.CONFIRMATION); };
    
    const handleViewStatus = (reservationId) => {
        if (reservationId && (typeof reservationId === 'number' || typeof reservationId === 'string')) {
            setCurrentReservationId(reservationId);
        }
        setCurrentPage(PAGE_STATES.STATUS);
    };
    
    const handleForgotPassword = () => { console.log("Перехід до відновлення пароля"); };
    
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
            PageContent = <ApplicationForm
                            userId={authData?.userId}
                            onSuccess={handleFormSubmit} />;
            break;
        case PAGE_STATES.CONFIRMATION:
            PageContent = <ConfirmationPage onViewStatus={handleViewStatus} onViewList={handleViewList} />; 
            break;
        case PAGE_STATES.STATUS:
            PageContent = <StatusPage reservationId={currentReservationId} onViewList={handleViewList} />; 
            break;
        case PAGE_STATES.LIST:
            PageContent = <ApplicationsList 
                            userId={authData?.userId}
                            onNewApplication={handleNewApplication} 
                            onStatusView={handleViewStatus} 
                        />;
            break;
        case PAGE_STATES.ADMIN_DASHBOARD:
            PageContent = <AdminDashboard />;
            break;
        default:
            PageContent = <HomePage onStartApplication={handleRegisterClick} />;
    }

    return (
        <>
            <CssBaseline /> 
            
            <Header 
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                currentPage={currentPage}
                onLogoClick={handleViewHome} 
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
                onLogout={handleLogout} 
                onViewList={handleViewList} 
            />
            
            <Box sx={{ flexGrow: 1 }}>
                {PageContent}
            </Box>
        </>
    );
}

export default App;