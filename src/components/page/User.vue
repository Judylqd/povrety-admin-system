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
                    <!-- <el-button type="primary" @click="delAll()">批量删除</el-button> -->
                    <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
                    <el-button type="primary" @click="addUser()">添加用户</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <!-- <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column> -->
                    <el-table-column
                    label="用户ID"
                    prop="userId"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="用户名"
                    prop="adminName"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="联系方式"
                    prop="userPhone"
                    >
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
                <el-form-item label="用户ID" :label-width="formLabelWidth" prop="userId">
                <el-input v-model="form.userId" autocomplete="off" :disabled="isUserid"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="adminName">
                <el-input v-model="form.adminName" autocomplete="off" :disabled="isName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="userPhone">
                <el-input v-model="form.userPhone" autocomplete="off"></el-input>
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
                <el-button type="primary" @click="deleteRow(userId)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getUserList, deleteUser, editUserInfo, addUserInfo } from '../../api.js'
    export default {
        name: 'user',
        data () {
            return {
                idx: -1,
                del_case: {},
                multipleSelection: [],
                delVisible: false,
                // disabled: true,
                pagesize: 8,
                isUserid: true,
                isName: true, //名字是否禁用
                isAdd: false,
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
                ],
                dialogFormVisible: false,
                formLabelWidth: '100px',
                form: {
                    userId: '',
                    adminName: '',
                    userPhone: '',
                }
            }
        },
        methods: {
            // 获取数据列表
            getArticle() {
                // let params = this.currentPage;
                // 后台要接受的参数，根据参数返回列表
                let params = {
                    adminName:"",
                    pageNum: this.currentPage,
                    pageSize: 10,
                };
                getUserList(params).then(res => {
                    for (let i in res.list) {
                        res.list[i].time = this.changeTime(res.list[i].time)
                    }
                    console.log(JSON.stringify(res.data));
                    this.tableData = res.data;
                    this.total = res.code;
                })
            },
            toggleSelection(rows) {
                // console.log(this.$refs.multipleTable)
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
            // 添加用户
            addUser () {
                this.dialogFormVisible = true;
                this.isName = false;
                this.form = {  // 清空添加用户的表单信息
                    userId: 0,
                    adminName: '',
                    userPhone: ''
                }
                this.isAdd = true;
            },
            // 编辑
            handleEdit(index,row) {
                this.dialogFormVisible = true;
                this.isUserid = true;
                this.isName = true;
                this.form = row;
                this.isAdd = false;
            },
            // 确定编辑和添加
            assureEdit () {
                let params = {};
                if (this.isAdd) {  // isAdd为true表示添加状态
                    params = {
                        userId: 0,
                        adminName: this.form.adminName,
                        userPhone: this.form.userPhone
                    }
                } else {  // isAdd为true表示编辑状态
                    params = {
                        userId: this.form.userId,
                        adminName: this.form.adminName,
                        userPhone: this.form.userPhone
                    }
                }
                editUserInfo(params).then(res => {
                    this.dialogFormVisible = false;
                    this.$message.success('操作成功！');
                    this.getArticle()
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
                this.userId = row.userId;
                // console.log(row);
            },
            // 确认删除
            deleteRow(userId){
                // let params = this.del_case.aid;  // 要确定cid的数据类型
                let params = {
                    userId: this.userId,
                };
                // console.log(userId);
                deleteUser(params).then(res => {
                    // 返回值是字符串
                    this.$message.success('删除成功！');
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
    .el-table--mini, .el-table--small, .el-table__expand-icon {
        font-size: 14px;
    }
    .editAlert {
        width: 80%;
    }
</style>

