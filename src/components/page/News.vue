<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-news"></i>公司新闻</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <ul>
                <li v-for="(item, index) in items" :key=index class="news-li">
                    <img :src="item.src" alt="" class="news-img">
                    <div class="news-describe">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.content }}</p>
                    </div>
                </li>
            </ul> -->
            <template>
                <div style="margin-top: 20px">
                    <!-- <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button> -->
                    <el-button type="primary" @click="addNews">添加新闻</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <!-- <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column> -->
                    <el-table-column
                    width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.src" class="news-img">
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <h4>{{ scope.row.title }}</h4>
                            <p>{{ scope.row.content }}</p>
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
        name: 'new',
        data () {
            return {
                delVisible: false,
                idx: -1,
                pagesize: 10,
                currentPage: 1,
                total: 0,
                tableData: [
                    {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻二',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻三',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻四',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻五',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻六',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻七',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻八',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻九',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻十',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻十一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻十二',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }
                ],
                multipleSelection: []
            }
        },
        methods: {
            // toggleSelection(rows) {
            //     console.log(this.$refs.multipleTable)
            //     if (rows) {
            //     rows.forEach(row => {
            //         this.$refs.multipleTable.toggleRowSelection(row);
            //     });
            //     } else {
            //     this.$refs.multipleTable.clearSelection();
            //     }
            // },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val; // 选中的行
            // },
            addNews() {
                this.$router.push({
                    path: '/newsMarkdown'
                })
            },
            handleEdit(index,row) {
                this.$router.push({
                    path: '/newsmarkdown'
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
    .news-img {
        display: block;
        border-radius: 5px;
        width: 100%;
    }
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
