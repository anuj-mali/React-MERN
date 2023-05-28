import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "http://127.0.0.1:8000/store/",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const config = {
    headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
    },
};

export const testApi = () => {
    return Api.get("/");
};

export const registerApi = (data) => Api.post("/api/user/register", data);

export const loginApi = (data) => Api.post("/api/user/login", data);

// export const customerApi = (date) => Api.get("/customers", date);
export const addProductApi = (data) => Api.post("/api/product/add", data, config);

export const getAllProductsApi = () => Api.get("/api/product/get-products");

export const getSingleProductApi = (id) => Api.get(`/api/product/get-products/${id}`);
