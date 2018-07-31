<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i>案例</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <p>
                    标题：<input type="text" v-model="title" placeholder="请输入标题">
                </p>
            </div>
            <div>
                <span>原图：</span>
                <img :src="imgUrl" alt="">
            </div>
            <el-upload
                :action="url"
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
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" class="editor"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import { addCase, getCaseDetail, updateCase } from '../../api.js'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        data() {
            return {
                cid: '',  // case的cid
                imgUrl: '',
                url: '/'+ 'upload',
                title: '',   // 标题
                content:'', // markdown语法文本
                //上传图片的URL和显示
                dialogImageUrl: '',  // 上传图片的URL
                dialogVisible: false,
                html:'<h1>make</h1>',
                fileList: []
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 限制上传图片的大小和格式
            beforeAvatarUpload(file) {
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
            handlePictureSuccess(response,file,fileList) {
                console.log(this.fileList)
                let obj = document.getElementsByClassName("el-upload el-upload--picture-card")[0];
                // getElementsByClassName取的是一个数组
                obj.style.display = 'none';
                this.dialogImageUrl = response;   // 后台返回的图片URL
            },
            handlePictureCardPreview(file) {
                this.dialogVisible = true;  // 封面图片上传成功后，显示图片
            },
            handleRemove(file,fileList) {
                let obj = document.getElementsByClassName("el-upload el-upload--picture-card")[0];
                obj.style.display = 'inline-block';
                console.log(file);
                console.log(fileList);
            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 服务器接口
                this.$axios({
                    url: 'http://123.207.13.37:8080/upload',
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
            getEdit() {
                let typeSelect = this.$route.query.type;
                this.cid = this.$route.query.cid;
                if (typeSelect == 'edit') {  // 判断是编辑还是新增
                    getCaseDetail(this.cid).then(res => {
                        this.title = res.caseName;
                        this.imgUrl = res.img;
                        this.content = res.markdown;
                    })
                }
            },
            submit(){
                let typeSelect = this.$route.query.type;
                if (typeSelect == 'edit') {  // 判断是编辑还是新增
                    let img;
                    if (this.dialogImageUrl=='') {
                        img = this.imgUrl;
                    } else {
                        img = this.dialogImageUrl;
                    }
                    let params2 = { // 修改传参
                        cid: this.cid,
                        caseName: this.title,
                        img: img,
                        markdown: this.content
                    }
                    updateCase(params2).then(res => {
                        this.$message.success(res);
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }
                else if (typeSelect == 'add') {
                    
                    let params1 = { // 添加传参
                        caseName: this.title,
                        img: this.dialogImageUrl,
                        markdown: this.content
                    }
                    addCase(params1).then(res => {
                    this.$message.success(res);
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }
            }   
        },
        mounted() {
            this.getEdit();
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
    /* .plugins-tips {
        text-align: center;
    }*/
    .pic {
        /* display: flex;
        justify-content: center; */
        margin-top: 10px;
    } 
    .editor {
        margin-top: 20px;
    }
    .disabled {
        display: none;
    }
</style>