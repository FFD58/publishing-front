import axios from "axios";

class OrderService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/orders";

    static async listOrders() {
        return axios.get(`${OrderService.REST_API_BASE_URL}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async getOrder(orderId) {
        return axios.get(`${OrderService.REST_API_BASE_URL}/${orderId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async createOrder(order) {
        return axios.post(`${OrderService.REST_API_BASE_URL}`, order,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async updateOrder(orderId, order) {
        return axios.put(`${OrderService.REST_API_BASE_URL}/${orderId}`, order,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async deleteOrder(orderId) {
        return axios.delete(`${OrderService.REST_API_BASE_URL}/${orderId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }
}

export default OrderService;