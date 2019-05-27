<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <template>
                <div style="margin-top: 20px">
                    <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button type="primary" @click="addNotice">添加用户</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column>
                    <el-table-column
                    label="用户ID"
                    prop="userId"
                    width="180">
                        <template slot-scope="scope">
                            <div class="notice-img">
                                <img :src="scope.row.img">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="用户名"
                    prop="userName"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="联系方式"
                    prop="userName"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="密码"
                    prop="password"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="180">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div> 
            </template>
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
    import { getNoticeList, deleteNotice, deleteNoticeList } from '../../api.js'
    export default {
        name: 'user',
        data () {
            return {
                idx: -1,
                del_case: {},
                multipleSelection: [],
                delVisible: false,
                pagesize: 10,
                currentPage: 1,
                total: 0,
                tableData: [
                    // {
                    //     announceTitle: '公告一',
                    //     time: '2018/7/26',
                    //     img: '../../../static/img/img.jpg'
                    // }, {
                    //     announceTitle: '公告二',
                    //     time: '2018/7/26',
                    //     img: '../../../static/img/img.jpg'
                    // }
                ]
            }
        },
        methods: {
            // 获取数据列表
            getArticle() {
                let params = this.currentPage;
                getNoticeList(params).then(res => {
                    for (let i in res.list) {
                        res.list[i].time = this.changeTime(res.list[i].time)
                    }
                    this.tableData = res.list;
                    this.total = res.total
                })
            },
            toggleSelection(rows) {
                console.log(this.$refs.multipleTable)
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val; // 选中的行
            },
            addNotice() {
                this.$router.push({
                    name: 'newsnoticemarkdown',
                    params: {
                        type: 'addNotice'
                    }
                })
            },
            handleEdit(index,row) {
                this.$router.push({
                    name: 'newsnoticemarkdown',
                    params: {
                        type: 'editNotice',
                        aid: row.aid
                    }
                })
            },
            delAll() {
                // 批量删除
                let requestList = [];
                this.multipleSelection.forEach(selectedItem => {
                    // 删除请求
                    let multiple = selectedItem.aid;
                    requestList.push( multiple );
                })
                deleteNoticeList(requestList).then(res => {
                    this.$message.success(res);
                    this.getArticle();
                })
                this.multipleSelection = [];
            },
            handleDelete(index, row) {
                this.del_case = row;
                this.idx = index;
                this.delVisible = true;
            },
            // 确认删除
            deleteRow(){
                let params = this.del_case.aid;  // 要确定cid的数据类型
                deleteNotice(params).then(res => {
                    // 返回值是字符串
                    this.$message.success(res);
                    this.delVisible = false;
                    this.getArticle()
                })
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getArticle(); // 当前页变化请求当页数据
            },
            // 时间戳转化为2018/7/30的格式
            changeTime(timestamp) {
                let date = new Date(timestamp);
                let year = date.getFullYear();
                let month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                let day = date.getDate();
                return year + '-' + month + '-'+day
            }
        },
        mounted() {
            this.getArticle();
        },
        watch: {
            // tableData: function(val) {
            //     this.total = val.length;
            // }
        }
    }
</script>

<style scoped>
    .notice-img {
        position: relative;
        padding-bottom: 50%;
        width: 100%;
    }
    .notice-img > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 5px;
    }
    /* .el-icon-delete {
        margin-left: 10px;
    }
    .el-icon-delete, .el-icon-edit {
        color: #409EFF;
        cursor: pointer;
    } */
    .el-table--mini, .el-table--small, .el-table__expand-icon {
        font-size: 14px;
    }
</style>

