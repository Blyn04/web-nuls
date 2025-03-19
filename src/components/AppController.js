import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import QRGenerator from './admin/QRGenerator';
import Dashboard from './Dashboard';
import Inventory from './admin/Inventory';
import PendingRequest from './admin/PendingRequest';
import BorrowCatalog from './admin/BorrowCatalog';
import History from './admin/History';

const AppController = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/pending-request" element={<PendingRequest />} />
                <Route path="/borrow-catalog" element={<BorrowCatalog />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </BrowserRouter>
    )
}
 
export default AppController