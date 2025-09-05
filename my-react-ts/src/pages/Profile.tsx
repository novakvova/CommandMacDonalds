//@ts-ignore
import React, { useState, useRef } from 'react';
//@ts-ignore
import { Card, Avatar, Button, Form, Input, message, Upload } from 'antd';
//@ts-ignore
import { UserOutlined, MailOutlined, PhoneOutlined, CameraOutlined, SaveOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
//@ts-ignore
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar);
    const fileInputRef = useRef(null);

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
        message.success('Ви успішно вийшли з акаунту');
    };

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone || ''
        });
    };
//@ts-ignore
    const handleSave = async (values) => {
        try {
            const updatedUser = {
                ...user,
                ...values,
                avatar: avatarUrl
            };
            
            updateUser(updatedUser);
            setIsEditing(false);
            message.success('Профіль успішно оновлено!');
        } catch (error) {
            message.error('Помилка при оновленні профілю');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setAvatarUrl(user.avatar);
        form.resetFields();
    };
//@ts-ignore
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                //@ts-ignore
                setAvatarUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getUserInitials = () => {
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1>Мій профіль</h1>
                <p>Управління вашим акаунтом McDonald's</p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <div className="md:col-span-1">
                        <div className="card p-6 text-center">
                            <div className="relative mb-6">
                                <div className="relative inline-block">
                                    <Avatar
                                        size={120}
                                        src={avatarUrl}
                                        style={{ 
                                            backgroundColor: avatarUrl ? 'transparent' : '#dc2626',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            margin: '0 auto 16px',
                                            border: '4px solid white',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                        }}
                                    >
                                        {!avatarUrl && getUserInitials()}
                                    </Avatar>
                                    
                                    <button
                                        onClick={() => {
                                            //@ts-ignore 
                                            fileInputRef.current?.click() 
                                        }}
                                        className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                        title="Змінити фото"
                                    >
                                        <CameraOutlined />
                                    </button>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-gray-600 mb-6">{user.email}</p>
                            
                            <div className="space-y-3">
                                {!isEditing ? (
                                    <button 
                                        onClick={handleEdit}
                                        className="add-to-cart-btn w-full"
                                    >
                                        <UserOutlined className="mr-2" />
                                        Редагувати профіль
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <button 
                                            onClick={() => form.submit()}
                                            className="add-to-cart-btn w-full"
                                        >
                                            <SaveOutlined className="mr-2" />
                                            Зберегти зміни
                                        </button>
                                        <button 
                                            onClick={handleCancel}
                                            className="btn-secondary w-full"
                                        >
                                            Скасувати
                                        </button>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={handleLogout}
                                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                >
                                    <LogoutOutlined className="mr-2" />
                                    Вийти з акаунту
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="md:col-span-2">
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-6">Інформація профілю</h3>
                            
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSave}
                                initialValues={{
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    phone: user.phone || ''
                                }}
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Form.Item
                                        name="firstName"
                                        label="Ім'я"
                                        rules={[{ required: true, message: 'Ім\'я є обов\'язковим!' }]}
                                    >
                                        <Input 
                                            prefix={<UserOutlined />} 
                                            className="input-primary"
                                            disabled={!isEditing}
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        name="lastName"
                                        label="Прізвище"
                                        rules={[{ required: true, message: 'Прізвище є обов\'язковим!' }]}
                                    >
                                        <Input 
                                            prefix={<UserOutlined />} 
                                            className="input-primary"
                                            disabled={!isEditing}
                                        />
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
                                    <Input 
                                        prefix={<MailOutlined />} 
                                        className="input-primary"
                                        disabled={!isEditing}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Телефон"
                                >
                                    <Input 
                                        prefix={<PhoneOutlined />} 
                                        placeholder="+380"
                                        className="input-primary"
                                        disabled={!isEditing}
                                    />
                                </Form.Item>
                            </Form>

                            {/* Additional Info */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-semibold mb-4">Додаткова інформація</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <PhoneOutlined className="text-gray-400" />
                                        <span className="text-gray-600">
                                            Телефон: {user.phone || 'Не вказано'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MailOutlined className="text-gray-400" />
                                        <span className="text-gray-600">
                                            Дата реєстрації: {new Date().toLocaleDateString('uk-UA')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
