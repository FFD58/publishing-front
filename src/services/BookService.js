import axios from "axios";

class BookService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/books";

    static async listBooks() {
        return axios.get(`${BookService.REST_API_BASE_URL}`)
    }

    static async getBook(bookId) {
        return axios.get(`${BookService.REST_API_BASE_URL}/${bookId}`)
    }

    static async createBook(book) {
        return axios.post(`${BookService.REST_API_BASE_URL}`, book)
    }

    static async updateBook(bookId, book) {
        return axios.put(`${BookService.REST_API_BASE_URL}/${bookId}`, book)
    }

    static async deleteBook(bookId) {
        return axios.delete(`${BookService.REST_API_BASE_URL}/${bookId}`)
    }
}

export default BookService;