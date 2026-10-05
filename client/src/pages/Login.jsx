import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { replace, useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr("")
        setSubmitting(true)
        try {
            await login(email, password)
            console.log("logged in");
            navigate("/dashboard", { replace: true })

        } catch (error) {
            setErr(error.response?.data?.message || 'Something went wrong')
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
            {err && <p>{err}</p>}
        </div>
    )
}

export default Login