import axios from "axios";

class UploadFilesService {
    static REST_API_BASE_URL = "http://localhost:8080/api/v1/";

    static async upload(orderId, file) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post(`${UploadFilesService.REST_API_BASE_URL}orders/${orderId}/upload-file`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data",
            }
        });
    }
}

export default UploadFilesService;