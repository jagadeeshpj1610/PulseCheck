import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { getCurrentUser, loginUser } from "../services/authService"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('pulseCheckToken'))
    const [loading, setLoading] = useState(true)
    const login = async (email, password) => {
        const data = await loginUser(email, password)
        localStorage.setItem('pulseCheckToken', data.token)
        setToken(data.token)
        setUser(data.data)
    }
    const logout = () => {
        localStorage.removeItem('pulseCheckToken')
        setToken(null)
        setUser(null)
    }
    useEffect(() => {
        const checkAuth = async () => {
            if (!localStorage.getItem('pulseCheckToken')) {
                setLoading(false)
                return
            } 
            try {
                const data = await getCurrentUser()
                setUser(data.user)
            } catch (error) {
                logout()
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])
    return(
        <AuthContext.Provider value={{user, token, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
