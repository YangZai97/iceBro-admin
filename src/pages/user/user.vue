<template>
    <div>
        <div class="user-head">
            <el-input placeholder="请输入内容"
                      v-model="searchValue"
                      class="user-input"
                      clearable>
            </el-input>
            <el-button>查询</el-button>
            <el-button type="primary">新增</el-button>
        </div>
        <div>
            <el-table :data="tableData"
                      style="width: 100%;margin-top:10px;"
                      :header-cell-style="{background:'#0E99EC',color:'#ffffff'}">
                <el-table-column prop="date"
                                 label="日期"
                                 width="140">
                </el-table-column>
                <el-table-column prop="id"
                                 label="账号"
                                 width="140">
                </el-table-column>
                <el-table-column prop="type"
                                 label="类型">
                </el-table-column>
                <el-table-column prop="status"
                                 label="状态">
                </el-table-column>
                <el-table-column prop="boss"
                                 label="所属老板">
                </el-table-column>
                <el-table-column label="操作"
                                 width="160"
                                 fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-size="20"
                           small
                           :pager-count="5"
                           layout="total, prev, pager, next, jumper"
                           :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentPage: 1,
            searchValue: '',
            tableData: [{
                date: '2020-02-02',
                id: '1314520',
                type: '员工',
                status: '正常',
                boss: 'Jennry'
            }, {
                date: '2020-02-02',
                id: '1314520',
                type: '管理员',
                status: '冻结',
                boss: 'Jennry'
            }, {
                date: '2020-02-02',
                id: '1314520',
                type: '管理员',
                status: '可用',
                boss: 'Jennry'
            }]
        };
    },
    methods: {
        handleEdit (index, row) {
            console.log(index, row);
        },
        handleDelete (index, row) {
            console.log(index, row);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style scoped>
.user-head {
    display: flex;
    justify-content: flex-start;
}
.user-input {
    width: 40%;
    padding-right: 20px;
}
</style>
