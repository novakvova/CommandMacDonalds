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
            <section className="relative gradient-primary py-20 px-6 rounded-2xl text-white">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Смачно. Швидко. Зручно.
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Відкрийте для себе найкращі страви McDonald's. Замовляйте онлайн та отримуйте знижки!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/menu"
                            className="btn-primary"
                        >
                            Переглянути меню
                        </Link>
                        <Link
                            to="/offers"
                            className="btn-secondary"
                        >
                            Акції та пропозиції
                        </Link>
                    </div>
                </div>
            </section>

            {/* Popular Items */}
            <section className="py-12">
                <h2 className="section-title">Популярні страви</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card overflow-hidden">
                        <div className="h-48 gradient-secondary flex items-center justify-center">
                            <span className="text-6xl">🍔</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Біг Мак</h3>
                            <p className="text-gray-600 mb-4">Класичний бургер з двома котлетами, сиром, салатом та спеціальним соусом</p>
                            <div className="flex justify-between items-center">
                                <span className="price">₴89</span>
                                <button className="btn-primary">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card overflow-hidden">
                        <div className="h-48 gradient-secondary flex items-center justify-center">
                            <span className="text-6xl">🍟</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Картопля Фрі</h3>
                            <p className="text-gray-600 mb-4">Хрустка картопля з натуральних сортів з сіллю та спеціями</p>
                            <div className="flex justify-between items-center">
                                <span className="price">₴45</span>
                                <button className="btn-primary">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card overflow-hidden">
                        <div className="h-48 gradient-secondary flex items-center justify-center">
                            <span className="text-6xl">🥤</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Кока-Кола</h3>
                            <p className="text-gray-600 mb-4">Освіжаючий напій з унікальним смаком та газованістю</p>
                            <div className="flex justify-between items-center">
                                <span className="price">₴35</span>
                                <button className="btn-primary">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-gray-50 rounded-2xl px-6">
                <h2 className="section-title">Чому McDonald's?</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Швидко</h3>
                        <p className="text-gray-600">Ваше замовлення буде готове за 5-10 хвилин</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">🌟</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Якісно</h3>
                        <p className="text-gray-600">Тільки свіжі інгредієнти та найвищі стандарти якості</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">💰</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Вигідно</h3>
                        <p className="text-gray-600">Регулярні акції та знижки для наших клієнтів</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
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
                            <div key={index} className="card p-6">
                                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-4">
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
