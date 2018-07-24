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
                    <el-button type="primary" @click="delAll()">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="30">
                    </el-table-column>
                    <el-table-column
                    label="全选"
                    width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.src" class="news-img">
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <h4>{{ scope.row.title }}</h4>
                            <p>{{ scope.row.content }}</p>
                            <i class="el-icon-edit"></i>
                            <i class="el-icon-delete"></i>
                            <!-- <el-button>编辑</el-button>
                            <el-button>删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table> 
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'new',
        data () {
            return {
                tableData: [
                    {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }, {
                        src: '../../../static/img/img.jpg',
                        title: '新闻一',
                        content: '近日，姜文带着他的“民国三部曲”收官之作《邪不压正》归来了，上两部分别是《让子弹飞》和《一步之遥》。观众则对电影给出了好评：“三部姜文电影，就是半个民国史”。这部电影上映当天，票房便破亿。'
                    }
                ],
                multipleSelection: []
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
