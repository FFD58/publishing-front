import axios from "axios";

class TaskService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/users/tasks";

    static async listTasks() {
        return axios.get(`${TaskService.REST_API_BASE_URL}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async getCurrentUserTasks() {
        return axios.get(`${TaskService.REST_API_BASE_URL}/current-user`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async getTask(taskId) {
        return axios.get(`${TaskService.REST_API_BASE_URL}/${taskId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async completeTask(taskId) {
        return axios.get(`${TaskService.REST_API_BASE_URL}/complete/${taskId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async createTask(task) {
        return axios.post(`${TaskService.REST_API_BASE_URL}`, task,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async updateTask(taskId, task) {
        return axios.put(`${TaskService.REST_API_BASE_URL}/${taskId}`, task,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }

    static async deleteTask(taskId) {
        return axios.delete(`${TaskService.REST_API_BASE_URL}/${taskId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    }
}

export default TaskService;