import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { replace, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [fieldErrors, setFieldErrors] = useState([])
    const { login } = useAuth()
    const navigate = useNavigate()

    const validation = (errors) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.push("Enter a valid email address")
        }
        if (!password) {
            errors.push("Password is required")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr("")
        setFieldErrors([])
        const errors = []
        validation(errors)
        if (errors.length > 0) {
            setFieldErrors(errors)
            return
        }
        setSubmitting(true)
        try {
            await login(email, password)
            console.log("logged in");
            navigate("/dashboard", { replace: true })

        } catch (error) {
            setErr(error.response?.data?.message || 'Something went wrong')
            setFieldErrors(error.response?.data?.errors || [])
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <h2>Login to Pulse Check</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={submitting} >{submitting ? "Logging in...." : "Login"}</button>
            </form>
            <p>No Account? <Link to="/register">Register</Link></p>
            {err && <p>{err}</p>}
            {fieldErrors.length > 0 && (
                <ul>
                    {fieldErrors.map((msg) => <li key={msg}>{msg}</li>)}
                </ul>
            )}
        </div>
    )
}

export default Login