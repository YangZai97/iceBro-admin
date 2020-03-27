<template>
    <div>
        <div class="user-head">
            <el-input placeholder="请输入内容"
                      v-model="searchValue"
                      class="user-input"
                      @clear="getUserInfo"
                      clearable>
            </el-input>
            <el-button @click="search">查询</el-button>
            <el-button type="primary"
                       @click="dialogFormVisible = true">新增
            </el-button>
            <el-dialog title="客户信息"
                       :visible.sync="dialogFormVisible"
                       width="370px"
                       center>
                <el-form :model="form">
                    <el-form-item label="客户姓名"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.Name"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.Phone"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="店名"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.Shop"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="起始冻库"
                                  :label-width="formLabelWidth">
                        <el-select v-model="form.Store"
                                   placeholder="请选择起始冻库">
                            <el-option label="中国"
                                       value="中国"></el-option>
                            <el-option label="巴西"
                                       value="巴西"></el-option>
                            <el-option label="日本"
                                       value="日本"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货地址"
                                  :label-width="formLabelWidth">
                        <el-input placeholder="详细地址"
                                  v-model="form.Address"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="单价"
                                  :label-width="formLabelWidth">
                        <el-input v-model.number="form.Price"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible = false, addUser()">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-table :data="tableData"
                      style="width: 100%;margin-top:10px;"
                      :header-cell-style="{background:'#0E99EC',color:'#ffffff'}">
                <el-table-column prop="ID"
                                 label="编号">
                </el-table-column>
                <el-table-column prop="CreatedAt"
                                 label="日期"
                                 width="140">
                </el-table-column>
                <el-table-column label="客户">
                    <template slot-scope="row">
                        <el-input v-model="row.row.Name" v-if="edit==true&&editOk==row.row" placeholder="请输入内容"></el-input>
                        <span v-else>{{row.row.Name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Phone"
                                 label="电话"
                                 width="140">
                    <template slot-scope="row">
                        <el-input v-model="row.row.Phone" v-if="edit==true&&editOk==row.row" placeholder="请输入内容"></el-input>
                        <span v-else>{{row.row.Phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Shop"
                                 label="店名">
                    <template slot-scope="row">
                        <el-input v-model="row.row.Shop" v-if="edit==true&&editOk==row.row" placeholder="请输入内容"></el-input>
                        <span v-else>{{row.row.Shop}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Price"
                                 label="单价(元/件)">
                    <template slot-scope="row">
                        <el-input v-model="row.row.Price" v-if="edit==true&&editOk==row.row" placeholder="请输入内容"></el-input>
                        <span v-else>{{row.row.Price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Address"
                                 label="地址"
                                 width="140">
                    <template slot-scope="row">
                        <el-input v-model="row.row.Address" v-if="edit==true&&editOk==row.row" placeholder="请输入内容"></el-input>
                        <span v-else>{{row.row.Address}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="起点">
                    <template slot-scope="row">
                        <el-select v-if="edit==true&&editOk==row.row" v-model="row.row.store" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-else>{{row.row.Store}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作"
                                 width="160"
                                 fixed="right">
                    <template slot-scope="scope">
                        <el-button v-if="edit==false||editOk!==scope.row" size="mini"
                                   @click="edit=!edit, editOk=scope.row">
                            <span>编辑</span>
                        </el-button>
                        <el-button v-else size="mini"
                                   @click="edit=!edit, editOk=null, handleEdit(scope.$index, scope.row)">
                            <span>保存</span>
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="handleDelete(scope.row)">删除
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
                           :total=total>
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
                form: {},
                currentPage: 1,
                searchValue: '',
                tableData: [],
                options: [{
                    value: '中国',
                    label: '中国',
                }, {
                    value: '日本',
                    label: '日本',
                }, {
                    value: '巴西',
                    label: '巴西',
                }],
                value: null,
                edit: false,
                editOk: null,
            };
        },
        mounted() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                let data = {
                    search: this.searchValue,
                    'page': this.currentPage,
                    'page_size': '20'
                };
                this.$client.getUserInfo(data).then(res => {
                    console.log(res.data);
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                });
            },
            search(){
                this.currentPage = 1;
                this.getUserInfo();
            },
            handleEdit(index, row) {
                console.log(index, row);
                let id = row.ID;
                this.$client.handleEdit(id, row).then(() => {
                    this.$Message.success('保存成功！');
                    this.getUserInfo();
                });
            },
            handleDelete(row) {
                let id = row.ID;
                console.log(row);
                this.$client.handleDelete(id).then(() => {
                    this.$Message.success('删除成功！');
                    this.getUserInfo();
                });
            },
            addUser(){
                this.$client.addUser(this.form).then(() => {
                    this.$Message.success('增加成功！');
                    this.getUserInfo();
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getUserInfo();
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

