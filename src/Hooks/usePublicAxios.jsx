import axios from "axios";

const publicAxios = axios.create({
    baseURL: 'https://task-management-one-ashy.vercel.app'
})

const usePublicAxios = () => {
    return publicAxios
};

export default usePublicAxios;