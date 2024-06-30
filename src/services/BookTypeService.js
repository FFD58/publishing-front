import axios from "axios";

class BookTypeService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/books/types";

    static async listBookTypes() {
        return axios.get(`${BookTypeService.REST_API_BASE_URL}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async getBookType(bookTypeId) {
        return axios.get(`${BookTypeService.REST_API_BASE_URL}/${bookTypeId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async createBookType(bookType) {
        return axios.post(`${BookTypeService.REST_API_BASE_URL}`, bookType, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    static async updateBookType(bookTypeId, bookType) {
        return axios.put(`${BookTypeService.REST_API_BASE_URL}/${bookTypeId}`, bookType,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async deleteBookType(bookTypeId) {
        return axios.delete(`${BookTypeService.REST_API_BASE_URL}/${bookTypeId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }
}

export default BookTypeService;