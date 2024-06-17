import axios from "axios";

class BookTypeService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/books/types";

    static async listBookTypes() {
        return axios.get(`${BookTypeService.REST_API_BASE_URL}`)
    }

    static async getBookType(bookTypeId) {
        return axios.get(`${BookTypeService.REST_API_BASE_URL}/${bookTypeId}`)
    }

    static async createBookType(bookType) {
        return axios.post(`${BookTypeService.REST_API_BASE_URL}`, bookType)
    }

    static async updateBookType(bookTypeId, bookType) {
        return axios.put(`${BookTypeService.REST_API_BASE_URL}/${bookTypeId}`, bookType)
    }

    static async deleteBookType(bookTypeId) {
        return axios.delete(`${BookTypeService.REST_API_BASE_URL}/${bookTypeId}`)
    }
}

export default BookTypeService;