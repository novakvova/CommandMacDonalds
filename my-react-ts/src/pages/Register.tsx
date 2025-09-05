import {useGoogleLogin} from "@react-oauth/google";
import { Form, Input, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Menu.css';

const Register = ()=> {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { register } = useAuth();
    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log("Token", tokenResponse)
    });
    
    const onFinish = async (values) => {
        try {
            // Імітація успішної реєстрації
            const newUser = {
                id: Date.now(),
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                avatar: undefined
            };
            
            register(newUser);
            message.success('Реєстрація успішна!');
            navigate('/');
        } catch (err) {
            console.error("Error registering user:", err);
            message.error('Помилка реєстрації. Спробуйте ще раз.');
        }
    }

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1>Створіть акаунт</h1>
                <p>Приєднуйтесь до McDonald's сьогодні</p>
            </div>

            <div className="max-w-lg mx-auto">
                <div className="card p-8">
                    <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Form.Item 
                                name="firstName" 
                                label="Ім'я" 
                                rules={[{ required: true, message: 'Ім\'я є обов\'язковим!' }]}
                            >
                                <Input 
                                    placeholder="Введіть ваше ім'я"
                                    className="input-primary"
                                />
                            </Form.Item>
                            
                            <Form.Item 
                                name="lastName" 
                                label="Прізвище" 
                                rules={[{ required: true, message: 'Прізвище є обов\'язковим!' }]}
                            >
                                <Input 
                                    placeholder="Введіть ваше прізвище"
                                    className="input-primary"
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
                                { pattern: /[A-Z]/, message: 'Пароль повинен містити хоча б одну велику літеру' },
                                { pattern: /\d/, message: 'Пароль повинен містити хоча б одну цифру' },
                            ]}
                        >
                            <Input.Password 
                                placeholder="Створіть пароль"
                                className="input-primary"
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="confirmPassword"
                            label="Підтвердження пароля"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Підтвердження пароля є обов\'язковим!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Паролі не співпадають!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                placeholder="Підтвердіть пароль"
                                className="input-primary"
                            />
                        </Form.Item>
                        
                        <Form.Item>
                            <button 
                                type="submit" 
                                className="add-to-cart-btn w-full"
                            >
                                Зареєструватися
                            </button>
                        </Form.Item>

                        <div className="text-center mt-4">
                            <span className="text-gray-600">Вже маєте акаунт? </span>
                            <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
                                Увійти
                            </Link>
                        </div>
                        
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
                                Зареєструватися через Google
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register; 