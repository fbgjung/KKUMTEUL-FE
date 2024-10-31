import axios, { AxiosResponse } from 'axios';

const axiosWithToken = axios.create();

axiosWithToken.defaults.headers.common['Content-Type'] = 'application/json';

axiosWithToken.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${accessToken}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);



axiosWithToken.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Refresh 토큰은 쿠키에 자동으로 담겨 전송됨
                const { data } = await axios.post('/kkumteul/api/auth/refresh');

                const newAccessToken = data.response.accessToken;
                sessionStorage.setItem('accessToken', newAccessToken);

                // 원래 요청에 새 Access 토큰 설정 후 재시도
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosWithToken(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosWithToken;
