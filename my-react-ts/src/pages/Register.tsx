import {useGoogleLogin} from "@react-oauth/google";
import { Form, Input, Button, message, Card } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

const Register = ()=> {
    const [form] = Form.useForm();
    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log("Token", tokenResponse)
    });
    
    const onFinish = async (values) => {
        axios.post("http://localhost:5129/api/account/register", values, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },    
        })
        .then(res => {
            console.log("res", res);
            message.success('Реєстрація успішна!');
        })
        .catch(err => {
            console.error("Error registering user:", err);
            message.error('Помилка реєстрації. Спробуйте ще раз.');
        });
        console.log("form data", values);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <Card 
                title={
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Створіть акаунт</h1>
                        <p className="text-gray-600">Приєднуйтесь до McDonald's сьогодні</p>
                    </div>
                } 
                style={{ 
                    maxWidth: 500, 
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
                    <div className="grid md:grid-cols-2 gap-4">
                        <Form.Item 
                            name="firstName" 
                            label="Ім'я" 
                            rules={[{ required: true, message: 'Ім\'я є обов\'язковим!' }]}
                        >
                            <Input 
                                placeholder="Введіть ваше ім'я"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>
                        
                        <Form.Item 
                            name="lastName" 
                            label="Прізвище" 
                            rules={[{ required: true, message: 'Прізвище є обов\'язковим!' }]}
                        >
                            <Input 
                                placeholder="Введіть ваше прізвище"
                                style={{ borderRadius: '8px' }}
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
                            style={{ borderRadius: '8px' }}
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
                            style={{ borderRadius: '8px' }}
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
                            Зареєструватися
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <span className="text-gray-600">Вже маєте акаунт? </span>
                        <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
                            Увійти
                        </Link>
                    </div>
                    
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
                            Зареєструватися через Google
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Register; 