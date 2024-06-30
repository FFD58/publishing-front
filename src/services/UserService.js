import axios from "axios";

class UserService {
    static REST_API_AUTH_URL = "http://localhost:8080/auth/";

    static REST_API_BASE_URL = "http://localhost:8080/api/v1/users";

    static async signUp(user) {
        return axios.post(`${UserService.REST_API_AUTH_URL}` + "sign-up", user)}

    static async logIn(user) {
        return axios.post(`${UserService.REST_API_AUTH_URL}` + "sign-in", user)
    }

    static async listUsers() {
        return axios.get(`${UserService.REST_API_BASE_URL}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async getUser(userId) {
        return axios.get(`${UserService.REST_API_BASE_URL}/${userId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('role')
        localStorage.removeItem('username')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ROLE_ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'ROLE_USER'
    }

    static getUsername() {
        return localStorage.getItem('username')
    }

}

export default UserService;