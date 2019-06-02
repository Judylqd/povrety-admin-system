<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <template>
                <div style="margin-top: 20px">
                    <!-- <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button> -->
                    <!-- <el-button type="primary" @click="addNews">添加订单</el-button> -->
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <!-- <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column> -->
                    <el-table-column
                    label="订单ID"
                    prop="orderId"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="用户ID"
                    prop="userId"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="收获地址"
                    prop="userAddress"
                    >
                    </el-table-column>
                    <el-table-column
                    label="总价"
                    prop="totalPrice"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="下单时间"
                    prop="createTime"
                    width="230">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="180">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
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
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form" class="editAlert">
                <el-form-item label="订单ID" :label-width="formLabelWidth" prop="orderId">
                    <el-input v-model="form.orderId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" :label-width="formLabelWidth" prop="adminName">
                    <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="收获地址" :label-width="formLabelWidth" prop="userAddress">
                    <el-input v-model="form.userAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="总价" :label-width="formLabelWidth" prop="totalPrice">
                    <el-input v-model="form.totalPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="下单时间" :label-width="formLabelWidth" prop="createTime">
                    <el-input v-model="form.createTime" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="assureEdit()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow(orderId)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getNewsList, deleteNews, deleteNewsList, deleteOrder, editOrderInfo } from '../../api.js'
    export default {
        name: 'order',
        data () {
            return {
                idx: -1,
                del_case: {},
                delVisible: false,
                pagesize: 10,
                currentPage: 1,
                total: 0,
                tableData: [
                    // {
                    //     newsTitle: '新闻一',
                    //     time: '2018/7/26',
                    //     img: '../../../static/img/img.jpg'
                    // }, {
                    //     newsTitle: '新闻二',
                    //     time: '2018/7/26',
                    //     img: '../../../static/img/img.jpg' 
                    // }, {
                    //     newsTitle: '新闻三',
                    //     time: '2018/7/26',
                    //     img: '',
                    //     content: ''
                    // }, {
                    //     newsTitle: '新闻四',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻五',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻六',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻七',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻八',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻九',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻十',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻十一',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }, {
                    //     newsTitle: '新闻十二',
                    //     time: '2018/7/26',
                    //     img: ''
                    // }
                ],
                multipleSelection: [],
                dialogFormVisible: false,
                formLabelWidth: '100px',
                form: {
                    orderId: '',
                    userId: '',
                    userAddress: '',
                    receive: '',
                    newsTitle: '',
                    totalPrice: '',
                    createTime: ''
                }
            }
        },
        methods: {
            // 获取订单列表
            getArticle() {
                // let params = this.currentPage;
                let params = {
                    orderNum:"",
                    pageNum: this.currentPage,
                    pageSize: 10,
                };
                getNewsList(params).then(res => {
                    for (let i in res.data) {
                        res.data[i].time = this.changeTime(res.data[i].time)
                    }
                    // console.log(JSON.stringify(res.data));
                    this.tableData = res.data;
                    this.total = res.code;
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
                console.log(this.multipleSelection)
            },
            addNews() {
                this.$router.push({
                    name: 'newsnoticemarkdown',
                    params: {
                        type: 'addNews'
                    }
                })
            },
            // 编辑订单
             handleEdit(index,row) {
                this.dialogFormVisible = true;
                this.form = row;
            },
            // 确定编辑订单==========================确定向后台传入的参数、后台编辑的接口，没有编辑成功=====================================
            assureEdit () {
                let params = { 
                    orderId: this.form.orderId,
                    userAddress: this.form.userAddress,
                    totalPrice: this.form.totalPrice,
                };
                editOrderInfo(params).then(res => {
                    this.dialogFormVisible = false;
                    this.$message.success('编辑成功！');
                    this.getArticle()
                })
            },
            delAll() {
                // 点击删除全部时
                let requestList = [];
                this.multipleSelection.forEach(selectedItem => {
                    // 删除请求
                    let multiple = selectedItem.nid;
                    requestList.push( multiple );
                })
                deleteNewsList(requestList).then(res => {
                    this.$message.success(res);
                    this.getArticle();
                })
                this.multipleSelection = [];
            },
            handleDelete(index, row) {
                this.del_case = row;
                this.idx = index;
                this.delVisible = true;
                this.orderId = row.orderId;
            },
            // 确认删除
            deleteRow(orderId){
                // let params = this.del_case.nid;  // 要确定cid的数据类型
                let params = {
                    orderId: this.orderId,
                };
                deleteOrder(params).then(res => {
                    // 返回值是字符串
                    this.$message.success('删除成功！');
                    this.delVisible = false;
                    this.getArticle()
                })
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getArticle();
            },
            // 时间戳转化为2018/7/30的格式
            changeTime(createTime) {
                let date = new Date(createTime);
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
    .news-img {
        position: relative;
        padding-bottom: 50%;
        width: 100%;
    }
    .news-img > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 5px;
    }
    .el-icon-delete, .el-icon-edit {
        margin-left: 10px;
        color: #409EFF;
        cursor: pointer;
    }
    .el-table--mini, .el-table--small, .el-table__expand-icon {
    font-size: 14px;
}
</style>
