import AppRoutes from "./routes/AppRoutes";
import './App.css'
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <div className="w-full">
                <AppRoutes />
            </div>
        </AuthProvider>
    );
}

export default App;

