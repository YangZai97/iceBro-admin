<template>
    <div>
        <div class="user-head">
            <el-input placeholder="请输入内容"
                      v-model="searchValue"
                      class="user-input"
                      clearable>
            </el-input>
            <el-button>查询</el-button>
            <el-button type="primary"
                       @click="dialogFormVisible = true">新增
            </el-button>
            <el-dialog title="账号信息"
                       :visible.sync="dialogFormVisible"
                       width="370px"
                       center>
                <el-form :model="form">
                    <el-form-item label="手机"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.phone"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.password"
                                  autocomplete="off"
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态"
                                  :label-width="formLabelWidth">
                        <el-select v-model="form.status"
                                   placeholder="请选择账号状态">
                            <el-option label="正常"
                                       value="zhengchang"></el-option>
                            <el-option label="冻结"
                                       value="dongjie"></el-option>
                            <el-option label="可用"
                                       value="keyong"></el-option>
                            <el-option label="拉黑"
                                       value="lahei"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车牌"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.car"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible = false">确 定
                    </el-button>
                </div>
            </el-dialog>
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
                                   @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
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
        data() {
            return {
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    phone: '',
                    password: '',
                    status: '',
                    car: ''
                },
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
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleCurrentChange(val) {
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

    .page {
        text-align: center;
    }

    /deep/ .el-table th > .cell {
        text-align: center;
    }

    /deep/ .el-table .cell {
        text-align: center;
    }

    /deep/ .el-table__column-filter-trigger i {
        color: #ffffff;
    }

    /deep/ .el-table th > .cell.highlight {
        color: #ffffff;
    }
</style>
