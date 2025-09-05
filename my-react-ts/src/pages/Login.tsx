import {useGoogleLogin} from "@react-oauth/google";
import { Form, Input, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Menu.css';

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
        <div className="menu-container">
            <div className="menu-header">
                <h1>Ласкаво просимо!</h1>
                <p>Увійдіть до вашого акаунту McDonald's</p>
            </div>

            <div className="max-w-md mx-auto">
                <div className="card p-8">
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
                                className="input-primary"
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
                                className="input-primary"
                            />
                        </Form.Item>
                        
                        <Form.Item>
                            <button 
                                type="submit" 
                                className="add-to-cart-btn w-full"
                            >
                                Увійти
                            </button>
                        </Form.Item>

                        <div className="text-center mt-4">
                            <span className="text-gray-600">Немає акаунту? </span>
                            <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold">
                                Зареєструватися
                            </Link>
                        </div>
                        
                        <Link to="/password-reset" className="block text-center mt-4 text-gray-500 hover:text-gray-700">
                            Забули пароль?
                        </Link>
                        
                        <div className="mt-6">
                            <div className="flex items-center mb-4">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <span className="mx-4 text-gray-500">або</span>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>
                            
                            <button 
                                type="button"
                                onClick={() => loginByGoogle()} 
                                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                            >
                                <span className="mr-2">🔍</span>
                                Увійти через Google
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
