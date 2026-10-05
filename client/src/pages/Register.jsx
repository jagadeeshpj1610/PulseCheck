import { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr("")
        setSubmitting(true)
        setSuccess("")
        if (password !== confirmPassword) {
            setErr("password do not match")
            setSubmitting(false)
            return
        }
        try {
            await registerUser(name, email, password)
            setSuccess("Account created. You can now log in")
        } catch (error) {
            setErr(error.response?.data?.message || "Something went wrong")
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
        </div>
    )
}

export default Register