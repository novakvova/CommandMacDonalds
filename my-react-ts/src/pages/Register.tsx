import {useGoogleLogin} from "@react-oauth/google";
import { Form, Input, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';

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
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Створіть акаунт</h1>
                    <p>Приєднуйтесь до McDonald's сьогодні</p>
                </div>
                
                <Form form={form} layout="vertical" onFinish={onFinish} size="large" className="auth-form">
                    <div className="name-fields">
                        <Form.Item 
                            name="firstName" 
                            label="Ім'я" 
                            rules={[{ required: true, message: 'Ім\'я є обов\'язковим!' }]}
                        >
                            <Input 
                                placeholder="Введіть ваше ім'я"
                                className="auth-input"
                            />
                        </Form.Item>
                        
                        <Form.Item 
                            name="lastName" 
                            label="Прізвище" 
                            rules={[{ required: true, message: 'Прізвище є обов\'язковим!' }]}
                        >
                            <Input 
                                placeholder="Введіть ваше прізвище"
                                className="auth-input"
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
                            className="auth-input"
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
                            className="auth-input"
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
                            className="auth-input"
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block
                            className="auth-submit-btn"
                        >
                            Зареєструватися
                        </Button>
                    </Form.Item>

                    <div className="auth-links">
                        <span>Вже маєте акаунт? </span>
                        <Link to="/login" className="auth-link">
                            Увійти
                        </Link>
                    </div>
                    
                    <div className="auth-divider">
                        <div className="divider-line"></div>
                        <span>або</span>
                        <div className="divider-line"></div>
                    </div>
                    
                    <Button 
                        type="default" 
                        onClick={() => loginByGoogle()} 
                        block 
                        className="auth-google-btn"
                    >
                        <span className="google-icon">🔍</span>
                        Зареєструватися через Google
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register; 