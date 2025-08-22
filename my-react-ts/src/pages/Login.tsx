import {useGoogleLogin} from "@react-oauth/google";

const Login = ()=> {

    const loginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log("Token", tokenResponse)
    });

    return (
        <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Login</h2>
            <button onClick={() => loginByGoogle()}>Sign in with Google 🚀</button>;
            <p className="text-gray-600">This is the about page. Styled with Tailwind 🎨</p>
        </div>
    );
}

export default Login;
