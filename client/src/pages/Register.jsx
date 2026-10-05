import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [fieldErrors, setFieldErrors] = useState([])

    const validation = (errors) => {
        if (!name.trim() || !email.trim() || !password) {
            errors.push("All fields are required")
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.push("Enter a Valid email address")
        }
        if (password !== confirmPassword) {
            errors.push("Password do not match")
        }
        if (password.length < 8 || password.length > 72) {
            errors.push("Password must be atleast 8 characters")
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            errors.push("Password must include uppercase, lowercase and a number")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr("")
        setSuccess("")
        setFieldErrors([])

        const errors = []
        validation(errors)
        if (errors.length > 0) {
            setFieldErrors(errors)
            return
        }

        setSubmitting(true)
        try {
            await registerUser(name, email, password)
            setSuccess("Account created. You can now log in")
        } catch (error) {
            console.error(error)
            setErr(error.response?.data?.message || "Something went wrong")
            setFieldErrors(error.response?.data?.errors || [])
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div>
            <h1>Create Your PulseCheck Account</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="Enter your name " onChange={(e) => setName(e.target.value)} />
                <input type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" value={confirmPassword} placeholder="Enter the confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" disabled={submitting} >{submitting ? "Registering..." : "Register"}</button>
            </form>
            <p>Already have an Account? <Link to="/login">Login</Link></p>
            {err && <p>{err}</p>}
            {success && <p>{success}</p>}
            {fieldErrors.length > 0 && (
                <ul>
                    {fieldErrors.map((msg) => <li key={msg}>{msg}</li>)}
                </ul>
            )}
        </div>
    )
}

export default Register