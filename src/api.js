import axios from 'axios'

// let base = 'http://123.207.13.37:8080/';
let base = '/';


// 登录相关接口
export const login = (params) => { return axios.post(`${base}` + 'doLogin',params).then(res => res.data) };

export const islogin = () => { return axios.post(`${base}` + 'isLogin').then(res => res.data) };

export const logout = () => { return axios.post(`${base}` + 'doLogout').then(res => res.data) };

export const getVerifyImg = () => { return axios.get(`${base}` + 'valicode').then(res => res.data) };

// case
export const getCaseList = () => { return axios.get(`${base}` + 'cases/list').then(res => res.data) };

export const addCase = (params) => { return axios.post(`${base}` + 'cases/add', params).then(res => res.data) };

export const deleteCase = (params) => { return axios.delete(`${base}` + 'cases/delete/' + params).then(res => res.data) };

export const getCaseDetail = (params) => { return axios.get(`${base}` + 'cases/detail/' + params).then(res => res.data) };

export const updateCase = (params) => { return axios.put(`${base}` + 'cases/update/', params).then(res => res.data) };

// news
export const getNewsList = () => { return axios.get(`${base}` + 'news/list').then(res => res.data) };

export const addNews = (params) => { return axios.post(`${base}` + 'news/add', params).then(res => res.data) };
// 删除一个
export const deleteNews = (params) => { return axios.delete(`${base}` + 'news/delete/' + params).then(res => res.data) };
// 删除多个
export const deleteNewsList = (params) => { return axios.delete(`${base}` + 'news/delete', { data: params }).then(res => res.data) };

export const getNewsDetail = (params) => { return axios.get(`${base}` + 'news/detail/' + params).then(res => res.data) };

export const updateNews = (params) => { return axios.put(`${base}` + 'news/update/', params).then(res => res.data) };

// notice
export const getNoticeList = () => { return axios.get(`${base}` + 'announce/list').then(res => res.data) };

export const addNotice = (params) => { return axios.post(`${base}` + 'announce/add', params).then(res => res.data) };
// 删除一个
export const deleteNotice = (params) => { return axios.delete(`${base}` + 'announce/delete/' + params).then(res => res.data) };
// 删除多个
export const deleteNoticeList = (params) => { return axios.delete(`${base}` + 'announce/delete', { data: params }).then(res => res.data) };

export const getNoticeDetail = (params) => { return axios.get(`${base}` + 'announce/detail/' + params).then(res => res.data) };

export const updateNotice = (params) => { return axios.put(`${base}` + 'announce/update/', params).then(res => res.data) };