import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const testApi = ()=>{
    return Api.get('/')
}

export const registerApi = (date) => Api.post('/api/user/register', date);

export const loginApi = (date) => Api.post('/api/user/login', date);