import { Link } from "react-router-dom";

export default function NoMatch() {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
            <p className="text-gray-600 mb-4">Oops! The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
                Go Home
            </Link>
        </div>
    );
}
