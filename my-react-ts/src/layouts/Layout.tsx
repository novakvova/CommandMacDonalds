import { Link, Outlet } from "react-router-dom";
import logo from '../assets/732217.png';


export default function Layout() {
    return (
        <div className="min-h-screen bg-yellow-50">
            {/* Navbar */}
            <nav className="bg-red-600 text-white shadow-md py-3 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="McDonald's Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-bold tracking-wide">McDonald's</span>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-yellow-300 transition-colors font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="bg-yellow-400 hover:bg-yellow-300 text-red-700 font-semibold px-4 py-1 rounded-md transition-all"
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Page Content */}
            <main className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
                <Outlet />
            </main>
        </div>
    );
}
