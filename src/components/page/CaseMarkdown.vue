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
            <div v-if="original" class="original-box">
                <span>原图：</span>
                <div class="original-img">
                    <img :src="originalImgUrl" alt="原图">
                </div>
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
    import { addCase, getCaseDetail, updateCase, uploadImg } from '../../api.js'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        data() {
            return {
                original: false,
                originalImgUrl: '',
                url: '/'+ 'upload',
                title: '',   // 标题
                content:'', // markdown语法文本
                html:'<h1>make</h1>',  // markdown转化的html
                dialogImageUrl: '',  // 上传图片的URL
                dialogVisible: false,
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
                uploadImg(formdata, {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
                // 服务器接口
                // this.$axios({
                //     url: 'http://123.207.13.37:8080/upload',
                //     method: 'post',
                //     data: formdata,
                //     headers: { 'Content-Type': 'multipart/form-data' },
                // }).then((url) => {
                //     this.$refs.md.$img2Url(pos, url);
                // })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            getEdit() {
                let typeSelect = this.$route.params.type;
                if (typeSelect == 'editCase') {  // 判断是编辑还是新增
                    this.original = true;  // 编辑时显示原图
                    let cid = this.$route.params.cid;
                    getCaseDetail(cid).then(res => {
                        this.title = res.caseName;
                        this.originalImgUrl = res.img;
                        this.content = res.markdown;
                    })
                } else {
                    this.original = false;  // 新增时不显示原图
                }
            },
            submit(){
                let type = this.$route.params.type;
                if (type == 'editCase') {  // 判断是编辑还是新增
                    let img;
                    let cid = this.$route.params.cid
                    if (this.dialogImageUrl=='') {
                        img = this.originalImgUrl;
                    } else {
                        img = this.dialogImageUrl;
                    }
                    let params1 = { // 修改传参
                        cid: cid,
                        caseName: this.title,
                        img: img,
                        markdown: this.content
                    }
                    updateCase(params1).then(res => {
                        if (res == '修改成功') {
                            this.$message.success(res);
                            this.$router.push({
                                path: '/showcase'
                            })
                        } else {
                            this.$message.error(res);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }
                else if (type == 'addCase') {
                    let params2 = { // 添加传参
                        caseName: this.title,
                        img: this.dialogImageUrl,
                        markdown: this.content
                    }
                    addCase(params2).then(res => {
                        if (res == '发布成功') {
                            this.$message.success(res);
                            this.$router.push({
                                path: '/showcase'
                            })
                        } else {
                            this.$message.error(res);
                        }
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
    .original-box {
        width: 300px;
    }
    .original-img {
        margin-top: 8px;
        position: relative;
        padding-bottom: 63.571419%;
        width: 100%;
    }
    .original-img > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .back {
        cursor: pointer;
    }
    .editor-btn {
        margin-top: 20px;
    }
    .pic {
        margin-top: 10px;
    } 
    .editor {
        margin-top: 20px;
    }
    .disabled {
        display: none;
    }
</style>