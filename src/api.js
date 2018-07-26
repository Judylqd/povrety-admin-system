import axios from 'axios'

let base = 'http://123.207.13.37:8080/';

export const login = (params) => { return axios.post(`${base}` + 'doLogin',params).then(res => res.data) };

export const getVerifyImg = () => { return axios.get(`${base}` + 'valicode').then(res => res.data) };

export const getCaseList = () => { return axios.get(`${base}` + 'case/list').then(res => res.data) };

export const deleteCase = (params) => { return axios.get(`${base}` + 'case/delete/' + params).then(res => res.data) };