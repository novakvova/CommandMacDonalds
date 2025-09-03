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
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Ласкаво просимо!</h1>
                    <p>Увійдіть до вашого акаунту McDonald's</p>
                </div>
                
                <Form form={form} layout="vertical" onFinish={onFinish} size="large" className="auth-form">
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
                        ]}
                    >
                        <Input.Password 
                            placeholder="Введіть ваш пароль"
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
                            Увійти
                        </Button>
                    </Form.Item>

                    <div className="auth-links">
                        <span>Немає акаунту? </span>
                        <Link to="/register" className="auth-link">
                            Зареєструватися
                        </Link>
                    </div>
                    
                    <Link to="/password-reset" className="auth-forgot-link">
                        Забули пароль?
                    </Link>
                    
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
                        Увійти через Google
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
