import Cookies from 'js-cookie'

const loginProcess = (payload) => {
    return new Promise((resolve, reject) => {
        const { email, password } = payload
        if ((email != null && email != '') && (password != null && password != '')) {
            const token = btoa(email) + ':' + btoa(password)
            resolve({email, token})
        } else {
            reject({msg: 'Login tidak berhasil'})
        }
    })
}

const saveToken = (token) => {
    return Cookies.set('auth_token', token)
}

const getToken = () => {
    return Cookies.get('auth_token')
}

const saveMe = (data) => {
    return Cookies.set('me', JSON.stringify(data))
}

const clearToken = () => {
    return Cookies.remove('auth_token')
}

const clearMe = () => {
    return Cookies.remove('me')
}

export { loginProcess, saveToken, getToken, saveMe, clearToken, clearMe }