import axios from "axios";

class BookFormatService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/books/formats";

    static async listBookFormats() {
        return axios.get(`${BookFormatService.REST_API_BASE_URL}`)
    }

    static async getBookFormat(bookFormatId) {
        return axios.get(`${BookFormatService.REST_API_BASE_URL}/${bookFormatId}`)
    }

    static async createBookFormat(bookFormat) {
        return axios.post(`${BookFormatService.REST_API_BASE_URL}`, bookFormat)
    }

    static async updateBookFormat(bookFormatId, bookFormat) {
        return axios.put(`${BookFormatService.REST_API_BASE_URL}/${bookFormatId}`, bookFormat)
    }

    static async deleteBookFormat(bookFormatId) {
        return axios.delete(`${BookFormatService.REST_API_BASE_URL}/${bookFormatId}`)
    }
}

export default BookFormatService;