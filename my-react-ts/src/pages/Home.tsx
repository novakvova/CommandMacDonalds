import { useEffect, useState } from "react";
//@ts-ignore
import { Link } from "react-router-dom";
//@ts-ignore
import { Button, Tag } from 'antd';
//@ts-ignore
import { 
    //@ts-ignore
    ClockCircleOutlined, 
    //@ts-ignore
    EnvironmentOutlined, 
    //@ts-ignore
    PhoneOutlined, 
    StarOutlined,
    FireOutlined,
    //@ts-ignore
    ShoppingCartOutlined
}
 from '@ant-design/icons';
import './Menu.css';

export default function Home() {
    //@ts-ignore
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered");

        // axios.get("http://localhost:5129/api/users/list")
        //     .then(res => {
        //         console.log("res", res);
        //         setUsers(res.data);
        //     })
        //     .catch(err => {
        //         console.error("Error fetching users:", err);
        //     });
    }, []);

    const popularItems = [
        {
            id: 1,
            name: "Біг Мак",
            description: "Класичний бургер з двома котлетами, сиром, салатом та спеціальним соусом",
            price: "₴89",
            image: "🍔",
            isNew: false,
            isPopular: true
        },
        {
            id: 2,
            name: "МакКріспі Теріякі",
            description: "Ніжна курочка в паніровці з соусом теріякі та свіжими овочами",
            price: "₴95",
            image: "🍗",
            isNew: true,
            isPopular: false
        },
        {
            id: 3,
            name: "Картопля Фрі",
            description: "Хрустка картопля з натуральних сортів з сіллю та спеціями",
            price: "₴45",
            image: "🍟",
            isNew: false,
            isPopular: true
        },
        {
            id: 4,
            name: "МакФлурі Фісташка",
            description: "Ніжне морозиво з фісташковим смаком та хрусткими вафельними крихтами",
            price: "₴65",
            image: "🍦",
            isNew: true,
            isPopular: false
        }
    ];

    const features = [
        {
            icon: "⚡",
            title: "Швидко",
            description: "Ваше замовлення буде готове за 5-10 хвилин"
        },
        {
            icon: "🌟",
            title: "Якісно",
            description: "Тільки свіжі інгредієнти та найвищі стандарти якості"
        },
        {
            icon: "💰",
            title: "Вигідно",
            description: "Регулярні акції та знижки для наших клієнтів"
        },
        {
            icon: "🚚",
            title: "Доставка",
            description: "Швидка доставка до вашого дому або офісу"
        }
    ];

    const stats = [
        { number: "30+", label: "Міст України" },
        { number: "100+", label: "Ресторанів" },
        { number: "1M+", label: "Задоволених клієнтів" },
        { number: "24/7", label: "Підтримка" }
    ];

    return (
        <div className="menu-container">
            {/* Hero Section */}
            <div className="menu-header">
                <div className="mb-6">
                    <span className="text-6xl">🍔</span>
                </div>
                <h1>Вдома — найсмачніше!</h1>
                <p className="max-w-4xl mx-auto px-6 leading-relaxed">
                    Зізнайтеся, чекали на українські бургери в МакДональдз? А ось і вони: один — довгоочікуваний, зі свининою та соусом із хріном, другий — із ніжною курочкою та часниковим соусом.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link to="/menu">
                        <button className="add-to-cart-btn">
                            Переглянути меню
                        </button>
                    </Link>
                    <Link to="/restaurants">
                        <button className="btn-secondary">
                            Знайти ресторан
                        </button>
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="card p-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Items */}
            <div className="mb-8">
                <h2 className="section-title">Популярні страви</h2>
                <p className="text-center text-xl text-gray-600 mb-8">Найулюбленіші страви наших клієнтів</p>
                <div className="menu-grid">
                    {popularItems.map((item) => (
                        <div key={item.id} className="menu-item">
                            <div className="menu-item-image">
                                <span className="text-8xl">{item.image}</span>
                            </div>
                            <div className="menu-item-content">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="menu-item-name">{item.name}</h3>
                                    <div className="flex gap-1">
                                        {item.isNew && <Tag color="green">Новинка</Tag>}
                                        {item.isPopular && <Tag color="red" icon={<FireOutlined />}>Популярне</Tag>}
                                    </div>
                                </div>
                                <p className="menu-item-description">{item.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="menu-item-price">{item.price}</span>
                                    <div className="flex items-center text-yellow-500">
                                        <StarOutlined />
                                        <StarOutlined />
                                        <StarOutlined />
                                        <StarOutlined />
                                        <StarOutlined />
                                    </div>
                                </div>
                                <button className="add-to-cart-btn w-full">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="card p-8 mb-8">
                <h2 className="section-title">Чому McDonald's?</h2>
                <p className="text-center text-xl text-gray-600 mb-8">Ми робимо все для вашого комфорту</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl text-white">{feature.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="menu-grid">
                <div className="menu-item">
                    <div className="menu-item-image">
                        <span className="text-6xl">🏪</span>
                    </div>
                    <div className="menu-item-content text-center">
                        <h3 className="menu-item-name">Знайти ресторан</h3>
                        <p className="menu-item-description">Знайдіть найближчий ресторан McDonald's та його послуги</p>
                        <Link to="/restaurants">
                            <button className="add-to-cart-btn w-full">
                                Знайти
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="menu-item">
                    <div className="menu-item-image">
                        <span className="text-6xl">🍽️</span>
                    </div>
                    <div className="menu-item-content text-center">
                        <h3 className="menu-item-name">Переглянути меню</h3>
                        <p className="menu-item-description">Ознайомтеся з нашим повним меню та новинками</p>
                        <Link to="/menu">
                            <button className="add-to-cart-btn w-full">
                                Меню
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="menu-item">
                    <div className="menu-item-image">
                        <span className="text-6xl">👤</span>
                    </div>
                    <div className="menu-item-content text-center">
                        <h3 className="menu-item-name">Особистий кабінет</h3>
                        <p className="menu-item-description">Увійдіть в свій акаунт для зручного замовлення</p>
                        <Link to="/login">
                            <button className="add-to-cart-btn w-full">
                                Увійти
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
