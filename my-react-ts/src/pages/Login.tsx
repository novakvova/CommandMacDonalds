import {useGoogleLogin} from "@react-oauth/google";
import { Form, Input, Button, message, Card } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = ()=> {
    const [form] = Form.useForm();
    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log("Token", tokenResponse)
    });
    const onFinish = async (values) => {
        axios.post("http://localhost:5129/api/account/login", values, {
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },    
        })
        .then(res => {
            console.log("res", res);
          //  setUsers(res.data); // зберігаємо юзерів у стан
        })
        .catch(err => {
            console.error("Error fetching users:", err);
        });
        console.log("form data", values);
    }


    return (
             <Card title="Вхід" style={{ maxWidth: 400, margin: '50px auto' }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        { required: true, message: 'Пароль є обов\'язковим!' },
                        // { min: 6, message: 'Пароль має містити мінімум 6 символів' },
                        // { pattern: /[A-Z]/, message: 'Пароль повинен містити хоча б одну велику літеру' },
                        // { pattern: /\d/, message: 'Пароль повинен містити хоча б одну цифру' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Увійти
                    </Button>
                </Form.Item>

                <Link to="/password-reset" style={{ marginTop: 8 }}>Забули пароль?</Link>
                
                <Form.Item>
                    <Button 
                        type="default" 
                        onClick={() => loginByGoogle()} 
                        block 
                        style={{ marginTop: 8 }}
                    >
                        Увійти через Google
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Login;
