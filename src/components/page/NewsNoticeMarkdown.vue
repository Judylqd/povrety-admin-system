<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-news"></i>新闻</el-breadcrumb-item>
                <el-breadcrumb-item>新建新闻</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <p>
                    新闻标题：<input type="text" v-model="newsTitle" placeholder="请输入新闻标题">
                </p>
                <p>
                    新闻编辑人：<input type="text" v-model="editor" placeholder="请输入编辑人">
                </p>
            </div>
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
                editor: '', //编辑人
                newsTitle: '',
                content:'',
                html:'<h1>make</h1>',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        methods: {
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
    .editor {
        margin-top: 20px;
    }
</style>