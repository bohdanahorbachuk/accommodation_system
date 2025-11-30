import AdminApplicationsList from './AdminApplicationsList';

const AdminDashboard = ({ onStatusView }) => { 
    return (
        <AdminApplicationsList onStatusView={onStatusView} />
    );
}

export default AdminDashboard;