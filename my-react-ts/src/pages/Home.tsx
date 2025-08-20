import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered");

        axios.get("http://localhost:5129/api/users/list")
            .then(res => {
                console.log("res", res);
                setUsers(res.data); // зберігаємо юзерів у стан
            })
            .catch(err => {
                console.error("Error fetching users:", err);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Home</h2>
            <p className="text-gray-600 mb-4">Welcome to the homepage styled with Tailwind 🚀</p>

            <h3 className="text-lg font-medium text-gray-800 mb-2">User List:</h3>
            <ul className="space-y-2">
                {users.map((user: any, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded shadow">
                        <p><strong>Name:</strong> {user.fullName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
