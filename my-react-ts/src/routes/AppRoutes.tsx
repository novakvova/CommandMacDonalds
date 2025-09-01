import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Dashboard from "../pages/Dashboard";
import Menu from "../pages/Menu";
import NoMatch from "../pages/NoMatch";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}
