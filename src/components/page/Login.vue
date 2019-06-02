<template>
    <div class="login-wrap">
        <div class="ms-title">精准扶贫特产网后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="vali"> -->
                    <!-- 最后获取焦点的验证码输入框添加enter -->
                    <!-- <el-input class="verify" placeholder="请输入验证码" v-model="ruleForm.vali" @keyup.enter.native="submitForm('ruleForm')"></el-input> -->
                    <!-- <span class="change" @click="change">换一张</span>
                    <img :src="imgSrc" alt="verify" class="pic"> -->
                    <!-- <div class="verifiCode">
                        <img style="width: 140px;" :src="imgSrc" @click="refreshCaptcha">
                    </div>
                </el-form-item> -->
                <div class="login-btn">
                    <el-button type="primary" @click="handleSubmit()">登录</el-button>
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
                imgSrc: 'http://localhost:8088/captcha.jpg',
                ruleForm: {
                    username: '',
                    password: '',
                    vali: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ],
                    vali: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit () {
                let userInfo = {
                    adminName: this.ruleForm.username,
                    password: this.ruleForm.password,
                    captcha: this.ruleForm.vali,
                    userKind: '管理员',
                };
                login(userInfo).then(res => {
                    if (res.msg != null) {
                    alert(res.msg);
                    } else {
                    // alert(res.data.data.token);
                    // 放置token到Cookie,保存7天
                    // Cookies.set('token', res.data.data.token,{expires: 7});
                    // 保存用户到本地会话
                    localStorage.setItem('loginInfo', JSON.stringify(userInfo));
                    // 登录成功，跳转到主页
                    // localStorage.setItem('loginInfo', JSON.stringify(userInfo));
                    window.location.href = '/';
                    }
                }).catch(function (res) {
                    alert(res);
                })
                },
            refreshCaptcha: function () {
                this.imgSrc = this.global.baseUrl + '/captcha.jpg?t=' + new Date().getTime();
            }
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
.verifiCode {
    margin-left: 155px;
    margin-top: -33px;
}
</style>