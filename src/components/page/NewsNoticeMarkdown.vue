<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-news"></i>markdown</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>新建新闻</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <p>
                    标题：<input type="text" v-model="title" placeholder="请输入标题">
                </p>
                <p>
                    编辑人：<input type="text" v-model="editor" placeholder="请输入编辑人">
                </p>
                <div class="original-box" v-if="original">
                    <span>原图：</span>
                    <div class="original-img">
                        <img :src="originalImgUrl" alt="">
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
            </div>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" class="editor"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import { addNews, getNewsDetail, deleteNews, deleteNewsList , updateNews, 
    addNotice, getNoticeDetail, deleteNotice, deleteNoticeList , updateNotice } from '../../api.js'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        data() {
            return {
                original: false, // 控制原图的显示
                editor: '', //编辑人
                title: '',
                img: '',
                originalImgUrl: '',   // 原图的URL
                content:'',
                html:'<h1>make</h1>',
                url: '/'+ 'upload',  // upload上传图片的地址
                dialogImageUrl: '',  // 图片的URL
                dialogVisible: false,
            }
        },
        components: {
            mavonEditor
        },
        methods: {
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
                let obj = document.getElementsByClassName("el-upload el-upload--picture-card")[0];
                // getElementsByClassName取的是一个数组
                obj.style.display = 'none';
                this.dialogImageUrl = response;   // 后台返回的图片URL
                console.log(response)
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
            // 判断是编辑还是添加，是编辑显示原图
            judge() {
                let type = this.$route.params.type;
                if (type == 'editNews' || type == 'editNotice') {
                    this.original = true;
                } else {
                    this.original = false;
                }
            },
            // 判断是新闻编辑还是公告编辑
            judgeEdit() {
                let type = this.$route.params.type;
                if (type == 'editNews') {
                    let nid = this.$route.params.nid;
                    getNewsDetail(nid).then(res => {
                        this.title = res.newsTitle;
                        this.editor = res.editor;
                        this.originalImgUrl = res.img;
                        this.content = res.markdown;
                    }).catch(err => {
                        this.$message.error("操作失败，请重试！")
                    })
                } else if (type == 'editNotice') {
                    let aid = this.$route.params.aid;
                    getNoticeDetail(aid).then(res => {
                        this.title = res.announceTitle;
                        this.editor = res.editor;
                        this.originalImgUrl = res.img;
                        this.content = res.markdown;
                    }).catch(err => {
                        this.$message.error("操作失败，请重试！")
                    })
                }
            },
            submit() {
                let type = this.$route.params.type;
                if (type == 'addNews') {  // 添加新闻
                    let params1 = {
                        newsTitle: this.title,
                        editor: this.editor,
                        img: this.dialogImageUrl,
                        markdown: this.content
                    }
                    addNews(params1).then(res => {
                        this.$message.success(res)
                    }).catch(err => {
                        this.$message.error(res)
                    })
                } else if (type == 'editNews') {  // 编辑新闻
                    let img;
                    if (this.dialogImageUrl == '') { // 判断有没有修改封面，没有修改传原来的URL
                        img = this.originalImgUrl;
                    } else {
                        img = this.dialogImageUrl;
                    }
                    let params2 = {
                        newsTitle: this.title,
                        editor: this.editor,
                        img: img,
                        markdown: this.content
                    }
                    updateNews(params2).then(res => {
                        this.$message.success(res)
                    }).catch(err => {
                        this.$message.error(res)
                    })
                } else if (type == 'addNotice') {   // 添加公告
                    let params3 = {
                        announceTitle: this.title,
                        editor: this.editor,
                        img: this.dialogImageUrl,
                        markdown: this.content
                    }
                    addNotice(params3).then(res => {
                        this.$message.success(res)
                    }).catch(err => {
                        this.$message.error(res)
                    })
                } else if (type == 'editNotice') {  // 编辑公告
                    let img;
                    if (this.dialogImageUrl == '') {
                        img = this.originalImgUrl;
                    } else {
                        img = this.dialogImageUrl;
                    }
                    let params4 = {
                        announceTitle: this.title,
                        editor: this.editor,
                        img: img,
                        markdown: this.content
                    }
                    updateNotice(params4).then(res => {
                        this.$message.success(res)
                    }).catch(err => {
                        this.$message.error(res)
                    })
                }
            },
            // submit() {
            //     let params = {
            //         newsTitle: this.title,
            //         editor: this.editor,
            //         img: this.dialogImageUrl,
            //         markdown: this.content
            //     }
            //     addNews(params).then(res => {
            //         this.$message.success(res)
            //     }).catch(err => {
            //         this.$message.error(res)
            //     })
            // }   
        },
        mounted() {
            this.judge();
            this.judgeEdit();
        }
    }
</script>
<style scoped>
    .original-box {
        width: 300px;
    }
    .original-img {
        position: relative;
        padding-bottom: 50%;
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
    .editor {
        margin-top: 20px;
    }
    .pic {
        /* display: flex;
        justify-content: center; */
        margin-top: 10px;
    } 
</style>