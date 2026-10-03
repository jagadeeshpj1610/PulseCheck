

const validateUserRegister = (req, res, next) => {
    const { name, email, password } = req.body || {}
    const errors = []
    if (typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters')
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
        errors.push('Enter a valid email address')
    }
    if (typeof password !== 'string') {
        errors.push('Password is required')
    } else {
        if (password.length < 8 || password.length > 72) {
            errors.push('Password must be alateat 8 characters')
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            errors.push('Password must include uppercase, lowercase and a number')
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors })
    }

    next()
}

const validateLoginUser = (req, res, next) => {
    const { email, password } = req.body;
    const errors = []
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
        errors.push('Enter a valid email address')
    }
    if (typeof password !== 'string') {
        errors.push('Password is required')
    } else {
        if (password.length < 8 || password.length > 72) {
            errors.push('Password must be alateat 8 characters')
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            errors.push('Password must include uppercase, lowercase and a number')
        }
    }
    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed', errors })

    next()
}

module.exports = { validateUserRegister, validateLoginUser }