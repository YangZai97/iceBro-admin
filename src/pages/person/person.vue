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
                       @click="dialogFormVisible = true">新增</el-button>
            <el-dialog title="客户信息"
                       :visible.sync="dialogFormVisible"
                       width="370px"
                       center>
                <el-form :model="form">
                    <el-form-item label="客户姓名"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.name"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.phone"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="店名"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.shopName"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="起始冻库"
                                  :label-width="formLabelWidth">
                        <el-select v-model="form.start"
                                   placeholder="请选择起始冻库">
                            <el-option label="东北冻库"
                                       value="dongbei"></el-option>
                            <el-option label="重庆冻库"
                                       value="chongqin"></el-option>
                            <el-option label="西北冻库"
                                       value="xibei"></el-option>
                            <el-option label="北京冻库"
                                       value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货地址"
                                  :label-width="formLabelWidth">
                        <el-select v-model="form.adress"
                                   placeholder="请选择收货地址">
                            <el-option label="重庆"
                                       value="chongqin"></el-option>
                        </el-select>
                        <el-input placeholder="详细地址"
                                  v-model="form.adressAll"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="单价"
                                  :label-width="formLabelWidth">
                        <el-input v-model="form.money"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-table :data="tableData"
                      style="width: 100%;margin-top:10px;"
                      :header-cell-style="{background:'#0E99EC',color:'#ffffff'}">
                <el-table-column prop="id"
                                 label="编号">
                </el-table-column>
                <el-table-column prop="date"
                                 label="日期"
                                 width="140">
                </el-table-column>
                <el-table-column prop="name"
                                 label="客户">
                </el-table-column>
                <el-table-column prop="phone"
                                 label="电话"
                                 width="140">
                </el-table-column>
                <el-table-column prop="shopName"
                                 label="店名">
                </el-table-column>
                <el-table-column prop="money"
                                 label="单价(元/件)">
                </el-table-column>
                <el-table-column prop="adress"
                                 label="地址"
                                 width="140">
                </el-table-column>
                <el-table-column prop="start"
                                 label="起点">
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
    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                name: '',
                phone: '',
                shopName: '',
                start: '',
                adress: '',
                adressAll: '',
                money: ''
            },
            currentPage: 1,
            searchValue: '',
            tableData: [{
                id: '1314520',
                date: '2020-02-02',
                name: '张三',
                phone: '13782984329',
                shopName: '沙县小吃',
                money: '20',
                adress: '湖南省长沙市天心区XX街道XX号',
                start: '东边冻库'
            }, {
                id: '1314520',
                date: '2020-02-02',
                name: '张三',
                phone: '13782984329',
                shopName: '沙县小吃',
                money: '20',
                adress: '湖南省长沙市天心区XX街道XX号',
                start: '东边冻库'
            }, {
                id: '1314520',
                date: '2020-02-02',
                name: '张三',
                phone: '13782984329',
                shopName: '沙县小吃',
                money: '20',
                adress: '湖南省长沙市天心区XX街道XX号',
                start: '东边冻库'
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
.page {
    text-align: center;
}
</style>

