<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>案例展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" icon="add" @click="addCase" >添加案例</el-button>
            <div class="show-box">
                <el-row>
                    <el-col :span="6" v-for="(item, index) in items.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index">
                        <el-card :body-style="{ padding: '0px' }">
                            <img :src="item.img" class="image">
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <span>{{ item.caseName }}</span>
                                    <el-button type="text" class="button" @click="handleDelete(index)">删除</el-button>
                                    <el-button type="text" class="button" @click="handleEdit(index)">编辑</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[12, 24, 36]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getCaseList} from '../../api.js'
    export default {
        name: 'showcase',
        data() {
            return {
                idx: -1,
                delVisible: false,
                //分页
                currentPage: 1,
                pagesize: 12,
                total: 0,
                items: [
                    {
                        img: "../../../static/img/img.jpg",
                        caseName: "案例一"
                    },
                    {
                        img: "../../../static/img/img.jpg",
                        caseName: "案例二"
                    }
                ]
            }
        },
        methods: {
            handleSizeChange(pagesize) {
                console.log(`每页 ${pagesize} 条`);
            },
            handleCurrentChange(currentPage) {
                console.log(`当前 ${currentPage} 页`);
                this.currentPage = currentPage;
            },
            //点击案例按钮跳转markdown
            addCase() {
                this.$router.push({
                    path: '/casemarkdown'
                })
            },
            handleEdit(index) {
                this.$router.push({
                    path: '/casemarkdown'
                })
            },
            handleDelete(index) {
                console.log(index);
                this.idx = index;
                this.delVisible = true;
            },
            //确认删除
            deleteRow() {
                // 删除请求
                this.items.splice(this.idx,1);
                this.$message.success('删除成功');
                this.delVisible = false;
                // this.total = this.items.length;
            }
        },
        mounted: function() {
            getCaseList().then(res => {
                let lists = res.parse(res);  // 将返回的json数组转化对象数组
                this.items = lists;
            });
        },
        watch: {
            items: function(val) {
                this.total = val.length;  // 实时更新分页总条数
            }
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
    /* 分页 */
    .block {
        margin-top: 10px;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>