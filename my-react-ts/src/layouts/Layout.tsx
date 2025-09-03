import { Link, Outlet } from "react-router-dom";
import logo from "../assets/732217.png";
import { useAuth } from "../contexts/AuthContext";
import UserProfile from "../components/UserProfile";

export default function Layout() {
    const { isAuthenticated } = useAuth();
    
    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="w-full bg-white shadow-lg py-4 px-8 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="McDonald's Logo" className="h-12 w-auto" />
                    </div>

                    <ul className="hidden md:flex space-x-8 font-medium text-gray-800">
                        <li>
                            <Link to="/" className="hover:text-red-600 transition-colors duration-200 font-semibold">
                                Головна
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu" className="hover:text-red-600 transition-colors duration-200 font-semibold">
                                Меню
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/offers"
                                className="hover:text-red-600 transition-colors duration-200 font-semibold"
                            >
                                Пропозиції
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/restaurants"
                                className="hover:text-red-600 transition-colors duration-200 font-semibold"
                            >
                                Ресторани
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <UserProfile />
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-white hover:bg-gray-100 text-red-600 font-semibold px-6 py-2 rounded-full border-2 border-red-600 transition-all duration-200 hover:shadow-md"
                                >
                                    Реєстрація
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 hover:shadow-md transform hover:scale-105"
                                >
                                    Увійти
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 w-full py-8 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-gray-900 text-white py-12 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <img src={logo} alt="McDonald's Logo" className="h-8 w-auto" />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                McDonald's Україна - ваш надійний партнер для смачного та швидкого харчування. 
                                Ми прагнемо забезпечити найвищу якість та найкращий сервіс.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="text-xl">📱</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="text-xl">📘</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="text-xl">📷</span>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-lg mb-4">Меню</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><Link to="/menu" className="hover:text-white transition-colors">Бургери</Link></li>
                                <li><Link to="/menu" className="hover:text-white transition-colors">Картопля</Link></li>
                                <li><Link to="/menu" className="hover:text-white transition-colors">Напої</Link></li>
                                <li><Link to="/menu" className="hover:text-white transition-colors">Десерти</Link></li>
                                <li><Link to="/offers" className="hover:text-white transition-colors">Акції</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-lg mb-4">Сервіси</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><Link to="/delivery" className="hover:text-white transition-colors">Доставка</Link></li>
                                <li><Link to="/restaurants" className="hover:text-white transition-colors">Ресторани</Link></li>
                                <li><Link to="/app" className="hover:text-white transition-colors">Мобільний додаток</Link></li>
                                <li><Link to="/loyalty" className="hover:text-white transition-colors">Програма лояльності</Link></li>
                                <li><Link to="/catering" className="hover:text-white transition-colors">Кейтеринг</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-lg mb-4">Контакти</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>📞 +380 (44) 123-45-67</p>
                                <p>📧 info@mcdonalds.ua</p>
                                <p>📍 Київ, вул. Хрещатик, 1</p>
                                <p>🕒 Щодня 7:00 - 23:00</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            © 2025 McDonald's Україна. Всі права захищені.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Політика конфіденційності
                            </Link>
                            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Умови використання
                            </Link>
                            <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Файли cookie
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}