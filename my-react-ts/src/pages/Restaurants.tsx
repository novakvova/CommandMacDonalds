import { useState, useEffect } from "react";
import { Card, Button, Input, Select, Tag, message } from 'antd';
import { SearchOutlined, EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';

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
}

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Мокові дані ресторанів
    const mockRestaurants: Restaurant[] = [
        {
            id: 1,
            name: 'McDonald\'s - ТРЦ "Ocean Plaza"',
            address: 'м. Київ, вул. Антоновича, 176',
            phone: '+380 (44) 123-45-67',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв'
        },
        {
            id: 2,
            name: 'McDonald\'s - ТРЦ "Gulliver"',
            address: 'м. Київ, пл. Спортивна, 1А',
            phone: '+380 (44) 123-45-68',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки', 'Генератор'],
            isOpen: true,
            type: 'Звичайний'
        },
        {
            id: 3,
            name: 'McDonald\'s - ТРЦ "MegaMall"',
            address: 'м. Київ, вул. Велика Васильківська, 72',
            phone: '+380 (44) 123-45-69',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка', 'Генератор'],
            isOpen: false,
            type: 'МакДрайв'
        },
        {
            id: 4,
            name: 'McDonald\'s - ТРЦ "Dream Town"',
            address: 'м. Київ, вул. Олександра Махова, 1',
            phone: '+380 (44) 123-45-70',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки'],
            isOpen: true,
            type: 'МакЕкспрес'
        },
        {
            id: 5,
            name: 'McDonald\'s - ТРЦ "Prospekt"',
            address: 'м. Київ, просп. Перемоги, 50',
            phone: '+380 (44) 123-45-71',
            hours: '07:00 - 23:00',
            services: ['МакДрайв', 'МакДелівері', 'Сніданки', 'Велопарковка'],
            isOpen: true,
            type: 'МакДрайв'
        },
        {
            id: 6,
            name: 'McDonald\'s - ТРЦ "SkyMall"',
            address: 'м. Київ, вул. Велика Васильківська, 100',
            phone: '+380 (44) 123-45-72',
            hours: '08:00 - 22:00',
            services: ['МакДелівері', 'Сніданки', 'Генератор'],
            isOpen: true,
            type: 'Звичайний'
        }
    ];

    useEffect(() => {
        // Імітація завантаження даних
        setTimeout(() => {
            setRestaurants(mockRestaurants);
            setFilteredRestaurants(mockRestaurants);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        filterRestaurants();
    }, [searchQuery, selectedServices, selectedTypes]);

    const filterRestaurants = () => {
        let filtered = restaurants;

        // Фільтр по пошуку
        if (searchQuery) {
            filtered = filtered.filter(restaurant =>
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
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

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedServices([]);
        setSelectedTypes([]);
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'МакДрайв': return 'green';
            case 'МакЕкспрес': return 'blue';
            default: return 'orange';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Знайти ресторани McDonald's</h1>
                    <p className="text-gray-600 text-lg">Знайдіть найближчий ресторан та його послуги</p>
                </div>

                {/* Search and Filters */}
                <Card className="mb-8 shadow-lg">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Пошук */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Пошук ресторанів
                            </label>
                            <Search
                                placeholder="Введіть назву або адресу ресторану"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size="large"
                                prefix={<SearchOutlined />}
                            />
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
                    <div className="mt-4 text-center">
                        <Button onClick={clearFilters} type="default">
                            Скинути фільтри
                        </Button>
                    </div>
                </Card>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Знайдено {filteredRestaurants.length} ресторанів
                        {searchQuery && ` для "${searchQuery}"`}
                    </p>
                </div>

                {/* Restaurants Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <Card
                            key={restaurant.id}
                            className="hover:shadow-xl transition-all duration-300 cursor-pointer"
                            actions={[
                                <Button 
                                    type="primary" 
                                    icon={<EnvironmentOutlined />}
                                    onClick={() => message.info(`Показати на карті: ${restaurant.name}`)}
                                >
                                    На карті
                                </Button>,
                                <Button 
                                    icon={<PhoneOutlined />}
                                    onClick={() => message.info(`Дзвонимо: ${restaurant.phone}`)}
                                >
                                    Зателефонувати
                                </Button>
                            ]}
                        >
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {restaurant.name}
                                    </h3>
                                    <Tag color={restaurant.isOpen ? 'green' : 'red'}>
                                        {restaurant.isOpen ? 'Відкрито' : 'Закрито'}
                                    </Tag>
                                </div>

                                {/* Type */}
                                <Tag color={getTypeColor(restaurant.type)}>
                                    {restaurant.type}
                                </Tag>

                                {/* Address */}
                                <div className="flex items-start space-x-2">
                                    <EnvironmentOutlined className="text-gray-400 mt-1" />
                                    <p className="text-gray-600">{restaurant.address}</p>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center space-x-2">
                                    <PhoneOutlined className="text-gray-400" />
                                    <p className="text-gray-600">{restaurant.phone}</p>
                                </div>

                                {/* Hours */}
                                <div className="flex items-center space-x-2">
                                    <ClockCircleOutlined className="text-gray-400" />
                                    <p className="text-gray-600">{restaurant.hours}</p>
                                </div>

                                {/* Services */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Послуги:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {restaurant.services.map((service, index) => (
                                            <Tag key={index} color="blue">
                                                {service}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredRestaurants.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍔</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Ресторани не знайдено
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Спробуйте змінити критерії пошуку або фільтри
                        </p>
                        <Button onClick={clearFilters} type="primary">
                            Скинути фільтри
                        </Button>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4 animate-bounce">🍔</div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Завантаження ресторанів...
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Restaurants; 