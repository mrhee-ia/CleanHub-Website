import axios from "axios"

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})


// null review request interceptor for authorization
axiosClient.interceptors.request.use((config) => {

    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`

    return config
})

// authorization review reponse interceptor
axiosClient.interceptors.response.use((response) => {

    // on fulfilled:
    return response

}, (error) => {

    // on rejected:
    const {response} = error
    if (response.status === 401) {  // if user is not authorized with the response
        localStorage.removeItem('ACCESS_TOKEN')
    } throw error;

})

export default axiosClient