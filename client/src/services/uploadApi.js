import axios from 'axios'

export const uploadFile = (data) => {

    return axios.post("http://localhost:8000/api/upload", data);
}
