import axios from 'axios'

// let base = 'http://123.207.13.37:8080/';
let base = 'http://localhost:8088/';


// 登录相关接口
export const login = (params) => { return axios.post(`${base}` + '/adminLogin',params).then(res => res.data) };

export const islogin = () => { return axios.post(`${base}` + 'isLogin').then(res => res.data) };

export const logout = () => { return axios.post(`${base}` + 'doLogout').then(res => res.data) };

export const getVerifyImg = () => { return axios.get(`${base}` + 'valicode').then(res => res.data) };


// =====================获取订单信息========================
export const getNewsList = (params) => { return axios.post(`${base}` + 'findOrderLimit', params).then(res => res.data) };

// 获取商品信息
export const getGoodsList = (params) => { return axios.post(`${base}` + 'findGoodsLimit', params).then(res => res.data) };

// 获取用户信息
export const getUserList = (params) => { return axios.post(`${base}` + 'findUserLimit', params).then(res => res.data) };


// ======================编辑用户信息===========================
export const editUserInfo = (params) => { return axios.post(`${base}` + 'editSubmit', params).then(res => res.data) };

//添加用户信息
export const addUserInfo = (params) => { return axios.post(`${base}` + 'editSubmit', params).then(res => res.data) };

// 删除单个用户信息
export const deleteUser = (params) => { return axios.post(`${base}` + 'deleteUser', params).then(res => res.data) };


// =======================删除订单================================
export const deleteOrder = (params) => { return axios.post(`${base}` + 'deleteOrder', params).then(res => res.data) };

// 编辑订单信息
export const editOrderInfo = (params) => { return axios.post(`${base}` + 'updateOrder', params).then(res => res.data) };

// ========================删除商品===============================
export const deleteGoods = (params) => { return axios.post(`${base}` + 'deleteGoods', params).then(res => res.data) };

// 编辑商品信息
export const editGoodsInfo = (params) => { return axios.post(`${base}` + 'updateGoods', params).then(res => res.data) };

// 获取供应商信息
export const getApplayList = (params) => { return axios.post(`${base}` + 'findApplyLimit', params).then(res => res.data) };

// 获取投资者列表
export const getInvestorList = (params) => { return axios.post(`${base}` + 'findInvestorLimit', params).then(res => res.data) };

// 删除投资者信息
export const deleteInvestor = (params) => { return axios.post(`${base}` + 'deleteByInvestorId', params).then(res => res.data) };

// 删除供应商信息
export const deleteApply = (params) => { return axios.post(`${base}` + 'deleteByApplyId', params).then(res => res.data) };