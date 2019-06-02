<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <template>
                <div style="margin-top: 20px">
                    <!-- <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button> -->
                    <!-- <el-button type="primary" @click="addNews">添加商品</el-button> -->
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
                    label="商品ID"
                    prop="goodsId"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="图片"
                    prop="image"
                    width="160">
                        <template slot-scope="scope">
                            <div class="news-img">
                                <img :src="scope.row.image">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="商品名称"
                    prop="goodsName"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="商品描述"
                    prop="goodsIntroduce"
                  >
                    </el-table-column>
                    <el-table-column
                    label="价格"
                    prop="sellPrice"
                    width="70">
                    </el-table-column>
                    <el-table-column
                    label="库存"
                    prop="stock"
                    width="70">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="150">
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
                <el-form-item label="商品ID" :label-width="formLabelWidth" prop="userId">
                <el-input v-model="form.goodsId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth" prop="adminName">
                <el-input v-model="form.image" autocomplete="off" :disabled="true">
                    <!-- <template slot-scope="scope">
                        <div class="news-img">
                            <img :src="scope.row.image">
                        </div>
                    </template> -->
                </el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="userPhone">
                <el-input v-model="form.goodsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品描述" :label-width="formLabelWidth" prop="userPhone">
                <el-input v-model="form.goodsIntroduce" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth" prop="userPhone">
                <el-input v-model="form.sellPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存" :label-width="formLabelWidth" prop="userPhone">
                <el-input v-model="form.stock" autocomplete="off"></el-input>
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
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getGoodsList, deleteGoods, deleteNewsList, editGoodsInfo } from '../../api.js'
    export default {
        name: 'goods',
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
                    goodsId: '',
                    image: '',
                    goodsName: '',
                    sellPrice: '',
                    goodsIntroduce: '',
                    stock: ''
                }
            }
        },
        methods: {
            // 获取新闻列表
            getArticle() {
                // let params = this.currentPage;
                let params = {
                    goodsId: '',
                    orderNum:"",
                    pageNum: this.currentPage,
                    pageSize: 10,
                };
                getGoodsList(params).then(res => {
                    for (let i in res.list) {
                        res.list[i].time = this.changeTime(res.list[i].time)
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
            // 编辑
            handleEdit(index,row) {
                this.dialogFormVisible = true;
                this.form = row; 
            },
            // 确认编辑
            assureEdit () {
                let params = {
                    goodsId: this.form.goodsId,
                    goodsName: this.form.goodsName,
                    sellPrice: this.form.sellPrice,
                    stock: this.form.stock,
                    goodsIntroduce: this.goodsIntroduce
                }
                console.log(params);
                editGoodsInfo(params).then(res => {
                    this.dialogFormVisible = false;
                    this.$message.success('操作成功！');
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
                this.goodsId = row.goodsId;
            },
            // 确认删除
            deleteRow(){
                // let params = this.del_case.nid;  // 要确定cid的数据类型
                let params = {
                    goodsId: this.goodsId,
                };
                deleteGoods(params).then(res => {
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
    .news-img {
        position: relative;
        padding-bottom: 50%;
        width: 80%;
        height: 100px;
    }
    .news-img > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
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
