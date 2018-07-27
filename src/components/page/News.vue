<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-news"></i>公司新闻</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <template>
                <div style="margin-top: 20px">
                    <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button type="primary" @click="addNews">添加新闻</el-button>
                </div>
                <el-table
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
                        prop="time"
                        width="180">
                    </el-table-column>
                    <el-table-column
                    prop="newsTitle"
                        width="180">
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <i class="el-icon-edit" @click="handleEdit(scope.$index,scope.row)"></i>
                            <i class="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></i>
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
    export default {
        name: 'news',
        data () {
            return {
                delVisible: false,
                idx: -1,
                pagesize: 10,
                currentPage: 1,
                total: 0,
                tableData: [
                    {
                        newsTitle: '新闻一',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻二',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻三',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻四',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻五',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻六',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻七',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻八',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻九',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻十',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻十一',
                        time: '2018/7/26'
                    }, {
                        newsTitle: '新闻十二',
                        time: '2018/7/26'
                    }
                ],
                multipleSelection: []
            }
        },
        methods: {
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
            addNews() {
                this.$router.push({
                    path: '/newsnoticemarkdown'
                })
            },
            handleEdit(index,row) {
                this.$router.push({
                    path: '/newsnoticemarkdown'
                })
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            // 确认删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            handleSizeChange(pagesize) {
                console.log(`每页 ${pagesize} 条`);
            },
            handleCurrentChange(currentPage) {
                console.log(`当前 ${currentPage} 页`);
                this.currentPage = currentPage;
            },
            
        },
        mounted() {
            this.total = this.tableData.length;
        },
        watch: {
            tableData: function(val) {
                this.total = val.length;
            }
        }
    }
</script>

<style scoped>
    .el-icon-delete {
        margin-left: 10px;
    }
    .el-icon-delete, .el-icon-edit {
        color: #409EFF;
        cursor: pointer;
    }
    .el-table--mini, .el-table--small, .el-table__expand-icon {
    font-size: 14px;
}
</style>
