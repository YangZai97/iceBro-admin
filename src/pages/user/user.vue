<template>
    <div>
        <div class="user-head">
            <el-input placeholder="请输入内容"
                      v-model="searchValue"
                      class="user-input"
                      clearable>
            </el-input>
            <el-button @click="search">搜索</el-button>
            <el-button type="primary"
                       @click="dialogFormVisible = true">新增
            </el-button>
            <el-dialog title="账号信息"
                       :visible.sync="dialogFormVisible"
                       width="370px"
                       center>
                <el-form>
                    <el-form-item label="用户名"
                                  :label-width="formLabelWidth">
                        <el-input v-model="phone"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"
                                  :label-width="formLabelWidth">
                        <el-input v-model="password"
                                  autocomplete="off"
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态"
                                  :label-width="formLabelWidth">
                        <el-select v-model="status"
                                   placeholder="请选择账号状态">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属老板"
                                  :label-width="formLabelWidth">
                        <el-input v-model="car"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="addUser">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-table :data="tableData"
                      style="width: 100%;margin-top:10px;"
                      :header-cell-style="{background:'#0E99EC',color:'#ffffff'}">
                <el-table-column prop="CreatedAt"
                                 label="日期"
                                 width="300">
                </el-table-column>
                <el-table-column prop="UserName"
                                 label="账号"
                                 width="140">
                </el-table-column>
                <el-table-column
                    label="类型">
                    <template slot-scope="scope">
                        {{scope.row.IsAdmin |status}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        {{scope.row.IsActive |type}}
                    </template>
                </el-table-column>
                <el-table-column prop="CarNumber"
                                 label="所属老板">
                </el-table-column>
                <el-table-column label="操作"
                                 width="160"
                                 fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   type="primary"
                                   @click="handleEdit(scope.$index, scope.row)">冻结
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
                           :total="total">
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
                total: 0,
                phone: '',
                password: '',
                status: true,
                car: '',
                options: [{
                    value: true,
                    label: '正常'
                }, {
                    value: false,
                    label: '冻结'
                }],
                currentPage: 1,
                searchValue: '',
                tableData: []
            };
        },
        mounted() {
            this.getList();
        },
        filters: {
            type(val) {
                if (val) {
                    return '正常';
                } else {
                    return '冻结';
                }
            },
            status(val) {
                if (val) {
                    return '管理员';
                } else {
                    return '员工';
                }
            }
        },
        methods: {
            search() {
                this.currentPage = 1;
                this.getList();
            },
            addUser() {
                if (this.car && this.password && this.phone && this.status) {
                    let data = {
                        carNumber: this.car,
                        password: this.password,
                        UserName: this.phone,
                        isActive: this.status
                    };
                    console.log(data);
                    this.$user.createUserList(data).then(res => {
                        this.dialogFormVisible = false;
                        console.log(res);
                        this.getList();
                        this.$Message.success('创建成功');
                    }).catch(err => {
                        console.log(err);
                        this.$Message.error('创建失败');
                    });
                } else {
                    this.$Message.error('用户信息不完全');
                }

            },
            getList() {
                let data = {
                    search: this.searchValue,
                    page: this.currentPage,
                    // eslint-disable-next-line camelcase
                    page_size: 20
                };
                this.$user.getUserList(data).then(res => {
                    console.log(res);
                    this.total = res.data.count;
                    this.tableData = res.data.data;
                });
            },
            handleEdit(index, row) {
                row.IsActive = !row.IsActive;
                this.$user.updateUserList(row.ID, row).then(res => {
                    console.log(res);
                    this.getList();
                    this.$Message.success('操作成功');
                });
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                // eslint-disable-next-line no-unused-vars
                this.$user.deleteUserList(row.ID).then(res => {
                    this.getList();
                    this.$Message.success('删除成功');
                    // eslint-disable-next-line no-unused-vars
                }).catch(err => {
                    this.$Message.error('删除失败');
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList();
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
        margin-top: 10px;
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
