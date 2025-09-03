import {useGoogleLogin} from "@react-oauth/google";
import { Form, Input, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';

const Login = ()=> {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { login } = useAuth();
    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log("Token", tokenResponse)
    });
    
    const onFinish = async (values) => {
        try {
            // Імітація успішного логіну
            const mockUser = {
                id: 1,
                firstName: 'Користувач',
                lastName: 'Тестовий',
                email: values.email,
                avatar: undefined
            };
            
            login(mockUser);
            message.success('Успішний вхід!');
            navigate('/');
        } catch (err) {
            console.error("Error logging in:", err);
            message.error('Помилка входу. Перевірте ваші дані.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <Card 
                title={
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ласкаво просимо!</h1>
                        <p className="text-gray-600">Увійдіть до вашого акаунту McDonald's</p>
                    </div>
                } 
                style={{ 
                    maxWidth: 450, 
                    width: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                headStyle={{
                    borderBottom: 'none',
                    paddingBottom: '0'
                }}
                bodyStyle={{
                    padding: '32px'
                }}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    <Form.Item 
                        name="email" 
                        label="Email" 
                        rules={[
                            { required: true, message: 'Email є обов\'язковим!' },
                            { type: 'email', message: 'Введіть коректний email!' }
                        ]}
                    >
                        <Input 
                            placeholder="Введіть ваш email"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            { required: true, message: 'Пароль є обов\'язковим!' },
                            { min: 6, message: 'Пароль має містити мінімум 6 символів' },
                        ]}
                    >
                        <Input.Password 
                            placeholder="Введіть ваш пароль"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block
                            style={{
                                height: '48px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                background: 'var(--mcdonalds-red)',
                                borderColor: 'var(--mcdonalds-red)'
                            }}
                        >
                            Увійти
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <span className="text-gray-600">Немає акаунту? </span>
                        <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold">
                            Зареєструватися
                        </Link>
                    </div>
                    
                    <Link to="/password-reset" style={{ 
                        display: 'block', 
                        textAlign: 'center', 
                        marginTop: 16,
                        color: '#6b7280',
                        textDecoration: 'none'
                    }}>
                        Забули пароль?
                    </Link>
                    
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: 16 
                        }}>
                            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }}></div>
                            <span style={{ margin: '0 16px', color: '#6b7280' }}>або</span>
                            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }}></div>
                        </div>
                        
                        <Button 
                            type="default" 
                            onClick={() => loginByGoogle()} 
                            block 
                            style={{
                                height: '48px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                borderColor: '#d1d5db',
                                color: '#374151'
                            }}
                        >
                            <span style={{ marginRight: 8 }}>🔍</span>
                            Увійти через Google
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
