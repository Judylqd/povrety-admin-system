import axios from 'axios'

let base = 'http://123.207.13.37:8080/';


// 登录相关接口
export const login = (params) => { return axios.post(`${base}` + 'doLogin',params).then(res => res.data) };

export const islogin = () => { return axios.post(`${base}` + 'isLogin').then(res => res.data) };

export const logout = () => { return axios.post(`${base}` + 'doLogout').then(res => res.data) };


export const getVerifyImg = () => { return axios.get(`${base}` + 'valicode').then(res => res.data) };

export const getCaseList = () => { return axios.get(`${base}` + 'cases/list').then(res => res.data) };

export const deleteCase = (params) => { return axios.delete(`${base}` + 'cases/delete/' + params).then(res => res.data) };