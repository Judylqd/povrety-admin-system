<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>案例展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" icon="add">添加案例</el-button>
            <div class="show-box">
                <el-row>
                    <el-col :span="6" v-for="(item, index) in items" :key="index">
                        <el-card :body-style="{ padding: '0px' }">
                            <img :src="item.src" class="image">
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <span>{{ item.title }}</span>
                                    <el-button type="text" class="button">删除</el-button>
                                    <el-button type="text" class="button">编辑</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'showcase',
        data() {
            return {
                items: [
                    {
                        src: "../../../static/img/img.jpg",
                        title: "案例一"
                    },
                    {
                        src: "../../../static/img/img.jpg",
                        title: "案例二"
                    },
                    {
                        src: "../../../static/img/img.jpg",
                        title: "案例三"
                    },
                    {
                        src: "../../../static/img/img.jpg",
                        title: "案例四"
                    },
                    {
                        src: "../../../static/img/img.jpg",
                        title: "案例五"
                    }
                ]
            }
        },
        methods: {
        }    
    }

</script>

<style scoped>
    .show-box {
        margin-top: 20px;
    }
    .time {
        font-size: 13px;
        color: #999;
    }
  
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
</style>