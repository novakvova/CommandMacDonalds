import AppRoutes from "./routes/AppRoutes";
import './App.css'


const App = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">🚀 React Router + Tailwind</h1>
            <p className="text-gray-600 mb-6">
                This example demonstrates some of the core features of{" "}
                <span className="font-semibold">React Router</span> styled with{" "}
                <span className="font-semibold">TailwindCSS</span>.
            </p>
            <AppRoutes />
        </div>
    );
}

export default App;

