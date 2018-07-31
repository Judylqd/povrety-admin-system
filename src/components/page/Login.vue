<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="vali">
                    <!-- 最后获取焦点的验证码输入框添加enter -->
                    <el-input class="verify" placeholder="请输入验证码" v-model="ruleForm.vali" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <span class="change" @click="change">换一张</span>
                    <img :src="imgSrc" alt="verify" class="pic">
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login, getVerifyImg, get} from '../../api.js'
    import Qs from 'qs'
    let Base64 = require('js-base64').Base64
    export default {
        data: function(){
            return {
                imgSrc: '',
                ruleForm: {
                    username: 'root',
                    password: '12345678',
                    vali: '123'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    vali: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                //$refs[forName]取refs属性中的forName
                this.$refs[formName].validate((valid) => {  //validate()验证rules规则
                    if (valid) {
                        // localStorage.setItem('ms_username',this.ruleForm.username);
                        // this.$router.push('/');
                        // 登录验证
                        let params = {
                            username: this.ruleForm.username,
                            password: Base64.encode(this.ruleForm.password), // 密码base64加密
                            vali: this.ruleForm.vali
                        }
                        login(Qs.stringify(params),{
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded', 
                            }
                        }).then(res => {
                            console.log(res);
                            let arr = [];
                            for (let key in res) {
                                arr.push(key);
                                if (key == 0) {
                                    // localstroage保存用户名
                                    localStorage.setItem('ms_username',this.ruleForm.username);
                                    // 登录状态一天过期，后台返回的“登录时间+一天”的时间戳保存到localstorage
                                    localStorage.setItem('timeout',res[key]);
                                    this.$router.push('/');
                                } else if (key == 1) {
                                    this.$message.error(res[key]);
                                    getVerifyImg().then(res => {
                                        this.imgSrc = res;
                                    })
                                } else if (key == 2) {
                                    this.$message.error(res[key])
                                    // 验证码错误的时候刷新验证码
                                    getVerifyImg().then(res => {
                                        this.imgSrc = res;
                                    })
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            change() {
                getVerifyImg().then(res => {
                    console.log(res)
                    this.imgSrc = res;
                })
            }
        },
        mounted() {
            getVerifyImg().then(res => {
                this.imgSrc = res
            })
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:190px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .verify {
        width: 45%;
    }
    .pic {
        float: right;
    }
    .change {
        cursor: pointer;
        margin-left: 5px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width: 100%;
        height: 36px;
    }
</style>