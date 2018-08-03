<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>案例展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <template>
                <div style="margin-top: 20px">
                    <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button type="primary" @click="addCase">添加案例</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="items.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column>
                    <el-table-column
                    label="全选"
                    prop="img"
                    width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.img" class="news-img">
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop='caseName'
                    width="120">
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button type="text" class="button" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                            <el-button type="text" class="button" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div> 
            </template> -->
            <el-button type="primary" icon="add" @click="addCase" >添加案例</el-button>
            <div class="show-box">
                <el-row>
                    <el-col :span="6" v-for="(item, index) in items" :key="index">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="img-box">
                                <img :src="item.img" class="image">
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <span>{{ item.caseName }}</span>
                                    <el-button type="text" class="button" @click="handleDelete(item,index)">删除</el-button>
                                    <el-button type="text" class="button" @click="handleEdit(item,index)">编辑</el-button>
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
                    :page-size="pagesize"
                    layout="total, prev, pager, next, jumper"
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
    import {getCaseList, deleteCase} from '../../api.js'
    export default {
        name: 'showcase',
        data() {
            return {
                idx: -1,
                del_case: {},
                delVisible: false,
                //分页
                currentPage: 1,
                pagesize: 12,
                total: 0,
                items: [
                    // {
                    //     img: "../../../static/img/img.jpg",
                    //     caseName: "案例一"
                    // },
                    // {
                    //     img: "../../../static/img/img.jpg",
                    //     caseName: "案例二"
                    // }
                ]
            }
        },
        methods: {
            getArticle() {
                let params = this.currentPage;
                getCaseList(params).then(res => {
                    // 返回值数组
                    this.items = res.list;
                    this.total = res.total;
                })
            },
            handleSizeChange(pagesize) {
                console.log(`每页 ${pagesize} 条`);
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getArticle();
            },
            //点击案例按钮跳转markdown
            addCase() {
                this.$router.push({
                    name: 'casemarkdown',
                    params: {
                        type: 'addCase'
                    }
                })
            },
            handleEdit(item,index) {
                this.$router.push({
                    name: 'casemarkdown',
                    params: {
                        type: 'editCase',
                        cid: item.cid
                    }
                })
            },
            handleDelete(item,index) {
                this.del_case = item;
                this.idx = index;
                this.delVisible = true;
            },
            //确认删除
            deleteRow() {
                // 删除请求
                let params = this.del_case.cid;  // 要确定cid的数据类型
                deleteCase(params).then(res => {
                    // 返回值是字符串
                    this.$message.success(res);
                    this.delVisible = false;
                    this.getArticle()
                })
            }
        },
        mounted() {
            // 获取数据列表
            this.getArticle();
        },
        watch: {
            // items: function(val) {
            //     this.total = val.length;  // 实时更新分页总条数
            // }
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
    .img-box {
        position: relative;
        width: 100%;
        padding-bottom: 63.571429%;
    }
    .img-box > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
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