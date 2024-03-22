"use client"
import axios from "axios";
// import { useToast } from "@/components/ui/use-toast"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

// Apply auth token taken from local storage to every request
apiClient.interceptors.request.use(request => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
    request.headers.AccessToken = token
  }
  return request
})

// If auth failed remove token from local storage
// If response is a bad request show a notification containing the error
apiClient.interceptors.response.use(undefined, error => {
  const {response} = error

  // Do something When network error happens (ECONNREFUSED)(ERR_EMPTY_RESPONSE)(no status code) mostly in server crash, server timeout
  // Promise reject will be caught by .catch()
  if (!response && axios.isAxiosError(error) && error.message === 'Network Error') {
    return Promise.reject({error: error})
  }

  // Do something 5xx
  if (response.status > 500) {
    return Promise.reject({error: error})
  }

  if (response.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('infoConsentAllowed')
  }
  if (response.status === 400) {
    // const {toast} = useToast()
    // toast({
    //   title: "Uh oh! Something went wrong.",
    //   description: "There was a problem with your request.",
    // })
    // notification.error({message: "Başarısız", description: response.data.message})
  }
})

export default apiClient