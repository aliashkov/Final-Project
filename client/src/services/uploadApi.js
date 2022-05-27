import axios from 'axios'
import { interceptorRefreshToken } from '../interceptors/intercetptorRefreshToken';

export const UploadFile = async (fileData , user) => {

    const axiosJWT = axios.create()
    interceptorRefreshToken(user , axiosJWT)

    await axiosJWT.post("http://localhost:8000/api/upload", fileData, {
        headers: { authorization: "Bearer " + user.accessToken },
    });

    return axiosJWT;
}


