import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered");

        axios.get("http://localhost:5129/api/users/list")
            .then(res => {
                console.log("res", res);
                setUsers(res.data); // зберігаємо юзерів у стан
            })
            .catch(err => {
                console.error("Error fetching users:", err);
            });
    }, []);

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-yellow-400 to-yellow-300 py-20 px-6 rounded-2xl">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-6">
                        Смачно. Швидко. Зручно.
                    </h1>
                    <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                        Відкрийте для себе найкращі страви McDonald's. Замовляйте онлайн та отримуйте знижки!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/menu"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
                        >
                            Переглянути меню
                        </Link>
                        <Link
                            to="/offers"
                            className="bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-8 rounded-full text-lg border-2 border-red-600 transition-all transform hover:scale-105"
                        >
                            Акції та пропозиції
                        </Link>
                    </div>
                </div>
            </section>

            {/* Popular Items */}
            <section className="py-12">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Популярні страви</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                            <span className="text-6xl">🍔</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Біг Мак</h3>
                            <p className="text-gray-600 mb-4">Класичний бургер з двома котлетами, сиром, салатом та спеціальним соусом</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-red-600">₴89</span>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                            <span className="text-6xl">🍟</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Картопля Фрі</h3>
                            <p className="text-gray-600 mb-4">Хрустка картопля з натуральних сортів з сіллю та спеціями</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-red-600">₴45</span>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                            <span className="text-6xl">🥤</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Кока-Кола</h3>
                            <p className="text-gray-600 mb-4">Освіжаючий напій з унікальним смаком та газованістю</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-red-600">₴35</span>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-gray-50 rounded-2xl px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Чому McDonald's?</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Швидко</h3>
                        <p className="text-gray-600">Ваше замовлення буде готове за 5-10 хвилин</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">🌟</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Якісно</h3>
                        <p className="text-gray-600">Тільки свіжі інгредієнти та найвищі стандарти якості</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">💰</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Вигідно</h3>
                        <p className="text-gray-600">Регулярні акції та знижки для наших клієнтів</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">🚚</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Доставка</h3>
                        <p className="text-gray-600">Швидка доставка до вашого дому або офісу</p>
                    </div>
                </div>
            </section>

            {/* User List Section (if needed) */}
            {users.length > 0 && (
                <section className="py-12">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Наші користувачі</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user: any, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-white font-bold text-lg">
                                        {user.fullName?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{user.fullName}</h3>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
