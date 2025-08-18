import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/v1", //  base url
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const AXIOS_GET = async(url, options = {}) => {
  const controller = new AbortController();
  const response = await axiosClient.get(url, {
    ...options,
    signal: controller.signal,
  });
  return response;
};

export const AXIOS_POST = async(url, data, options = {}) => {
  const controller = new AbortController();
  const response = await axiosClient.post(url, data, {
    ...options,
    signal: controller.signal,
  });
  return response;
};

export const AXIOS_PUT = async(url,data, options={})=>{
    const controller = new AbortController();
    const response = await axiosClient.put(url,data, {
        ...options,
        signal: controller.signal
    });
    return response;
}

export const AXIOS_PATCH = async(url,data, options={})=>{
    const controller = new AbortController();
    const response = await axiosClient.patch(url,data,{
        ...options,
        signal: controller.signal
    });
    return response;
}


export const AXIOS_DELETE = async(url, options = {}) => {
  const controller = new AbortController();
  const response = await axiosClient.delete(url, { ...options, signal: controller.signal });
  return response;
};