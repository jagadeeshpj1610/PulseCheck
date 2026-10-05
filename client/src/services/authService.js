import api from "./api";

const registerUser = async(name, email, password) => {
    const response = await api.post('/auth/register', {name, email, password})
    return response.data
}

const loginUser = async(email, password) => {
    const response = await api.post('/auth/login', {email, password})
    return response.data
}

const getCurrentUser = async() => {
    const response = await api.get('/auth/me')
    return response.data
}

export {registerUser, loginUser, getCurrentUser}