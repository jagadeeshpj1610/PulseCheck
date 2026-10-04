import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('pulseCheckToken'))
    const [loading, setLoading] = useState(true)
    return(
        <AuthContext.Provider value={{user, token, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
