import axiosClient from "./axiosClient";

export const getProfile = (role) => axiosClient.get(`/${role}/profile`);
export const createProfile = (role, data) => axiosClient.post(`/${role}/profile`, data);
export const updateProfile = (role, data) => axiosClient.put(`/${role}/profile`, data);
export const deleteProfile = (role) => axiosClient.delete(`/${role}/profile`);