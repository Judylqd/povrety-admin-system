<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i>公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <template>
                <div style="margin-top: 20px">
                    <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button type="primary" @click="addNotice">添加公告</el-button>
                </div>
                <!-- <el-table
                    ref="multipleTable"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
                    <el-table-column>
                        <template slot-scope="scope">
                            <h4>{{ scope.row.announceTitle }}</h4>
                            <p>{{ scope.row.content }}</p>
                            <i class="el-icon-edit" @click="handleEdit(scope.$index,scope.row)"></i>
                            <i class="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table> -->
                <el-table
                    ref="multipleTable"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column>
                    <el-table-column
                    label="缩略图"
                    prop="img"
                    width="180">
                        <template slot-scope="scope">
                            <div class="notice-img">
                                <img :src="scope.row.img">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="公告标题"
                    prop="announceTitle"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="更新时间"
                    prop="time"
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
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
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
        name: 'news',
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
                getNoticeList().then(res => {
                    for (let i in res) {
                        res[i].time = this.changeTime(res[i].time)
                    }
                    this.tableData = res;
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
            handleSizeChange(pagesize) {
                console.log(`每页 ${pagesize} 条`);
            },
            handleCurrentChange(currentPage) {
                console.log(`当前 ${currentPage} 页`);
                this.currentPage = currentPage;
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
            tableData: function(val) {
                this.total = val.length;
            }
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

