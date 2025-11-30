import { useState } from 'react';
import { CssBaseline, Box } from "@mui/material";

import HomePage from "./src/pages/HomePage"; 
import ApplicationForm from "./src/components/ApplicationForm"; 
import ConfirmationPage from "./src/pages/ConfirmationPage"; 
import StatusPage from "./src/pages/StatusPage"; 
import ApplicationsList from "./src/components/ApplicationsList";
import Header from "./src/components/Header"; 
import AdminDashboard from "./src/components/AdminDashboard";
import AdminApplicationDetails from "./src/pages/AdminApplicationDetails";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";

const USER_ROLES = {
    STUDENT: 1,
    ADMIN: 2,
};

// Всі можливі стани сторінок
const PAGE_STATES = {
    HOME: 'home',
    LOGIN: 'login',
    REGISTER: 'register',
    LIST: 'list',
    FORM: 'form',
    CONFIRMATION: 'confirmation',
    STATUS: 'status',
    ADMIN_DASHBOARD: 'admin_dashboard',
    ADMIN_APPLICATION_DETAILS: 'admin_application_details'
};

function App() {
    // Захардкоджені дані адміністратора
    const [authData, setAuthData] = useState({
        accessToken: 'hardcoded-admin-token',
        userId: 1,
        userRole: USER_ROLES.ADMIN // 2
    });
    const [currentPage, setCurrentPage] = useState(PAGE_STATES.ADMIN_DASHBOARD);
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

    // Обробник після успішного входу
    const handleLoginSuccess = (data) => {
        setAuthData(data); // Зберігаємо дані про автентифікацію
        
        // Умовне перенаправлення на основі ролі
        if (data.userRole === USER_ROLES.STUDENT) {
            setCurrentPage(PAGE_STATES.LIST);
        } else if (data.userRole === USER_ROLES.ADMIN) {
            setCurrentPage(PAGE_STATES.ADMIN_DASHBOARD);
        } else {
            console.error("Невідома роль користувача:", data.userRole);
            setCurrentPage(PAGE_STATES.HOME); 
        }
    };

    // Обробник після успішної реєстрації
    const handleRegisterSuccess = () => {
        setCurrentPage(PAGE_STATES.HOME);
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

    // Перехід на сторінку деталей заявки для адміністратора
    const handleViewAdminApplicationDetails = (reservationId) => {
        if (reservationId && (typeof reservationId === 'number' || typeof reservationId === 'string')) {
            setCurrentReservationId(reservationId);
        }
        setCurrentPage(PAGE_STATES.ADMIN_APPLICATION_DETAILS);
    };

    // Повернення до адмін-панелі
    const handleBackToAdminDashboard = () => {
        setCurrentPage(PAGE_STATES.ADMIN_DASHBOARD);
    };

    // Для посилання "Забули пароль?"
    const handleForgotPassword = () => {
        console.log("Перехід до відновлення пароля");
        // Тут може бути перехід на окрему сторінку відновлення пароля
    };


    let PageContent;

    switch (currentPage) {
        case PAGE_STATES.HOME:
            PageContent = <HomePage />;
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
            PageContent = <ConfirmationPage onViewStatus={handleViewStatus} />;
            break;
        case PAGE_STATES.STATUS:
            PageContent = <StatusPage reservationId={currentReservationId} />;
            break;
        case PAGE_STATES.LIST:
            PageContent = <ApplicationsList 
                            userId={authData?.userId}
                            onNewApplication={handleNewApplication} 
                            onStatusView={handleViewStatus} 
                        />;
            break;
        case PAGE_STATES.ADMIN_DASHBOARD:
            PageContent = <AdminDashboard onStatusView={handleViewAdminApplicationDetails} />;
            break;
        case PAGE_STATES.ADMIN_APPLICATION_DETAILS:
            PageContent = <AdminApplicationDetails 
                            reservationId={currentReservationId} 
                            onBack={handleBackToAdminDashboard}
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
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
            />
            
            <Box sx={{ flexGrow: 1 }}>
                {PageContent}
            </Box>
        </>
    );
}

export default App;