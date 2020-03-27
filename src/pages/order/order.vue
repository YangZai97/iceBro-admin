<template>
    <div>
        <div class="flex-div">
            <el-input placeholder="请输入关键字" class="input-width ma-left" v-model="searchValue"></el-input>
            <el-date-picker
                class="ma-left"
                v-model="timeValue"
                type="daterange"
                @change="timeChange"
                range-separator=""
                start-placeholder="开始日期"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button class="ma-left" @click="search" type="primary">搜索</el-button>
            <el-button class="ma-left" @click="reset">重置</el-button>
        </div>
        <el-table
            @filter-change="filterChange"
            :data="tableData"
            style="width: 100%;margin-top: 10px"
            :header-cell-style="{background:'#0E99EC',color:'#ffffff'}">
            <el-table-column
                prop="CreatedAt"
                label="日期"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="ID"
                label="订单编号"
            >
            </el-table-column>
            <el-table-column
                prop="StaffName"
                label="员工"
            >
            </el-table-column>
            <el-table-column
                prop="admin"
                label="管理员"
            >
            </el-table-column>
            <el-table-column
                prop="ClientID"
                label="客户编号">
            </el-table-column>
            <el-table-column
                prop="ClientName"
                label="客户">
            </el-table-column>
            <el-table-column
                prop="Shop"
                label="店名">
            </el-table-column>
            <el-table-column
                prop="PhoneNumber"
                label="电话"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="Store"
                label="起点">
            </el-table-column>
            <el-table-column
                prop="Price"
                label="单价">
            </el-table-column>
            <el-table-column
                prop="Batch"
                label="票数">
            </el-table-column>
            <el-table-column
                label="总件数">
                <template slot-scope="scope">
                    <el-input v-if="editOk==scope.row&&edit==1" v-model="scope.row.Many"
                              @blur="blur(scope.row, scope.$index)"></el-input>
                    <span @click="edit=1, editOk=scope.row" v-else>{{scope.row.Many}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="应收运费">
                <template slot-scope="scope">
                    <el-input v-if="editOk==scope.row&&edit==2" v-model="scope.row.Amount"
                              @blur="blur(scope.row, scope.$index)"></el-input>
                    <span @click="edit=2,editOk=scope.row" v-else>{{scope.row.Amount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="实收金额">
                <template slot-scope="scope">
                    <el-input v-if="editOk==scope.row&&edit==3" v-model="scope.row.Money"
                              @blur="blur(scope.row, scope.$index)"></el-input>
                    <span @click="edit=3,editOk=scope.row" v-else>{{scope.row.Money}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="快件状态">
                <template slot-scope="scope">
                    <el-select @change='blur(scope.row, scope.$index)' v-model="scope.row.Status "
                               v-if="(edit==4&&editOk==scope.row)">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <span @click="edit=4,editOk=scope.row" v-else>{{scope.row.Status}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="UpdatedAt"
                label="派送时间"
                width="120"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <!--<el-button @click="receipt(scope.row, scope.$index)" size="small">确认收款</el-button>-->
                    <el-button type="danger" @click="deleteRow(scope.row)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :pager-count="5"
                :page-size="20"
                small
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
                total: 0,
                currentPage: 1,
                editOk: null,
                edit: null,
                searchValue: null,
                timeValue: null,
                filteredName: null,
                filterName: [{text: '张三', value: '张三'}, {text: '李四', value: '李四'}],
                options: [
                    {
                        value: '派送中',
                        label: '派送中'
                    }, {
                        value: '已完成',
                        label: '已完成'
                    },
                    {
                        value: '滞留中',
                        label: '滞留中'
                    }
                ],
                tableData: []
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                // eslint-disable-next-line no-unused-vars
                let data = {
                    page: this.currentPage,
                    // eslint-disable-next-line camelcase
                    page_size: 20,
                    search: this.searchValue,
                    timeValue: this.timeValue,
                    filteredName: this.filteredName
                };
                this.$order.orderList(data).then(res=>{
                    console.log(res.data);
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                });
            },
            search() {
                console.log(this.searchValue, this.timeValue);
                this.currentPage = 1;
                this.getList();
            },
            blur(row, index) {
                this.editOk = null;
                let id = row.ID;
                this.$order.editRow(id, this.tableData[index]).then(() => {
                    this.$Message.success('更新成功');
                    this.getList();
                });
            },
            timeChange() {
                console.log(this.timeValue);
            },
            // 确认收款
            // receipt(row, index) {
            //     console.log(row);
            //     let id = row.ID;
            //     this.tableData[index].Status = '已完成';
            //     this.$order.editRow(id, this.tableData[index]).then(() => {
            //         this.$Message.success('更新成功');
            //         this.getList();
            //     });
            // },
            deleteRow(row) {
                console.log(row);
                let id = row.ID;
                this.$order.deleteRow(id).then(() => {
                    this.$Message.success('删除成功！');
                    this.getList();
                });
            },
            filterChange(filteredValue) {

                if (filteredValue.name) {
                    this.filteredName = filteredValue.name[0];
                }
                this.currentPage = 1;
                this.getList();
            },
            reset() {
                this.searchValue = null;
                this.timeValue = null;
                this.search();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList();
                console.log(`当前页: ${val}`);
            }
        }
    };
</script>

<style scoped>
    .input-width {
        width: 30%;

    }

    .flex-div {
        display: flex;
        justify-content: flex-start;
    }

    .ma-left {
        margin-left: 10px;
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
