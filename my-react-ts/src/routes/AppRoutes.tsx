import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login.tsx";
import Dashboard from "../pages/Dashboard";
import NoMatch from "../pages/NoMatch";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}
