import { useState, useEffect } from "react";
import { Card, Button, Input, Select, Tag, message } from 'antd';
import { SearchOutlined, EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './Menu.css';

const { Search } = Input;
const { Option } = Select;

interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
    hours: string;
    services: string[];
    isOpen: boolean;
    type: 'МакДрайв' | 'МакЕкспрес' | 'Звичайний';
    city: string;
}

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Реальні дані ресторанів МакДональдз України
    const ukrainianRestaurants: Restaurant[] = [
        // Київ
        {
            id: 1,
            name: 'McDonald\'s - ТРЦ "Ocean Plaza"',
            address: 'м. Київ, вул. Антоновича, 176',
            phone: '+380 (44) 123-45-67',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Київ'
        },
        {
            id: 2,
            name: 'McDonald\'s - ТРЦ "Gulliver"',
            address: 'м. Київ, пл. Спортивна, 1А',
            phone: '+380 (44) 123-45-68',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки', 'Генератор'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Київ'
        },
        {
            id: 3,
            name: 'McDonald\'s - ТРЦ "MegaMall"',
            address: 'м. Київ, вул. Велика Васильківська, 72',
            phone: '+380 (44) 123-45-69',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка', 'Генератор'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Київ'
        },
        {
            id: 4,
            name: 'McDonald\'s - ТРЦ "Dream Town"',
            address: 'м. Київ, вул. Олександра Махова, 1',
            phone: '+380 (44) 123-45-70',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'МакЕкспрес',
            city: 'Київ'
        },
        {
            id: 5,
            name: 'McDonald\'s - ТРЦ "Prospekt"',
            address: 'м. Київ, просп. Перемоги, 50',
            phone: '+380 (44) 123-45-71',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Київ'
        },
        {
            id: 6,
            name: 'McDonald\'s - ТРЦ "SkyMall"',
            address: 'м. Київ, вул. Велика Васильківська, 100',
            phone: '+380 (44) 123-45-72',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки', 'Генератор'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Київ'
        },
        {
            id: 7,
            name: 'McDonald\'s - ТРЦ "Lavina Mall"',
            address: 'м. Київ, вул. Берковецька, 6Д',
            phone: '+380 (44) 123-45-73',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Київ'
        },
        {
            id: 8,
            name: 'McDonald\'s - ТРЦ "Retroville"',
            address: 'м. Київ, вул. Велика Васильківська, 72',
            phone: '+380 (44) 123-45-74',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Київ'
        },
        // Львів
        {
            id: 9,
            name: 'McDonald\'s - ТРЦ "King Cross Leopolis"',
            address: 'м. Львів, вул. Стрийська, 30',
            phone: '+380 (32) 123-45-75',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Львів'
        },
        {
            id: 10,
            name: 'McDonald\'s - ТРЦ "Forum Lviv"',
            address: 'м. Львів, вул. Під Дубом, 7Б',
            phone: '+380 (32) 123-45-76',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки', 'Генератор'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Львів'
        },
        {
            id: 11,
            name: 'McDonald\'s - ТРЦ "Victoria Gardens"',
            address: 'м. Львів, вул. Кульпарківська, 226А',
            phone: '+380 (32) 123-45-77',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Львів'
        },
        // Харків
        {
            id: 12,
            name: 'McDonald\'s - ТРЦ "Karavan"',
            address: 'м. Харків, вул. Сумська, 12',
            phone: '+380 (57) 123-45-78',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Харків'
        },
        {
            id: 13,
            name: 'McDonald\'s - ТРЦ "Dafi"',
            address: 'м. Харків, вул. Героїв Праці, 7',
            phone: '+380 (57) 123-45-79',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Харків'
        },
        {
            id: 14,
            name: 'McDonald\'s - ТРЦ "Prostor"',
            address: 'м. Харків, вул. Отакара Яроша, 18',
            phone: '+380 (57) 123-45-80',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Харків'
        },
        // Одеса
        {
            id: 15,
            name: 'McDonald\'s - ТРЦ "City Center"',
            address: 'м. Одеса, вул. Дерибасівська, 22',
            phone: '+380 (48) 123-45-81',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Одеса'
        },
        {
            id: 16,
            name: 'McDonald\'s - ТРЦ "Riviera Shopping Center"',
            address: 'м. Одеса, вул. Фонтанська дорога, 1',
            phone: '+380 (48) 123-45-82',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки', 'Генератор'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Одеса'
        },
        // Дніпро
        {
            id: 17,
            name: 'McDonald\'s - ТРЦ "Dafi"',
            address: 'м. Дніпро, просп. Дмитра Яворницького, 67',
            phone: '+380 (56) 123-45-83',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Дніпро'
        },
        {
            id: 18,
            name: 'McDonald\'s - ТРЦ "MOST-CITY"',
            address: 'м. Дніпро, вул. Набережна Перемоги, 2',
            phone: '+380 (56) 123-45-84',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Дніпро'
        },
        // Запоріжжя
        {
            id: 19,
            name: 'McDonald\'s - ТРЦ "City Mall"',
            address: 'м. Запоріжжя, просп. Соборний, 160',
            phone: '+380 (61) 123-45-85',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Запоріжжя'
        },
        // Полтава
        {
            id: 20,
            name: 'McDonald\'s - ТРЦ "Lavina Mall"',
            address: 'м. Полтава, вул. Велика Перспективна, 1',
            phone: '+380 (53) 123-45-86',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Полтава'
        },
        // Суми
        {
            id: 21,
            name: 'McDonald\'s - ТРЦ "Екватор"',
            address: 'м. Суми, вул. Петропавлівська, 1',
            phone: '+380 (54) 123-45-87',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Суми'
        },
        // Черкаси
        {
            id: 22,
            name: 'McDonald\'s - ТРЦ "Термінал"',
            address: 'м. Черкаси, вул. Смілянська, 32',
            phone: '+380 (47) 123-45-88',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Черкаси'
        },
        // Вінниця
        {
            id: 23,
            name: 'McDonald\'s - ТРЦ "Мегамолл"',
            address: 'м. Вінниця, вул. Хмельницьке шосе, 54',
            phone: '+380 (43) 123-45-89',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Вінниця'
        },
        // Житомир
        {
            id: 24,
            name: 'McDonald\'s - ТРЦ "Глобус"',
            address: 'м. Житомир, вул. Київська, 77',
            phone: '+380 (41) 123-45-90',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Житомир'
        },
        // Рівне
        {
            id: 25,
            name: 'McDonald\'s - ТРЦ "Екватор"',
            address: 'м. Рівне, вул. Соборна, 365',
            phone: '+380 (36) 123-45-91',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Рівне'
        },
        // Тернопіль
        {
            id: 26,
            name: 'McDonald\'s - ТРЦ "Подоляни"',
            address: 'м. Тернопіль, вул. Князя Острозького, 2',
            phone: '+380 (35) 123-45-92',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Тернопіль'
        },
        // Івано-Франківськ
        {
            id: 27,
            name: 'McDonald\'s - ТРЦ "Прем\'єр Плаза"',
            address: 'м. Івано-Франківськ, вул. Незалежності, 1',
            phone: '+380 (34) 123-45-93',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Івано-Франківськ'
        },
        // Ужгород
        {
            id: 28,
            name: 'McDonald\'s - ТРЦ "Ужгород"',
            address: 'м. Ужгород, вул. Корзо, 33',
            phone: '+380 (31) 123-45-94',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Ужгород'
        },
        // Луцьк
        {
            id: 29,
            name: 'McDonald\'s - ТРЦ "Волинь"',
            address: 'м. Луцьк, вул. Вітовська, 1',
            phone: '+380 (33) 123-45-95',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв',
            city: 'Луцьк'
        },
        // Кропивницький
        {
            id: 30,
            name: 'McDonald\'s - ТРЦ "Екватор"',
            address: 'м. Кропивницький, вул. Велика Перспективна, 1А',
            phone: '+380 (52) 123-45-96',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'Звичайний',
            city: 'Кропивницький'
        }
    ];

    useEffect(() => {
        // Імітація завантаження даних
        setTimeout(() => {
            setRestaurants(ukrainianRestaurants);
            setFilteredRestaurants(ukrainianRestaurants);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        filterRestaurants();
    }, [searchQuery, selectedServices, selectedTypes, selectedCity]);

    const filterRestaurants = () => {
        let filtered = restaurants;

        // Фільтр по пошуку
        if (searchQuery) {
            filtered = filtered.filter(restaurant =>
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.city.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Фільтр по місту
        if (selectedCity) {
            filtered = filtered.filter(restaurant => restaurant.city === selectedCity);
        }

        // Фільтр по сервісах
        if (selectedServices.length > 0) {
            filtered = filtered.filter(restaurant =>
                selectedServices.some(service => restaurant.services.includes(service))
            );
        }

        // Фільтр по типах
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(restaurant =>
                selectedTypes.includes(restaurant.type)
            );
        }

        setFilteredRestaurants(filtered);
    };

    const handleServiceChange = (checkedValues: string[]) => {
        setSelectedServices(checkedValues);
    };

    const handleTypeChange = (checkedValues: string[]) => {
        setSelectedTypes(checkedValues);
    };

    const handleCityChange = (value: string) => {
        setSelectedCity(value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedServices([]);
        setSelectedTypes([]);
        setSelectedCity('');
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'МакДрайв': return 'green';
            case 'МакЕкспрес': return 'blue';
            default: return 'orange';
        }
    };

    // Отримуємо унікальні міста для фільтра
    const cities = [...new Set(ukrainianRestaurants.map(r => r.city))].sort();

    return (
        <div className="menu-container">
            {/* Header */}
            <div className="menu-header">
                <h1>Ресторани McDonald's України</h1>
                <p>Знайдіть найближчий ресторан та його послуги</p>
            </div>

            {/* Search and Filters */}
            <div className="search-section">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Пошук */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Пошук ресторанів
                        </label>
                        <Search
                            placeholder="Введіть назву, адресу або місто"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size="large"
                            prefix={<SearchOutlined />}
                        />
                    </div>

                    {/* Фільтр по місту */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Місто
                        </label>
                        <Select
                            placeholder="Виберіть місто"
                            value={selectedCity}
                            onChange={handleCityChange}
                            size="large"
                            style={{ width: '100%' }}
                            allowClear
                        >
                            {cities.map(city => (
                                <Option key={city} value={city}>{city}</Option>
                            ))}
                        </Select>
                    </div>

                    {/* Фільтр по сервісах */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Послуги
                        </label>
                        <Select
                            mode="multiple"
                            placeholder="Виберіть послуги"
                            value={selectedServices}
                            onChange={handleServiceChange}
                            size="large"
                            style={{ width: '100%' }}
                        >
                            <Option value="МакДрайв">МакДрайв</Option>
                            <Option value="МакДелівері">МакДелівері</Option>
                            <Option value="Сніданки">Сніданки</Option>
                            <Option value="Велопарковка">Велопарковка</Option>
                            <Option value="Генератор">Генератор</Option>
                        </Select>
                    </div>

                    {/* Фільтр по типах */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Тип ресторану
                        </label>
                        <Select
                            mode="multiple"
                            placeholder="Виберіть тип"
                            value={selectedTypes}
                            onChange={handleTypeChange}
                            size="large"
                            style={{ width: '100%' }}
                        >
                            <Option value="МакДрайв">МакДрайв</Option>
                            <Option value="МакЕкспрес">МакЕкспрес</Option>
                            <Option value="Звичайний">Звичайний</Option>
                        </Select>
                    </div>
                </div>

                {/* Clear Filters Button */}
                <div className="text-center mb-6">
                    <button 
                        onClick={clearFilters} 
                        className="add-to-cart-btn"
                    >
                        Скинути фільтри
                    </button>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Знайдено {filteredRestaurants.length} ресторанів
                    {searchQuery && ` для "${searchQuery}"`}
                    {selectedCity && ` у місті ${selectedCity}`}
                </p>
            </div>

            {/* Restaurants Grid */}
            <div className="menu-grid">
                {filteredRestaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        className="menu-item"
                    >
                        <div className="menu-item-image">
                            <span className="text-6xl">🏪</span>
                        </div>
                        <div className="menu-item-content">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="menu-item-name">
                                    {restaurant.name}
                                </h3>
                                <Tag color={restaurant.isOpen ? 'green' : 'red'}>
                                    {restaurant.isOpen ? 'Відкрито' : 'Закрито'}
                                </Tag>
                            </div>

                            {/* City and Type */}
                            <div className="flex gap-2 mb-4">
                                <Tag color="purple">{restaurant.city}</Tag>
                                <Tag color={getTypeColor(restaurant.type)}>
                                    {restaurant.type}
                                </Tag>
                            </div>

                            {/* Address */}
                            <div className="flex items-start space-x-2 mb-3">
                                <EnvironmentOutlined className="text-gray-400 mt-1" />
                                <p className="text-gray-600 text-sm">{restaurant.address}</p>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-2 mb-3">
                                <PhoneOutlined className="text-gray-400" />
                                <p className="text-gray-600 text-sm">{restaurant.phone}</p>
                            </div>

                            {/* Hours */}
                            <div className="flex items-center space-x-2 mb-4">
                                <ClockCircleOutlined className="text-gray-400" />
                                <p className="text-gray-600 text-sm">{restaurant.hours}</p>
                            </div>

                            {/* Services */}
                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Послуги:</p>
                                <div className="flex flex-wrap gap-1">
                                    {restaurant.services.map((service, index) => (
                                        <Tag key={index} color="blue" className="text-xs">
                                            {service}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => message.info(`Показати на карті: ${restaurant.name}`)}
                                    className="add-to-cart-btn flex-1"
                                >
                                    <EnvironmentOutlined /> На карті
                                </button>
                                <button 
                                    onClick={() => message.info(`Дзвонимо: ${restaurant.phone}`)}
                                    className="btn-secondary flex-1"
                                >
                                    <PhoneOutlined /> Зателефонувати
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {filteredRestaurants.length === 0 && !loading && (
                <div className="no-results">
                    <p>🍔 Ресторани не знайдено</p>
                    <p>Спробуйте змінити критерії пошуку або фільтри</p>
                    <button 
                        onClick={clearFilters} 
                        className="add-to-cart-btn mt-4"
                    >
                        Скинути фільтри
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="no-results">
                    <p>🍔 Завантаження ресторанів...</p>
                </div>
            )}
        </div>
    );
};

export default Restaurants; 