import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    return (
        <div>
            <form>
                <input type="text" value={name} placeholder="Enter your name " onChange={(e) => setName(e.target.value)} />
                <input type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register