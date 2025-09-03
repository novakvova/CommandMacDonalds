import React from 'react';
import { Card, Avatar, Button, Form, Input, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
        message.success('Ви успішно вийшли з акаунту');
    };

    const getUserInitials = () => {
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Мій профіль</h1>
                    <p className="text-gray-600 text-lg">Управління вашим акаунтом McDonald's</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <div className="md:col-span-1">
                        <Card className="text-center shadow-lg">
                            <div className="mb-6">
                                <Avatar
                                    size={120}
                                    style={{ 
                                        backgroundColor: '#dc2626',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        margin: '0 auto 16px'
                                    }}
                                >
                                    {getUserInitials()}
                                </Avatar>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            
                            <div className="space-y-4">
                                <Button 
                                    type="primary" 
                                    icon={<UserOutlined />}
                                    block
                                    onClick={() => message.info('Функція редагування профілю в розробці')}
                                >
                                    Редагувати профіль
                                </Button>
                                <Button 
                                    danger 
                                    icon={<UserOutlined />}
                                    block
                                    onClick={handleLogout}
                                >
                                    Вийти з акаунту
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Profile Details */}
                    <div className="md:col-span-2">
                        <Card title="Інформація профілю" className="shadow-lg">
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                }}
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Form.Item
                                        name="firstName"
                                        label="Ім'я"
                                        rules={[{ required: true, message: 'Ім\'я є обов\'язковим!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        name="lastName"
                                        label="Прізвище"
                                        rules={[{ required: true, message: 'Прізвище є обов\'язковим!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} />
                                    </Form.Item>
                                </div>
                                
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Email є обов\'язковим!' },
                                        { type: 'email', message: 'Введіть коректний email!' }
                                    ]}
                                >
                                    <Input prefix={<MailOutlined />} />
                                </Form.Item>
                                
                                <Form.Item>
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        onClick={() => message.success('Профіль оновлено!')}
                                    >
                                        Зберегти зміни
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                        {/* Additional Info */}
                        <Card title="Додаткова інформація" className="mt-6 shadow-lg">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <PhoneOutlined className="text-gray-400" />
                                    <span className="text-gray-600">Телефон: Не вказано</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MailOutlined className="text-gray-400" />
                                    <span className="text-gray-600">Дата реєстрації: {new Date().toLocaleDateString('uk-UA')}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
