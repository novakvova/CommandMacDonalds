import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <>
        <GoogleOAuthProvider clientId="627489791815-fm2svvvu2pnqsu6ns1k8qijbgthg7cn0.apps.googleusercontent.com">
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </>,
)
