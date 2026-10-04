import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
    const logout = useAuth()
    const user = useAuth()
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <button>Logout</button>
        </div>
    )
}

export default Dashboard