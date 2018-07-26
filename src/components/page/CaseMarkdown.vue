<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i>案例</el-breadcrumb-item>
                <el-breadcrumb-item>新建案例</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <p>
                    标题：<input type="text" v-model="title" placeholder="请输入标题">
                </p>
            </div>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-success="handlePictureSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" class="pic">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" class="editor"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        data() {
            return {
                title: '',
                content:'',
                html:'<h1>make</h1>',
                //上传图片的URL和显示
                dialogImageUrl: '',
                dialogVisible: false,
                //isShow
                isShow: true,
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        computed: {
            hideShow() {

            }
        },
        methods: {
            // 限制上传图片的大小和格式
            beforeAvatarUpload(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isJP = isJPG || isPNG;   //上传图片是两者中的一种都不截止上传
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG\PNG 格式!');
                }
                if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJP && isLt5M;
            },
            handlePictureSuccess(file) {
            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                console.log(this.title);
                
                console.log(this.content);
                console.log(this.html);
                console.log(this.$refs.md);
                this.$message.success('提交成功！');
            }   
        }
    }
</script>
<style scoped>
    .back {
        cursor: pointer;
    }
    .editor-btn {
        margin-top: 20px;
    }
    .plugins-tips {
        text-align: center;
    }
    .pic {
        display: flex;
        justify-content: center;
    }
    .editor {
        margin-top: 20px;
    }
</style>