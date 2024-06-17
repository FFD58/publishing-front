import axios from "axios";

class CustomerService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/customers";

    static async listCustomers() {
        return axios.get(`${CustomerService.REST_API_BASE_URL}`)
    }

    static async getCustomer(customerId) {
        return axios.get(`${CustomerService.REST_API_BASE_URL}/${customerId}`)
    }

    static async createCustomer(customer) {
        return axios.post(`${CustomerService.REST_API_BASE_URL}`, customer)
    }

    static async updateCustomer(customerId, customer) {
        return axios.put(`${CustomerService.REST_API_BASE_URL}/${customerId}`, customer)
    }

    static async deleteCustomer(customerId) {
        return axios.delete(`${CustomerService.REST_API_BASE_URL}/${customerId}`)
    }
}

export default CustomerService;